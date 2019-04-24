'use strict';

/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
var nodebbNewRelicConfig = require('./config.json').newRelic;
exports.config = {
	/**
	 * Array of application names.
	 */

	app_name: [nodebbNewRelicConfig.appName],
	/**
	 * Your New Relic license key.
	 */
	license_key: nodebbNewRelicConfig.licenseKey,
	logging: {
		/**
		 * Level at which to log. 'trace' is most useful to New Relic when diagnosing
		 * issues with the agent, 'info' and higher will impose the least overhead on
		 * production applications.
		 */
		filepath: require('path').join(process.cwd(), 'logs/newrelic_agent.log'),
		level: 'error',
	},
	/**
	 * When true, all request headers except for those listed in attributes.exclude
	 * will be captured for all traces, unless otherwise specified in a destination's
	 * attributes include/exclude lists.
	 */
	allow_all_headers: true,
	attributes: {
		/**
		 * Prefix of attributes to exclude from all destinations. Allows * as wildcard
		 * at end.
		 *
		 * NOTE: If excluding headers, they must be in camelCase form to be filtered.
		 *
		 * @env NEW_RELIC_ATTRIBUTES_EXCLUDE
		 */
		exclude: [
			'request.headers.cookie',
			'request.headers.authorization',
			'request.headers.proxyAuthorization',
			'request.headers.setCookie*',
			'request.headers.x*',
			'response.headers.cookie',
			'response.headers.authorization',
			'response.headers.proxyAuthorization',
			'response.headers.setCookie*',
			'response.headers.x*',
		],
	},
};
