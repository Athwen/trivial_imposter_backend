const { getTriviaQuestion } = require('./helpers/GetTriviaQuestion');
const { decode } = require('html-entities');

require('express');

exports.setApp = function (app, db) {
	app.post('/api/startTriviaGame', async (req, res, next) => {

		let { roomCode } = req.body;

		let roomSnapshot = await db.collection('rooms').doc(roomCode).get();
		let roomData = roomSnapshot.data();
		let players = roomData['players'];
		console.log(players)

		preQuestionPoints = [];
		postQuestionPoints = [];

		for (player in players) {
			preQuestionPoints.push(player.points);
		}

		console.log(preQuestionPoints);

		// choose imposter
		// let imposterIndex = Math.floor(Math.random() * players.length);
		// players[imposterIndex].imposter = true;

		let keys = Object.keys(players);
		let randomPlayer = players[keys[keys.length * Math.random() << 0]];
		randomPlayer.imposter = true;

		let triviaInfo = await getTriviaQuestion();
		console.log(triviaInfo.results);
		question = decode(triviaInfo.results[0].question, 'html5');
		correctAnswer = decode(triviaInfo.results[0].correct_answer, 'html5');
		incorrectAnswers = decode(triviaInfo.results[0].incorrect_answers, 'html5');



		await db.collection('rooms').doc(roomCode).update({ 'players': players, 'correctAnswer': correctAnswer, 'incorrectAnswers': incorrectAnswers, 'question': question });


		// start timer for 20 seconds
		setTimeout(function () {
			for (player in players) {
				postQuestionPoints.push(player.points);
			}

			console.log(postQuestionPoints);
			res.status(200).json({ 'good': 'memes' });
		}, 15000)



	});
}