var contactsController = require('../controllers/contacts.server.controller.js');
var domainRoot = '';

module.exports = function(app){
	app.route(domainRoot + '/contacts')
	.get(contactsController.home);
	
	app.route(domainRoot + '/contacts/list') 
	.get(contactsController.listContactUI);

	app.route(domainRoot + '/contacts/add')
	.get(contactsController.addContactUI); // add.ejs

	app.route(domainRoot + '/contacts/:contact_id')
	.get(contactsController.viewContactUI) // view.ejs
	.put(contactsController.home)
	.delete(contactsController.home);

	app.route(domainRoot + '/contacts/:contact_id/edit')
	.get(contactsController.home); // edit.ejs

	app.route(domainRoot + '/contacts/:contact_id/delete')
	.get(contactsController.home); // delete.ejs

	app.param('contact_id', contactsController.contactById);
}
