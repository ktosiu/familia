var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var personSchema = new Schema({
	full_name: String,
	gender: String,
	date_of_birth: Date,
	anniversaries: [{
		title: String,
		day: Date
	}],
	relation: String,
	related_to_person: { type: Schema.ObjectId, ref: 'person'},
	phone: String,
	avatar: String,
	is_dead: Boolean
});

mongoose.model('person', personSchema);