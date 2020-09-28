module.exports = (philUCommands) => {
	/**
	 * @description initialize database process for commands
	 * */
	const initializeDatabase = () => {
		return new Promise((resolve) => {
			const database = require('../database');
			database.init(resolve);
		});
	};

	philUCommands
		.command('convert_email_lower_case')
		.description('Convert users email to lowercase')
		.action(async () => {
			await initializeDatabase();

			const winston = require('winston');
			const { client: db } = require('../database');

			let conversionPerQueryLimit = 50;
			const objectsCollection = db.collection('objects');
			const bulkOperation = objectsCollection.initializeUnorderedBulkOp();

			try {
				const convertUsersProfileEmail = async (skip = 0) => {
					const userProfileSearch = new RegExp('^user:\\d*$');
					const upperCaseEmailSearch = new RegExp('[A-Z]+');
					const search = { _key: userProfileSearch, email: upperCaseEmailSearch };
					const searchProjection = { projection: { _id: false, email: true, _key: true }};
					const userProfileData = await objectsCollection.find(search, searchProjection).skip(skip).limit(conversionPerQueryLimit).toArray();
					const userProfileResultLength = Array.isArray(userProfileData) ? userProfileData.length : 0;
					if (userProfileResultLength) {
						userProfileData.forEach(({ _key, email }) => {
							const emailLowerCase = email.toLowerCase();
							bulkOperation.find({ _key }).updateOne({ $set: { email: emailLowerCase }});
							bulkOperation.find({ _key: 'email:uid', email }).update({ $set: { value: emailLowerCase }});
						});
						if (userProfileResultLength === conversionPerQueryLimit) {
							const nextConversion = skip + conversionPerQueryLimit;
							await convertUsersProfileEmail(nextConversion);
						}
					}
				};
				await convertUsersProfileEmail();
				await bulkOperation.execute();
				winston.info('[command success]: Command successfully completed.');
				const noPendingProcessCode = 0;
				return process.exit(noPendingProcessCode);
			} catch (e) {
				winston.error(`[command error]: ${e}`);
				const uncaughtExceptionCode = 1;
				return process.exit(uncaughtExceptionCode);
			}
		});
};
