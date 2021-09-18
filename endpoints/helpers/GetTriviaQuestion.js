const axios = require('axios').default;

exports.getTriviaQuestion = async function () {
	res = await axios.post('https://opentdb.com/api.php?amount=1&type=multiple');
	console.log(res.data);
	return res.data;

}