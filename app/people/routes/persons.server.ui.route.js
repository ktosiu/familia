var personsController = require('../controllers/persons.server.controller.js');
var domainRoot = '';

module.exports = function(app){

	app.route(domainRoot + '/persons')
	.get(personsController.home) // home.ejs
	.post(personsController.create);
	
	app.route(domainRoot + '/persons/list') 
	.get(personsController.listPersonsUI);

	app.route(domainRoot + '/persons/add')
	.get(personsController.addPersonUI); // add.ejs

	app.route(domainRoot + '/persons/:person_id')
	.get(personsController.view) // view.ejs
	.put(personsController.update)
	.delete(personsController.remove);

	app.route(domainRoot + '/persons/:person_id/edit')
	.get(personsController.edit); // edit.ejs

	app.route(domainRoot + '/persons/:person_id/delete')
	.get(personsController.delete); // delete.ejs

	app.param('person_id', personsController.personById);
}