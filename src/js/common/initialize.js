const _ = require('underscore');
const fs = require('fs');

function validate(value) {
	if (_.isString(value)) {
		return filter(value).length > 0;
	}
	return false;
}

function validate_picture(value) {
	try {
		const stats = fs.statSync(value);
		return stats.isFile();
	} catch (err) {
		return false;
	}
}

function filter(value) {
	return value.trim();
}

module.exports = {
	options: {
		questions: [{
			config: 'site-name',
			type: 'input',
			message: 'What is the site name ?',
			validate,
			filter
		}, {
			config: 'name',
			type: 'input',
			message: 'What is your name ?',
			validate,
			filter
		}, {
			config: 'address',
			type: 'input',
			message: 'What is your address ?',
			filter
		}, {
			config: 'phone',
			type: 'input',
			message: 'What is your phone ?',
			filter
		}, {
			config: 'email',
			type: 'input',
			message: 'What is your email address ?',
			filter
		}, {
			config: 'birth',
			type: 'input',
			message: 'What is your birthday ?',
			filter
		}, {
			config: 'github',
			type: 'input',
			message: 'What is your github profile address ?',
			filter
		}, {
			config: 'facebook',
			type: 'input',
			message: 'What is your facebook profile address ?',
			filter
		}, {
			config: 'twitter',
			type: 'input',
			message: 'What is your twitter profile address ?',
			filter
		}, {
			config: 'picture',
			type: 'input',
			message: 'Do you have a picture of you ?',
			validate: validate_picture
		}],
		then: (result, done) => {
			fs.writeFileSync('config.json', JSON.stringify(result, null, 2));
			done();
		}
	}
}
