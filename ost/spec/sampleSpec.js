var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).build();

describe('basic test', function () {
	it('title should be Online Sales Tool', function () {
		driver.get('http://127.0.0.1:9000/');
		driver.getTitle().then(function(title) {
      console.log(title);
			expect(title).toBe('Online Sales Tool');
      driver.close();
		});
	});
});
