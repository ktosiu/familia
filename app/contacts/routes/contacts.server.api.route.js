var contactsController = require('../controllers/contacts.server.controller.js');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var domainRoot = '/api';

module.exports = function(app){
	app.route(domainRoot + '/contacts')
	.post(upload.single('avatar'), contactsController.createContactAPI);

	app.route(domainRoot + '/contacts/list')
	.get(contactsController.fetchContactAPI); // home.ejs

	app.route(domainRoot + '/contacts/:contact_id')
	.get(contactsController.viewContactAPI)
	.put(contactsController.updateContactAPI)
	.delete(contactsController.removeContactAPI);

	app.param('contact_id', contactsController.contactById);
}