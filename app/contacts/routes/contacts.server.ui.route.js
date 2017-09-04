var contactsController = require('../controllers/contacts.server.controller.js');
	var domainRoot = '';
	module.exports = function(app){
	app.route(domainRoot + '/contacts')
	.get(contactsController.home) // home.ejs
	.post(contactsController.create);
	
	app.route(domainRoot + '/contacts/list') 
	.get(contactsController.list);

	app.route(domainRoot + '/contacts/add')
	.get(contactsController.add); // add.ejs

	app.route(domainRoot + '/contacts/:contact_id')
	.get(contactsController.view) // view.ejs
	.put(contactsController.update)
	.delete(contactsController.remove);

	app.route(domainRoot + '/contacts/:contact_id/edit')
	.get(contactsController.edit); // edit.ejs

	app.route(domainRoot + '/contacts/:contact_id/delete')
	.get(contactsController.delete); // delete.ejs

	app.param('contact_id', contactsController.contactById);
	}
