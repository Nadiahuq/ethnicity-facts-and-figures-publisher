import pytest

"""
    The DataStructureAnalyser class detects the structure of a data cube.
    This allows us to autogenerate charts after

    It's assumptions are
    1. The dataset represents a data cube
    2. One dimension of the cube is ethnicity

"""
from application.cms.data_utils import DataStructureAnalyser


def test_analyser_can_detect_ethnicity_column():
    # GIVEN
    # a simple dataset
    dataset = [['id', 'ethnicity', 'value'], ['1', 'White', '2']]

    # WHEN
    # analyser finds structure
    structure = DataStructureAnalyser.get_data_structure(dataset)

    # THEN
    # it identifies ethnicity
    assert 'ethnicity' in structure
    assert structure['ethnicity']['index'] == 1


def test_analyser_raises_exception_if_no_ethnicity_column():
    # GIVEN
    # a simple dataset without ethnicity
    dataset = [['id', 'not_ethnicity', 'value'],
               ['1', 'White', '2']]

    # THEN
    # it throws a EthnicityColumnMissingError
    with pytest.raises(DataStructureAnalyser.EthnicityColumnMissingException):
        # WHEN
        # analyser finds structure
        DataStructureAnalyser.get_data_structure(dataset)


def test_analyser_returns_simple_result_when_ethnicity_fully_describes_data():
    # GIVEN
    # a simple dataset with ethnicity
    dataset = [['id', 'ethnicity', 'value'],
               ['1', 'White', '2'],
               ['2', 'Other', '2'],
               ['3', 'All', '2']]

    # WHEN
    # analyser finds structure
    structure = DataStructureAnalyser.get_data_structure(dataset)

    # THEN
    # it does not return a secondary index a simple structure
    assert 'secondary' not in structure


def test_analyser_simple_result_includes_expected_results():
    # GIVEN
    # a simple dataset with ethnicity
    dataset = [['id', 'ethnicity', 'value'],
               ['1', 'White', '2'],
               ['2', 'Other', '2'],
               ['3', 'All', '2']]

    # WHEN
    # analyser finds structure of ethnicity
    structure = DataStructureAnalyser.get_data_structure(dataset)
    ethnicity_structure = structure['ethnicity']

    # THEN
    # it does not return a secondary index a simple structure
    assert ethnicity_structure['index'] == 1
    assert ethnicity_structure['name'] == 'ethnicity'
    assert ethnicity_structure['count'] == 3
    assert ethnicity_structure['numeric'] == False
    assert ethnicity_structure['date'] == False


def test_analyser_returns_secondary_result_when_dataset_is_2d_datacube():
    # GIVEN
    # a 2d datacube with ethnicity
    dataset = [['id', 'ethnicity', 'gender', 'value'],
               ['1', 'White', 'male', '2'], ['2', 'White', 'female', '2'],
               ['2', 'Other', 'male', '2'], ['2', 'Other', 'female', '2'],
               ['3', 'All', 'male', '2'], ['3', 'All', 'female', '2']]

    # WHEN
    # analyser finds structure
    structure = DataStructureAnalyser.get_data_structure(dataset)

    # THEN
    # it does return a secondary index
    assert 'secondary' in structure

    # AND
    # results list the gender column
    secondary_column = structure['secondary']
    assert secondary_column['index'] == 2
    assert secondary_column['name'] == 'gender'
    assert secondary_column['count'] == 2


def test_analyser_returns_secondary_result_when_dataset_is_2d_datacube_with_multiple_columns():
    # GIVEN
    # a 2d datacube with ethnicity and multiple other columns
    dataset = [['id', 'ethnicity', 'random', 'gender', 'value'],
               ['1', 'White', 'alpha', 'male', '2'], ['2', 'White', 'beta', 'female', '2'],
               ['2', 'Other', 'gamma', 'male', '2'], ['2', 'Other', 'delta', 'female', '2'],
               ['3', 'All', 'epsilon', 'male', '2'], ['3', 'All', 'theta', 'female', '2']]

    # WHEN
    # analyser finds structure
    structure = DataStructureAnalyser.get_data_structure(dataset)

    # THEN
    # it does return a secondary index identifying the secondary index
    secondary_column = structure['secondary']
    assert secondary_column['index'] == 3
    assert secondary_column['name'] == 'gender'
    assert secondary_column['count'] == 2


def test_analyser_identifies_numeric_secondary_column_when_secondary_column_is_all_numbers():
    # GIVEN
    # a 2d datacube with ethnicity and a numeric other column
    dataset = [['id', 'ethnicity', 'number column', 'value'],
               ['1', 'White', '100', '2'], ['2', 'White', '200', '2'],
               ['2', 'Other', '100', '2'], ['2', 'Other', '200', '2'],
               ['3', 'All', '100', '2'], ['3', 'All', '200', '2']]

    # WHEN
    # analyser finds structure
    structure = DataStructureAnalyser.get_data_structure(dataset)

    # THEN
    # it does return a secondary object with numeric as true
    secondary_column = structure['secondary']
    assert secondary_column['name'] == 'number column'
    assert secondary_column['numeric'] == True


def test_analyser_returns_numeric_is_false_if_secondary_column_contains_any_non_number():
    # GIVEN
    # a 2d datacube with ethnicity and a column with non-numeric values
    dataset = [['id', 'ethnicity', 'non numeric column', 'value'],
               ['1', 'White', 'male', '2'], ['2', 'White', 'female', '2'],
               ['2', 'Other', 'male', '2'], ['2', 'Other', 'female', '2'],
               ['3', 'All', 'male', '2'], ['3', 'All', 'female', '2']]

    # WHEN
    # analyser finds structure
    structure = DataStructureAnalyser.get_data_structure(dataset)

    # THEN
    # it does return a secondary object with numeric as false
    secondary_column = structure['secondary']
    assert secondary_column['name'] == 'non numeric column'
    assert secondary_column['numeric'] == False


def test_analyser_identifies_date_secondary_column_when_secondary_column_can_be_parsed_as_dates():
    # GIVEN
    # a 2d datacube with ethnicity and a numeric other column
    dataset = [['id', 'ethnicity', 'date column', 'value'],
               ['1', 'White', 'Oct 2010', '2'], ['2', 'White', 'Nov 2010', '2'],
               ['2', 'Other', 'Oct 2010', '2'], ['2', 'Other', 'Nov 2010', '2'],
               ['3', 'All', 'Oct 2010', '2'], ['3', 'All', 'Nov 2010', '2']]

    # WHEN
    # analyser finds structure
    structure = DataStructureAnalyser.get_data_structure(dataset)

    # THEN
    # it does return a secondary object with date as true
    secondary_column = structure['secondary']
    assert secondary_column['name'] == 'date column'
    assert secondary_column['date'] == True


def test_analyser_returns_date_is_false_if_secondary_column_contains_any_non_date():
    # GIVEN
    # a 2d datacube with ethnicity and a column with non-date values
    dataset = [['id', 'ethnicity', 'non date column', 'value'],
               ['1', 'White', 'male', '2'], ['2', 'White', 'female', '2'],
               ['2', 'Other', 'male', '2'], ['2', 'Other', 'female', '2'],
               ['3', 'All', 'male', '2'], ['3', 'All', 'female', '2']]

    # WHEN
    # analyser finds structure
    structure = DataStructureAnalyser.get_data_structure(dataset)

    # THEN
    # it does return a secondary object with numeric as false
    secondary_column = structure['secondary']
    assert secondary_column['name'] == 'non date column'
    assert secondary_column['numeric'] == False


def test_analyser_raises_exception_if_dataset_is_not_cube():
    # GIVEN
    # a simple dataset without ethnicity
    dataset = [['id', 'ethnicity', 'non date column', 'value'],
               ['1', 'White', 'male', '2'], ['2', 'White', 'female', '2'],
               ['2', 'Other', 'male', '2'], ['2', 'Other', 'female', '2'],
               ['3', 'All', 'male', '2']]

    # THEN
    # it throws a EthnicityColumnMissingError
    with pytest.raises(DataStructureAnalyser.IncompleteDatacubeException):
        # WHEN
        # analyser finds structure
        DataStructureAnalyser.get_data_structure(dataset)
