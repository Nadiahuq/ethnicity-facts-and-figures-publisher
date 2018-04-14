# Chart builder and Table builder

## Files
Each builder consists of a create.html file, an objects factory and a renderer

Charts
- create_chart.html
- rd-chart-objects.js 
- rd-graph.js

Tables
- create_table.html
- rd-table-objects.js
- rd-table.js

Shared
- rd-data-utils.js


### Pattern
Both builders have the same pattern with functions split across their three files 

**Build:** Users set chart settings and data using the Chartbuilder (create_chart.html).

**Encode:** BuildChartObject(...) builds a ChartObject 

**Render:** renderChartObject(container, chartObject) renders a ChartObject on a page


### Features

Version 1.0 of Chart builder and Table builder built and rendered custom charts that might appear on any statistics website

As the project progressed 

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
- Axis labels
- Unit labels (£, cm, thousand, etc)

##### Ethnicity features
* Custom ordering of bars on charts
* Custom ordering of legends
* Harmonised ethnicity labels
* Parent-child relationships - see below

#### Table builder
- Basic table
- Crosstab table