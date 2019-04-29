'use strict';

var request = require('request');
var assert = require('assert');
var nconf = require('nconf');

describe('Philu theme', function () {
	it('should work', function () {
		request(nconf.get('url') + '/api/v2/category/featured', function (err, res, done) {
			assert.ifError(err);
			assert.equal(res.statusCode, 200);
			done();
		});
	});
});
