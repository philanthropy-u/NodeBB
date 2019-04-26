'use strict';

var request = require('request');
var assert = require('assert');

describe('Philu theme', function () {
	it('should work', function () {
		request('localhost:4567/api/v2/category/featured', function (err, res, done) {
			assert.ifError(err);
			assert.equal(res.statusCod, 200);
			done();
		});
	});
});
