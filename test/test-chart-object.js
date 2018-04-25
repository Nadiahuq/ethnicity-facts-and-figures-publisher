var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var dataTools = require('../application/src/js/charts/rd-data-tools');
var charts = require('../application/src/js/charts/rd-graph');
var chartObjects = require('../application/src/js/cms/rd-chart-objects');
var _ = require('../application/src/js/charts/vendor/underscore-min');
var utils = require('./utils-for-testing');

describe('rd-chart-objects', function () {
    describe('buildChartObject', function () {

        describe('simple bar-chart', function () {
            var VALUE_COLUMN = 'Value';
            var PRIMARY_COLUMN = 'Category_1';
            function quick_bar_chart_settings(data) {
                return {
                    'data': data,
                    'chart_type': chartObjects.BAR_CHART,
                    'value_column': VALUE_COLUMN,
                    'category_column': PRIMARY_COLUMN
                }
            }

            describe('data-series', function () {
                it('category_column builds bars - defaults to in-data order', function () {
                    // random bar chart
                    var originalData = utils.getRandomArrayDataForChart([10]);
                    var settings = quick_bar_chart_settings(originalData);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var barChart = charts.barchartHighchartObject(chartObject);

                    // get series values
                    var headers = originalData.shift();
                    var categoryColumnIndex = headers.indexOf(PRIMARY_COLUMN);
                    var expectedCategories = _.uniq(_.pluck(originalData, categoryColumnIndex));
                    var actualCategories = barChart.xAxis.categories;

                    // check for match against expected category data
                    expect(actualCategories).to.deep.equal(expectedCategories)
                });

                it('value_column builds bar values', function () {
                    // random bar chart
                    var originalData = utils.getRandomArrayDataForChart([10]);
                    var settings = quick_bar_chart_settings(originalData);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var barChart = charts.barchartHighchartObject(chartObject);

                    // get series values
                    var headers = originalData.shift();
                    var valueColumnIndex = headers.indexOf(VALUE_COLUMN);
                    var expectedValues = _.uniq(_.pluck(originalData, valueColumnIndex));
                    var actualValues = _.pluck(barChart.series[0].data, 'y');

                    // check for match against expected category data
                    expect(actualValues).to.deep.equal(expectedValues)
                });
            });
        });

        describe('grouped bar-charts', function () {
            var VALUE_COLUMN = 'Value';
            var PRIMARY_COLUMN = 'Category_1';
            var SECONDARY_COLUMN = 'Category_2';

            function quick_bar_chart_settings(data) {
                return {
                    'data': data,
                    'chart_type': chartObjects.BAR_CHART,
                    'value_column': VALUE_COLUMN,
                    'category_column': PRIMARY_COLUMN,
                    'secondary_column': SECONDARY_COLUMN
                }
            }

            describe('data-series', function () {
                it('category_column builds bars - defaults to in-data order', function () {
                    // random bar chart
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = quick_bar_chart_settings(originalData);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var barChart = charts.barchartHighchartObject(chartObject);

                    // get series values
                    var headers = originalData.shift();
                    var categoryColumnIndex = headers.indexOf(PRIMARY_COLUMN);
                    var expectedCategories = _.uniq(_.pluck(originalData, categoryColumnIndex));
                    var actualCategories = barChart.xAxis.categories;

                    // check for match against expected category data
                    expect(actualCategories).to.deep.equal(expectedCategories)
                });

                it('secondary_column builds series (different colours of bar) - defaults to in-data order', function () {
                    // random chart
                    var expected = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = quick_bar_chart_settings(expected);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var barChart = charts.barchartHighchartObject(chartObject);
                    
                    // get series values
                    var headers = expected.shift();
                    var barGroupIndex = headers.indexOf(SECONDARY_COLUMN);
                    var expectedBarGroups = _.uniq(_.pluck(expected, barGroupIndex));
                    var actualBarGroups = _.pluck(barChart.series, 'name');
                    
                    // check for match against expected category data
                    expect(actualBarGroups).to.deep.equal(expectedBarGroups)
                });

                it('value_column builds bar values', function () {
                    // random chart
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = quick_bar_chart_settings(originalData);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var barChart = charts.barchartHighchartObject(chartObject);

                    // get bar values
                    var headers = originalData.shift();
                    var secondaryColumnIndex = headers.indexOf(SECONDARY_COLUMN);
                    var valueColumnIndex = headers.indexOf(VALUE_COLUMN);

                    for(series of barChart.series) {
                        var expectedValues = _.pluck(_.filter(originalData, function(row) { return row[secondaryColumnIndex] === series.name; }), valueColumnIndex);
                        var actualValues = _.pluck(series.data, 'y');
                        expect(actualValues).to.deep.equal(expectedValues);
                    }

                });
            })
        });
        describe('line-charts', function () {
            var VALUE_COLUMN = 'Value';
            var X_AXIS_COLUMN = 'Category_1';
            var SERIES_COLUMN = 'Category_2';

            function quick_line_chart_settings(data) {
                return {
                    'data': data,
                    'chart_type': chartObjects.LINE_CHART,
                    'value_column': VALUE_COLUMN,
                    'category_column': X_AXIS_COLUMN,
                    'secondary_column': SERIES_COLUMN
                }
            }

            describe('data-series', function () {

                it('secondary_column builds series (different lines) - defaults to in-data order', function () {
                    // random line chart
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = quick_line_chart_settings(originalData);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var lineChart = charts.linechartHighchartObject(chartObject);
                    
                    // get series values
                    var headers = originalData.shift();
                    var seriesColumnIndex = headers.indexOf(SERIES_COLUMN);
                    var expectedSeries = _.uniq(_.pluck(originalData, seriesColumnIndex));
                    var actualSeries = _.pluck(lineChart.series, 'name');

                    // check for match against expected category data
                    expect(actualSeries).to.deep.equal(expectedSeries)
                });

                it('secondary_column builds x-axis - defaults to in-data order', function () {
                    // random line chart
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = quick_line_chart_settings(originalData);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var lineChart = charts.linechartHighchartObject(chartObject);

                    // get expected x-axis
                    var headers = originalData.shift();
                    var seriesColumnIndex = headers.indexOf(SERIES_COLUMN);
                    var xAxisColumnIndex = headers.indexOf(X_AXIS_COLUMN);
                    var firstSeries = originalData[0][seriesColumnIndex];

                    var expectedXAxis = _.pluck(_.filter(originalData, function(row) { return row[seriesColumnIndex] === firstSeries; }), xAxisColumnIndex);
                    var actualXAxis = lineChart.xAxis.categories;

                    expect(actualXAxis).to.deep.equal(expectedXAxis);
                });


                it('value_column builds y-axis values', function () {
                    // random line chart
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = quick_line_chart_settings(originalData);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var lineChart = charts.linechartHighchartObject(chartObject);

                    // get expected x-axis
                    var headers = originalData.shift();
                    var seriesColumnIndex = headers.indexOf(SERIES_COLUMN);
                    var valueColumnIndex = headers.indexOf(VALUE_COLUMN);

                    for(series of lineChart.series) {
                        var expectedValues = _.pluck(_.filter(originalData, function(row) { return row[seriesColumnIndex] === series.name; }), valueColumnIndex);
                        var actualValues = series.data;
                        expect(actualValues).to.deep.equal(expectedValues) ;
                    }
                });
            });
            describe('sorting', function () {

                it('should maintain linechart x-axis items after sorting series', function () {
                    var original = utils.getRandomArrayDataForChart([8, 8]);

                    // a line chart
                    var unsortedSettings = {
                        'data': original,
                        'chart_type': chartObjects.LINE_CHART,
                        'value_column': 'value',
                        'category_column': 'Category_1',
                        'secondary_column': 'Category_2',
                        'secondary_order_column': 'Sort_2'
                    };
                    var chartObject = chartObjects.buildChartObjectWithDict(unsortedSettings);
                    var lineChart = charts.linechartHighchartObject(chartObject);

                    // the same line chart but sorted
                    var sortedSettings = {
                        'data': original,
                        'chart_type': chartObjects.LINE_CHART,
                        'value_column': 'value',
                        'category_column': 'Category_1',
                        'secondary_column': 'Category_2',
                        'secondary_order_column': 'Sort_2'
                    };
                    var chartObjectSorted = chartObjects.buildChartObjectWithDict(sortedSettings);
                    var lineChartSorted = charts.linechartHighchartObject(chartObjectSorted);

                    // expect series to be shuffled
                    expect(_.pluck(lineChart.series, 'name')).to.not.equal(_.pluck(lineChartSorted.series, 'name'));

                    // but x-axis categories to remain the same
                    expect(lineChart.xAxis.categories).to.deep.equal(lineChartSorted.xAxis.categories);
                });
            });

        });

        describe('component-charts', function () {
            var VALUE_COLUMN = 'Value';
            var CATEGORY_COLUMN = 'Category_1';
            var SERIES_COLUMN = 'Category_2';

            function quick_component_chart_settings(data) {
                return {
                    'data': data,
                    'chart_type': chartObjects.COMPONENT_CHART,
                    'value_column': VALUE_COLUMN,
                    'category_column': CATEGORY_COLUMN,
                    'secondary_column': SERIES_COLUMN
                }
            }
            describe('data-series', function () {

                it('secondary_column builds series (different coloured components) - defaults to in-data order', function () {
                    // random component chart
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = quick_component_chart_settings(originalData);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var componentChart = charts.componentChartHighchartObject(chartObject);

                    // get series values
                    var headers = originalData.shift();
                    var seriesColumnIndex = headers.indexOf(SERIES_COLUMN);
                    var expectedSeries = _.uniq(_.pluck(originalData, seriesColumnIndex)).reverse(); // note: series get reversed to
                    var actualSeries = _.pluck(componentChart.series, 'name');

                    // check for match against expected category data
                    // TODO: Fix this issue which is messing with series order
                    expect(actualSeries).to.deep.equal(expectedSeries)
                });

                it('category_column builds bars - defaults to in-data order', function () {
                    // random component chart
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = quick_component_chart_settings(originalData);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var componentChart = charts.componentChartHighchartObject(chartObject);

                    // get expected bars
                    var headers = originalData.shift();
                    var seriesColumnIndex = headers.indexOf(SERIES_COLUMN);
                    var categoryColumnIndex = headers.indexOf(CATEGORY_COLUMN);
                    var firstSeries = originalData[0][seriesColumnIndex];

                    var expectedBars  = _.pluck(_.filter(originalData, function(row) { return row[seriesColumnIndex] === firstSeries; }), categoryColumnIndex);
                    var actualBars = componentChart.xAxis.categories;

                    expect(actualBars).to.deep.equal(expectedBars) ;
                });


                it('value_column builds component values', function () {
                    // random component chart
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = quick_component_chart_settings(originalData);
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var componentChart = charts.componentChartHighchartObject(chartObject);

                    // get expected bars
                    var headers = originalData.shift();
                    var seriesColumnIndex = headers.indexOf(SERIES_COLUMN);
                    var valueColumnIndex = headers.indexOf(VALUE_COLUMN);

                    for(series of componentChart.series) {
                        var expectedValues = _.pluck(_.filter(originalData, function(row) { return row[seriesColumnIndex] === series.name; }), valueColumnIndex);
                        var actualValues = series.data;
                        expect(actualValues).to.deep.equal(expectedValues) ;
                    }
                });

            });
        });

        describe('panel-bar-charts', function () {
            describe('data-series', function () {
                var BAR_COLUMN = 'Category_1';
                var PANEL_COLUMN = 'Category_2';
                var VALUE_COLUMN = 'Value';
                function quick_panel_bar_settings(data) {
                    return {
                        'data': data,
                        'chart_type': chartObjects.PANEL_BAR_CHART,
                        'value_column': VALUE_COLUMN,
                        'category_column': BAR_COLUMN,
                        'secondary_column': PANEL_COLUMN
                    }
                }

                it('secondary_column builds panels - defaults to in-data order', function () {
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var chartObject = chartObjects.buildChartObjectWithDict(quick_panel_bar_settings(originalData));
                    var panelBarChart = charts.panelBarchartHighchartsObject(chartObject);

                    // get panel values
                    var headers = originalData.shift();
                    var panelsColumnIndex = headers.indexOf(PANEL_COLUMN);
                    var expectedPanels = _.uniq(_.pluck(originalData, panelsColumnIndex));
                    var actualPanels = _.map(panelBarChart.panels, function(panel) { return panel.title.text });

                    expect(actualPanels).to.deep.equal(expectedPanels) ;
                });

                it('category_column builds bars (within each panel) - defaults to in-data order', function () {
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var chartObject = chartObjects.buildChartObjectWithDict(quick_panel_bar_settings(originalData));
                    var panelBarChart = charts.panelBarchartHighchartsObject(chartObject);

                    // get expected bars
                    var headers = originalData.shift();
                    var panelsColumnIndex = headers.indexOf(PANEL_COLUMN);
                    var barColumnIndex = headers.indexOf(BAR_COLUMN);

                    var firstPanel = originalData[0][panelsColumnIndex];
                    var expectedBars = _.pluck(_.filter(originalData, function(row) { return row[panelsColumnIndex] === firstPanel; }), barColumnIndex);

                    for(panel of panelBarChart.panels) {
                        var actualBars = panel.xAxis.categories;
                        expect(actualBars).to.deep.equal(expectedBars) ;
                    }
                });

                it('value_column builds bar values', function () {
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var chartObject = chartObjects.buildChartObjectWithDict(quick_panel_bar_settings(originalData));
                    var panelBarChart = charts.panelBarchartHighchartsObject(chartObject);

                    // get expected bars
                    var headers = originalData.shift();
                    var panelsColumnIndex = headers.indexOf(PANEL_COLUMN);
                    var valueColumnIndex = headers.indexOf(VALUE_COLUMN);

                    // data should be in order it appears in the original data
                    for(panel of panelBarChart.panels) {
                        var expectedValues = _.pluck(_.filter(originalData, function(row) { return row[panelsColumnIndex] === panel.title.text; }), valueColumnIndex);
                        var actualValues = _.pluck(panel.series[0].data, 'y');
                        expect(actualValues).to.deep.equal(expectedValues) ;
                    }
                });
            });
        });

        describe('panel-line-charts', function () {
            describe('data-series', function () {
                var XAXIS_COLUMN = 'Category_1';
                var PANEL_COLUMN = 'Category_2';
                function quick_panel_line_settings(data) {
                    return {
                        'data': data,
                        'chart_type': chartObjects.PANEL_LINE_CHART,
                        'value_column': 'value',
                        'category_column': PANEL_COLUMN,
                        'secondary_column': XAXIS_COLUMN
                    }
                }

                it('category_column builds panels - defaults to in-data order', function () {
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var chartObject = chartObjects.buildChartObjectWithDict(quick_panel_line_settings(originalData));
                    var panelLineChart = charts.panelBarchartHighchartsObject(chartObject);

                    // get panel values
                    var headers = originalData.shift();
                    var panelsColumnIndex = headers.indexOf(PANEL_COLUMN);
                    var expectedPanels = _.uniq(_.pluck(originalData, panelsColumnIndex));
                    var actualPanels = _.map(panelLineChart.panels, function(panel) { return panel.title.text });

                    expect(actualPanels).to.deep.equal(expectedPanels) ;
                });

                it('secondary_column builds x-axis (within each panel) - defaults to sorted order', function () {
                    var originalData = utils.getRandomArrayDataForChart([10, 5]);
                    var chartObject = chartObjects.buildChartObjectWithDict(quick_panel_line_settings(originalData));
                    var panelLineChart = charts.panelBarchartHighchartsObject(chartObject);

                    // get expected bars
                    var headers = originalData.shift();
                    var panelsColumnIndex = headers.indexOf(PANEL_COLUMN);
                    var xAxisColumnIndex = headers.indexOf(XAXIS_COLUMN);

                    // x-axis behavior differs from regular linechart - perhaps time to review
                    var firstPanel = originalData[0][panelsColumnIndex];
                    var expectedXAxis = _.pluck(_.filter(originalData, function(row) { return row[panelsColumnIndex] === firstPanel; }), xAxisColumnIndex).sort();

                    for(panel of panelLineChart.panels) {
                        var actualXAxis = panel.xAxis.categories;
                        expect(actualXAxis).to.deep.equal(expectedXAxis) ;
                    }
                });


            });
        });
    });


});
