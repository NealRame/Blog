const _ = require('underscore');
const config = require('../../../config.json');
const fs = require('fs');
const uuid = require('uuid');

const front_matter_template = _.template(
`---
author: Neal.Rame.
category: <%= category %>
draft: <%= draft %>
layout: post.html
post_id: <%= post_id %>
resume: <%= resume %>
title: <%= title %>
---
`);

function validate(value) {
	if (_.isString(value)) {
		return filter(value).length > 0;
	}
	return false;
}

function pipe() {
	const funs = _.toArray(arguments);
	return function(arg) {
		return funs.reduce((v, f) => f(v), arg);
	};
}

function filter(value) {
	return value.trim();
}

module.exports = {
	options: {
		questions: [{
			config: 'title',
			type: 'input',
			message: 'What is the title of that post ?',
			validate,
			filter: s => s.trim()
		}, {
			config: 'author',
			type: 'input',
			message: 'What is the author name of that post ?',
			default: config.site.author,
			filter: s => s.trim()
		},{
			config: 'category',
			type: 'input',
			message: 'What is the category of that post ?',
			validate,
			filter: pipe(
				s => s.trim(),
				s => s.toLowerCase()
			)
		}, {
			config: 'resume',
			type: 'input',
			message: 'What is the resume of that post ?',
			filter: s => s.trim()
		}],
		then: (result, done) => {
			const filename = result.title.toLocaleLowerCase().replace(/\s/g, '-');
			result.post_id = uuid.v4();
			result.draft = true;
			fs.writeFileSync(`src/content/posts/${filename}.md`, front_matter_template(result));
			done();
		}
	}
}
