import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
