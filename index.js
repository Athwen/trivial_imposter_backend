const http = require('http');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config()

const path = require('path');
const PORT = process.env.PORT || 5555;
const app = express();
var admin = require('firebase-admin');

app.set('port', (process.env.PORT || 5555));
app.use(express.json());

serviceAccount = {
	type: process.env.type,
	project_id: process.env.project_id,
	private_key_id: process.env.private_key_id,
	private_key: process.env.private_key.replace(/\\n/g, '\n'),
	client_email: process.env.client_email,
	client_id: process.env.client_id,
	auth_uri: process.env.auth_uri,
	token_uri: process.env.token_uri,
	auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
	client_x509_cert_url: process.env.client_x509_cert_url,
};
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
