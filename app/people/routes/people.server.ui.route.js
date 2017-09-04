var peopleController = require('../controllers/people.server.controller.js');
var domainRoot = '';

module.exports = function(app){

	app.route(domainRoot + '/people')
	.get(peopleController.home) // home.ejs
	.post(peopleController.create);
	
	app.route(domainRoot + '/people/list') 
	.get(peopleController.listpeopleUI);

	app.route(domainRoot + '/people/add')
	.get(peopleController.addPersonUI); // add.ejs

	app.route(domainRoot + '/people/:people_id')
	.get(peopleController.view) // view.ejs
	.put(peopleController.update)
	.delete(peopleController.remove);

	app.route(domainRoot + '/people/:people_id/edit')
	.get(peopleController.edit); // edit.ejs

	app.route(domainRoot + '/people/:people_id/delete')
	.get(peopleController.delete); // delete.ejs

	app.param('people_id', peopleController.personById);
}