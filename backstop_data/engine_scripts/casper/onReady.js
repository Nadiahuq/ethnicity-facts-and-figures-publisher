module.exports = function(casper, scenario, vp) {
  require('./login')(casper, scenario);

  casper.then(function () {
    casper.echo('SCENARIO END> ' + scenario.label + ', ' + vp.label);
    casper.wait(2000);
  });
};