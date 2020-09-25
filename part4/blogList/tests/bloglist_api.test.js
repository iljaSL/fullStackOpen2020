const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
	await Blog.deleteMany({});

	for (let post of helper.initialPosts) {
		let blogObject = new Blog(post);
		await blogObject.save();
	}
});

test('posts are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('all posts are returned', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body).toHaveLength(helper.initialPosts.length);
});

test('a specific post is within the returned notes', async () => {
	const response = await api.get('/api/blogs');

	const titles = response.body.map((r) => r.title);
	expect(titles).toContain('Cool Post 5');
});

test('a valid post can be added', async () => {
	const newPost = {
		title: 'Cool Post 8',
		author: 'Jack Awesome',
		url: 'https://ismelich.tech/',
		likes: 10,
	};

	await api
		.post('/api/blogs')
		.send(newPost)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	const postsAtEnd = await helper.postsInDb();
	expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1);

	const titles = postsAtEnd.map((n) => n.title);
	expect(titles).toContain('Cool Post 8');
});

test('post without title is not added', async () => {
	const newPost = {
		title: '',
		author: 'Jack Awesome',
		url: 'https://ismelich.tech/',
		likes: 10,
	};

	await api.post('/api/blogs').send(newPost).expect(400);

	const postsAtEnd = await helper.postsInDb();

	expect(postsAtEnd).toHaveLength(helper.initialPosts.length);
});

test('a post can be deleted', async () => {
	const postsAtStart = await helper.postsInDb();
	const postToDelete = postsAtStart[0];

	await api.delete(`/api/blogs/${postToDelete.id}`).expect(204);
	const postsAtEnd = await helper.postsInDb();

	expect(postsAtEnd).toHaveLength(helper.initialPosts.length - 1);

	const titles = postsAtEnd.map((r) => r.title);

	expect(titles).not.toContain(postToDelete.title);
});

test('verifies that the unique identifier property of the blog posts is named id', async () => {
	const post = await api.get('/api/blogs');
	expect(post.body[0].id).toBeDefined();
});

test('testing default like is 0, when no likes are available', async () => {
	const noLikes = new Blog({
		title: 'Cool Post 55',
		author: 'Jack Awesome',
		url: 'https://ismelich.tech/',
	});

	await api
		.post('/api/blogs')
		.send(noLikes)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	const postsAtEnd = await helper.postsInDb();
	const posts = await postsAtEnd.find((post) => post.title === 'Cool Post 55');

	expect(posts.likes).toEqual(0);
});

test('title and url properties are missing from the request data, respond with 400 ', async () => {
	const badPost = new Blog({
		author: 'Jack Awwesome',
		likes: 2,
	});

	await api.post('/api/blogs').send(badPost).expect(400);
});

test('unique identifier property of the blog posts is named id not _id', async () => {
	const postsAtEnd = await helper.postsInDb();
	const post = postsAtEnd[0];

	expect(post.id).toBeDefined();
});

afterAll(() => {
	mongoose.connection.close();
});
