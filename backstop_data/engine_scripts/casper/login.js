module.exports = function (casper, scenario) {
  var cookiePath = "cookies.json";

  if (casper.getCurrentUrl() === scenario.url) {
    casper.echo('On correct URL - no login required.');
    return;
  }

  casper.waitForSelector('input[name=password]', function () {
    this.fillSelectors('form[action="/auth/login"]', { 'input[name=email]': process.env.BACKSTOP_EMAIL, 'input[name=password]': process.env.BACKSTOP_PASSWORD }, true);
  });
};
