const { post } = require('../app');
const Blog = require('../models/blog');

const initialPosts = [
	{
		title: 'Cool Post 5',
		author: 'Jack Awesome',
		url: 'https://ismelich.tech/',
		likes: 2,
	},
	{
		title: 'Cool Post 6',
		author: 'Jack Awesome',
		url: 'https://ismelich.tech/',
		likes: 6,
	},
];

const nonExistingId = async () => {
	const post = new Blog({
		title: 'Cool Post 10',
		author: 'Jack Awesome',
		url: 'https://ismelich.tech/',
		likes: 24,
	});
	await post.save();
	await post.remove();

	return post._id.toString();
};

const postsInDb = async () => {
	const posts = await Blog.find({});
	return posts.map((post) => post.toJSON());
};

module.exports = {
	initialPosts,
	nonExistingId,
	postsInDb,
};
