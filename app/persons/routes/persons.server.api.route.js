var personsController = require('../controllers/persons.server.controller.js');
var domainRoot = '/api';
module.exports = function(app){

	app.route(domainRoot + '/persons')
	.get(personsController.listPersonsAPI) // home.ejs
	.post(personsController.createPersonAPI);

	app.route(domainRoot + '/persons/list')
	.get(personsController.fetchPersonsAPI);

	app.param('person_id', personsController.personById);
}
