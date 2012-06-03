/*
 * GET home page.
 */
exports.index = function(req, res){
	var request = require('request');
	
	var protocol = 'https://'; // Always secure
	var baseURL = 'api.instagram.com';
	var getTitsURL = '/v1/tags/titstagram/media/recent';
	var appID = 'acd4adec48f143259c8d955abac30e00';

	var url = protocol+baseURL+getTitsURL+'?client_id='+appID;

	request(url, function(error, response, body) {
		if(response.statusCode != 200) {

			if(response.headers['x-ratelimit-remaining'] <= 0)
				res.send(	"We surpassed our 5000 anonymous user limit." +
							"Please login to see more titstagrams!"); // TODO: Render this elsewhere.

			res.send('Ooops, we had an error!'); // TODO: Render this in a proper error page
		}
		else {
			var tits = JSON.parse(response.body);
			res.render('index', {title: 'Titstagram', pics:  tits.data });
		}
	});
};