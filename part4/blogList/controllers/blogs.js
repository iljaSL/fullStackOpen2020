const express = require('express');
const Blog = require('../models/blog.js');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const blogsRouter = express.Router();

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
	response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
	const post = await Note.findById(request.params.id);
	if (post) {
		response.json(post);
	} else {
		response.status(404).end();
	}
});

const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}
	return null;
};

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body;
	const token = getTokenFrom(request);
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}
	const user = await User.findById(body.userId);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
	});

	if (!body.title && !body.url) {
		return response.status(400).end();
	}

	const savedPost = await blog.save();
	user.blogs = user.blogs.concat(savedPost._id);
	await user.save();

	response.json(savedPost);
});

blogsRouter.delete('/:id', async (request, response, next) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body;
	const post = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	const getPost = await Blog.findByIdAndUpdate(request.params.id, post, {
		new: true,
	});
	response.json(getPost.toJSON());
});

module.exports = blogsRouter;
