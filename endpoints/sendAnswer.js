const { getTriviaQuestion } = require('./helpers/GetTriviaQuestion');

require('express');

exports.setApp = function (app) {
	app.post('/api/sendanswer', async (req, res, next) => {
		let { roomCode, answer, username } = req.body;

		let roomSnapshot = await db.collection('rooms').doc(roomCode).get();
		let roomData = roomSnapshot.data();
		let players = roomData['players'];

		players[username].points += 1;

		if (answer == roomData['correctAnswer']) {
			await db.collection('rooms').doc(roomCode).update({ 'players': players });
		}


		res.status(200).json({ 'good': 'memes' });
	});
}