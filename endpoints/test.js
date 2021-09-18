const { getTriviaQuestion } = require('./helpers/GetTriviaQuestion');

require('express');

exports.setApp = function (app) {
	app.post('/api/test', async (req, res, next) => {
		getTriviaQuestion();
		res.status(200).json({ 'good': 'memes' });
	});
}