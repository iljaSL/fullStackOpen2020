const { response } = require('express');
const express = require('express');
const { request } = require('../app.js');
const Blog = require('../models/blog.js');

const blogsRouter = express.Router();

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
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

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	});

	if (!body.title && !body.url) {
		return response.status(400).end();
	}

	const savedPost = await blog.save();
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
