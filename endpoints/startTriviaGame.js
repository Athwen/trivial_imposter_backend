const { getTriviaQuestion } = require('./helpers/GetTriviaQuestion');

require('express');

exports.setApp = function (app, db) {
	app.post('/api/startTriviaGame', async (req, res, next) => {

		let { roomCode } = req.body;

		let roomSnapshot = await db.collection('rooms').doc(roomCode).get();
		let roomData = roomSnapshot.data();
		let players = roomData['players'];
		console.log(players)

		// choose imposter
		let imposterIndex = Math.floor(Math.random() * players.length);
		players[imposterIndex].imposter = true;

		let triviaInfo = await getTriviaQuestion();
		console.log(triviaInfo.results);
		question = triviaInfo.results[0].question;
		correctAnswer = triviaInfo.results[0].correct_answer;
		incorrectAnswers = triviaInfo.results[0].incorrect_answers;

		await db.collection('rooms').doc(roomCode).update({ 'players': players, 'correctAnswer': correctAnswer, 'incorrectAnswers': incorrectAnswers, 'question': question });


		// start timer for 20 seconds



		res.status(200).json({ 'good': 'memes' });
	});
}