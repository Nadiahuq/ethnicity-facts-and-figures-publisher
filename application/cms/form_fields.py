from flask import render_template
from wtforms.fields import SelectMultipleField, RadioField, StringField, SelectField
from wtforms.widgets import HTMLString, TextInput, html_params


class RDUTextInput(TextInput):
    TEXT_INPUT_TEMPLATE = "forms/_text_input.html"

    def __call__(self, field, **kwargs):
        return HTMLString(
            render_template(self.TEXT_INPUT_TEMPLATE, field=field, field_params=HTMLString(html_params(**kwargs)))
        )


class RDUURLInput(RDUTextInput):
    input_type = "url"


class RDUChoiceInput:
    CHOICE_INPUT_TEMPLATE = "forms/_choice_input.html"

    def __init__(self, type_, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.type = type_

    def __call__(self, field, **kwargs):
        if getattr(field, "checked", field.data):
            kwargs["checked"] = True

        return HTMLString(
            render_template(
                self.CHOICE_INPUT_TEMPLATE, field=field, type=self.type, field_params=HTMLString(html_params(**kwargs))
            )
        )


class FormGroup:
    FORM_GROUP_TEMPLATE = "forms/_form_group.html"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.other_field = None

    def __call__(self, field, **kwargs):
        return HTMLString(
            render_template(
                self.FORM_GROUP_TEMPLATE,
                id=field.id,
                legend=field.label.text,
                fields=[subfield for subfield in field],
                errors=field.errors,
                disabled=kwargs.get("disabled", False),
                other_field=self.other_field,
                field_params=HTMLString(html_params(**kwargs)),
            )
        )

    def set_other_field(self, other_field):
        self.other_field = other_field


class RDUCheckboxField(SelectMultipleField):
    widget = FormGroup()
    option_widget = RDUChoiceInput(type_="checkbox")


class RDURadioField(RadioField):
    """
    A radio-button field that supports showing/hiding a different field based on whether the last radio has been
    selected - the current limitation/expectation being that the last field is an "other" selection.
    """

    _widget_class = FormGroup
    widget = _widget_class()
    option_widget = RDUChoiceInput(type_="radio")

    def set_other_field(self, other_field):
        # Create a new instance of the widget in order to store instance-level attributes on it without attaching them
        # to the class-level widget.
        self.widget = self._widget_class()
        self.widget.set_other_field(other_field)


class RDUStringField(StringField):
    widget = RDUTextInput()


class RDUURLField(StringField):
    widget = RDUURLInput()
