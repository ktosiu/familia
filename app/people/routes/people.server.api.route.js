var peopleController = require('../controllers/people.server.controller.js');
var domainRoot = '/api';
module.exports = function(app){

	app.route(domainRoot + '/people')
	.get(peopleController.listPeopleAPI) // home.ejs
	.post(peopleController.createPeopleAPI);

	app.route(domainRoot + '/people/list')
	.get(peopleController.fetchPeopleAPI);

	app.param('people_id', peopleController.peopleById);
}
