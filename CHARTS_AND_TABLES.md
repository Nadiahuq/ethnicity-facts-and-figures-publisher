# Chart builder and Table builder

## Files
Each builder consists of a builder interface file, an objects factory and a renderer

Charts
- Builder: create_chart.html
- Factory: rd-chart-objects.js 
- Renderer: rd-graph.js

Tables
- Builder: create_table.html
- Factory: rd-table-objects.js
- Renderer: rd-table.js

Shared
- rd-data-utils.js


### Pattern
Both builders have the same pattern with functions split across their three files 

**Build:** Users set chart settings and data using the Chartbuilder (create_chart.html).

**Encode:** buildChartObject(...) builds a ChartObject that can be consumed by the renderer 

**Render:** renderChartObject(container, chartObject) renders a ChartObject on a page


### Features

Version 1.0 of Chart builder and Table builder built and rendered custom charts that might appear on any statistics website

As the project progressed advanced requirements surfaced for more fully featured generalised chart and table builders and for features specific to Ethnicity Facts and Figures 

#### Chart builder

##### Types
- Basic barcharts
- Grouped barcharts
- Line charts
- Component barcharts (a.k.a. stacked barcharts)
- Panel barcharts (a group of small bar charts)
- Panel linecharts (a group of small line charts)

##### Basic features

- Title
- Footer
- Axis labels
- Formated tooltips
- Unit labels (£, cm, thousand, etc)
- Subtitle (suppressed)

##### Advanced features
* Custom ordering of bars on charts
* Custom ordering of legends
* Chart export as png
* Data validation

##### Ethnicity features
* Harmonised ethnicity labels
* Parent-child relationships - see below

#### Table builder
- Basic table
- Crosstab table

##### Basic features
- Sortable
- Up to 5 data columns

##### Advanced features
* Custom ordering of rows
* Custom ordering of columns
* Table export as csv
* Data validation

##### Ethnicity features
* Harmonised ethnicity labels
* Parent-child relationships - see below

## Ethnicity facts and figures
Two features in the builders are deeply tied into Ethnicity facts and figures

#### Data harmoniser
Harmoniser is a response to the many different formats we got from departments for their ethnicity data.

Departments returned over 300 labels they use to describe ethnicity. We could reduce this to 39 different ethnic groups because they are mostly rehashed versions of the same thing. 

For example Black can be encoded in 6 different ways even before case sensitivity
- Black
- Black or Black British
- Black (including Black British)
- Black/Black British
- Black / Black British
- Black African/Black Caribbean/Black British/Black other

The data harmoniser maps Ethnicity from departments to the standard list. It also adds number of other columns that are used to structure charts and tables

In theory this should work as...

(Ethnicity, Ethnicity Type) => (Standard Ethnicity, Parent, Order)

In practice the mapped columns are rather more extensive and this is a problem it would be good to wind back in the long term

#### Parent-child relationships
The ONS Census 2011 had 18 ethnic groups which can be rolled up into 5 broad categories

- Asian
  - Bangladeshi
  - Chinese
  - Indian
  - Pakistani
  - Other Asian
- Black
  - African
  - Caribbean
  - Other Black
- Mixed/Multiple
  - Mixed White/Asian
  - Mixed White/Black African
  - Mixed White/Black Caribbean
  - Other mixed
- White
  - White British
  - White Irish
  - White Gypsy/Roma traveller
  - White other
- Other
  - Arab
  - Any other ethnicity

The importance of ordering and visualising this hierarchical relationship surfaced strongly during testing so barcharts and all tables support parent-child relationships. 
This is done by designating one data column the Parent Column. If the row's Category value matches the parent then it is styled as a parent.
  