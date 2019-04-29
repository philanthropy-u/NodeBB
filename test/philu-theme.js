'use strict';

var request = require('request');
var assert = require('assert');
var nconf = require('nconf');
var path = require('path');
var plugins = require('../src/plugins');

describe('Philu theme', function () {
	it('It should load Philu theme', function (done) {
		var pluginId = 'nodebb-theme-philu-community';
		plugins.loadPlugin(path.join(nconf.get('base_dir'), 'node_modules/' + pluginId), function (err) {
			assert.ifError(err);
			assert(plugins.libraries[pluginId]);
			assert(plugins.loadedHooks['static:app.load']);

			done();
		});
	});

	/*
	it('should work', function () {
		var url = nconf.get('url') + '/api/v2/category/featured';
		console.log('URLLLLL', url);
		request(url, function (err, res, done) {
			assert.ifError(err);
			assert.equal(res.statusCode, 200);
			done();
		});
	});
	*/
});
