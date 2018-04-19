var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var dataTools = require('../application/src/js/charts/rd-data-tools');
var charts = require('../application/src/js/charts/rd-graph');
var chartObjects = require('../application/src/js/cms/rd-chart-objects');
var _ = require('../application/src/js/charts/vendor/underscore-min');
var utils = require('./utils-for-testing');

describe('rd-chart-objects', function () {
    describe('#buildChartObjectWithDict()', function () {

        describe('simple bar-charts', function () {
            describe('equality function', function () {
                it('should pass data in original order for simple barchart', function () {

                    var original = utils.getRandomArrayDataForChart([10]);
                    var settings = {
                        'data': original,
                        'chart_type': chartObjects.BAR_CHART,
                        'value_column': 'value',
                        'category_column': 'Category_1'
                    };

                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var barChart = charts.barchartHighchartObject(chartObject);

                    expect(simpleBarchartHighchartSeriesEqualsOriginalData(barChart, original)).to.equal(true);
                });

                it('should fail a non equal simple barchart', function () {
                    var original = utils.getRandomArrayDataForChart([10]);
                    var settings = {
                        'data': original,
                        'chart_type': chartObjects.BAR_CHART,
                        'value_column': 'value',
                        'category_column': 'Category_1'
                    };
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var barChart = charts.barchartHighchartObject(chartObject);

                    // when we compare to alternate data
                    var alternate = utils.getRandomArrayDataForChart([10]);

                    expect(simpleBarchartHighchartSeriesEqualsOriginalData(barChart, alternate)).to.equal(false);
                });
            });
        });

        describe('grouped bar-charts', function () {
            describe('equality function', function () {
                it('should pass a grouped barchart against expected data', function () {
                    var original = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = {
                        'data': original,
                        'chart_type': chartObjects.BAR_CHART,
                        'value_column': 'value',
                        'category_column': 'Category_1',
                        'secondary_column': 'Category_2'
                    };

                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var barChart = charts.barchartHighchartObject(chartObject);

                    expect(groupedBarchartHighchartSeriesEqualsExpectedData(barChart, original, 'Category_1', 'Category_2')).to.equal(true);
                });

                it('should fail a grouped barchart against alternate data', function () {
                    var original = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = {
                        'data': original,
                        'chart_type': chartObjects.BAR_CHART,
                        'value_column': 'value',
                        'category_column': 'Category_1',
                        'secondary_column': 'Category_2'
                    };
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var barChart = charts.barchartHighchartObject(chartObject);

                    var alternate = utils.getRandomArrayDataForChart([10, 5]);

                    expect(groupedBarchartHighchartSeriesEqualsExpectedData(barChart, alternate, 'Category_1', 'Category_2')).to.equal(false);
                });
            })
        });
        describe('line-charts', function () {
            describe('equality function', function () {

                it('should pass a linechart against expected data', function () {
                    var original = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = {
                        'data': original,
                        'chart_type': chartObjects.LINE_CHART,
                        'value_column': 'value',
                        'category_column': 'Category_1',
                        'secondary_column': 'Category_2'
                    };
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var lineChart = charts.linechartHighchartObject(chartObject);

                    expect(linechartHighchartSeriesEqualsExpectedData(lineChart, original, 'Category_1', 'Category_2')).to.equal(true);
                });

                it('should fail a linechart against alternate data', function () {
                    var original = utils.getRandomArrayDataForChart([10, 5]);
                    var settings = {
                        'data': original,
                        'chart_type': chartObjects.LINE_CHART,
                        'value_column': 'value',
                        'category_column': 'Category_1',
                        'secondary_column': 'Category_2'
                    };
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var lineChart = charts.linechartHighchartObject(chartObject);

                    var alternate = utils.getRandomArrayDataForChart([10, 5]);

                    expect(linechartHighchartSeriesEqualsExpectedData(lineChart, alternate, 'Category_1', 'Category_2')).to.equal(false);
                });

                it('should ignore series order', function () {
                    var original = utils.getRandomArrayDataForChart([3, 10]);
                    var settings = {
                        'data': original,
                        'chart_type': chartObjects.LINE_CHART,
                        'value_column': 'value',
                        'category_column': 'Category_1',
                        'secondary_column': 'Category_2',
                        'secondary_order_column': 'Sort_2'
                    };
                    var chartObject = chartObjects.buildChartObjectWithDict(settings);
                    var lineChart = charts.linechartHighchartObject(chartObject);

                    expect(linechartHighchartSeriesEqualsExpectedData(lineChart, original, 'Category_1', 'Category_2')).to.equal(true);
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

    });


});

function simpleBarchartHighchartSeriesEqualsOriginalData(highchart, original) {
    var fullMatch = true;
    var valueColumn = original[0].indexOf('Value');
    _.forEach(highchart.series, function (s) {
        var originalCategory = s.name;
        var originalColumn = original[0].indexOf(originalCategory);
        var originalCategoryValues = _.map(original, function (row) {
            return row[originalColumn];
        });
        var found = false;

        _.forEach(s.data, function (item, index) {
            var actual = item.y;
            var expectedRowIndex = originalCategoryValues.indexOf(item.category);
            if (expectedRowIndex >= 0) {
                var expected = original[expectedRowIndex][valueColumn];
                if (actual !== expected) {
                    fullMatch = false;
                }
            } else {
                fullMatch = false;
            }
        })
    });
    return fullMatch;
}

function groupedBarchartHighchartSeriesEqualsExpectedData(highchart, original, categoryColumn, groupedColumn) {
    var fullMatch = true;
    var valueIndex = original[0].indexOf('Value');
    var categoryIndex = original[0].indexOf(categoryColumn);
    var groupIndex = original[0].indexOf(groupedColumn);
    var originalCategoryGroupValues = _.map(original, function (row) {
        return row[categoryIndex] + '|' + row[groupIndex]
    });

    _.forEach(highchart.series, function (s) {
        var group = s.name;

        _.forEach(s.data, function (item, index) {
            var actual = item.y;
            var category = item.category;

            var expectedRowIndex = originalCategoryGroupValues.indexOf(category + '|' + group);
            if (expectedRowIndex >= 0) {
                var expected = original[expectedRowIndex][valueIndex];
                if (actual !== expected) {
                    fullMatch = false;
                }
            } else {
                fullMatch = false;
            }
        })
    });
    return fullMatch;
}

function linechartHighchartSeriesEqualsExpectedData(highchart, original, categoryColumn, seriesColumn) {
    var fullMatch = true;
    var valueIndex = original[0].indexOf('Value');
    var categoryIndex = original[0].indexOf(categoryColumn);
    var seriesIndex = original[0].indexOf(seriesColumn);
    var originalCategoryGroupValues = _.map(original, function (row) {
        return row[categoryIndex] + '|' + row[seriesIndex]
    });

    _.forEach(highchart.series, function (s) {
        var series = s.name;

        _.forEach(highchart.xAxis.categories, function (category, index) {
            var actual = s.data[index];

            var expectedRowIndex = originalCategoryGroupValues.indexOf(category + '|' + series);
            if (expectedRowIndex >= 0) {
                var expected = original[expectedRowIndex][valueIndex];
                if (actual !== expected) {
                    fullMatch = false;
                }
            } else {
                fullMatch = false;
            }
        })
    });
    return fullMatch;
}



function getNumberFormat(format, prefix, suffix, min, max) {
    if(format === 'none' || format === null) {
        return {'multiplier':1.0, 'prefix':'', 'suffix':'', 'min':'', 'max':''}
    } else if (format === 'percent') {
        return {'multiplier':1.0, 'prefix':'', 'suffix':'%', 'min':0.0, 'max':100.0}
    } else if (format === 'percent100') {
        return {'multiplier':100.0, 'prefix':'', 'suffix':'%', 'min':0.0, 'max':100.0}
    } else if (format === 'other') {
        return {'multiplier':1.0, 'prefix':prefix, 'suffix':suffix, 'min':min, 'max':max}
    }
}