const http = require('http');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const path = require('path');
const PORT = process.env.PORT || 5555;
const app = express();
var admin = require('firebase-admin');

app.set('port', (process.env.PORT || 5555));
app.use(express.json());



const serviceAccount = require('./trivial-imposter-firebase-adminsdk-3c42s-b1d1ef162e.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const endPoints = fs.readdirSync('./endpoints').filter(file => file.endsWith('.js'));
for (const file of endPoints) {
	var api = require(`./endpoints/${file}`);
	api.setApp(app, db);

}

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
});




// start Node + Express server on port 5000
const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);

});
