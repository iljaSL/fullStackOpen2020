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

test('update the blog post', async () => {
	const post = {
		title: 'Cool Post 55',
		author: 'Jack Awwesome',
		url: 'https://ismelich.tech/',
		likes: 5,
	};

	const postsAtStart = await helper.postsInDb();
	const postToUpdate = postsAtStart[0];

	await api.put(`/api/blogs/${postToUpdate.id}`).send(post).expect(200);

	const postsAtEnd = await helper.postsInDb();
	const postAfterUpdate = postsAtEnd[0];

	expect(postAfterUpdate.title).toEqual(post.title);
	expect(postAfterUpdate.author).toEqual(post.author);
	expect(postAfterUpdate.url).toEqual(post.url);
	expect(postAfterUpdate.likes).toEqual(post.likes);
});

describe('most blogs entires and most likes', () => {
	const blogs = [
		{
			likes: 17,
			title: 'Cool Post 55',
			author: 'Edsger W. Dijkstra',
			url: 'https://ismelich.tech/',
			id: '5f6e0a294ec27648f11ae327',
		},
		{
			likes: 5,
			title: 'Cool Post 55',
			author: 'Jack Awwesome',
			url: 'https://ismelich.tech/',
			id: '5f6e0a294ec27648f11ae327',
		},
		{
			likes: 6,
			title: 'Cool Post 6',
			author: 'Jack Awesome',
			url: 'https://ismelich.tech/',
			id: '5f6e0a2a4ec27648f11ae328',
		},
		{
			likes: 3,
			title: 'Cool Post 1',
			author: 'Robert C. Martin',
			url: 'https://ismelich.tech/',
			id: '5f7194e1cbee1cc59de4085f',
		},
		{
			likes: 3,
			title: 'Cool Post 2',
			author: 'Robert C. Martin',
			url: 'https://ismelich.tech/',
			id: '5f7194e5cbee1cc59de40860',
		},
		{
			likes: 3,
			title: 'Cool Post 3',
			author: 'Robert C. Martin',
			url: 'https://ismelich.tech/',
			id: '5f7194eccbee1cc59de40861',
		},
	];

	test('returns the author who has the largest amount of blogs', async () => {
		const authorWithMostBlogs = {
			author: 'Robert C. Martin',
			blogs: 3,
		};

		const result = helper.mostBlogs(blogs);
		console.log('RESULT', result);
		expect(result).toEqual(authorWithMostBlogs);
	});

	test('blog posts with the largest amount of likes', async () => {
		const authorWithMostLikes = {
			author: 'Edsger W. Dijkstra',
			likes: 17,
		};

		const result = helper.mostLikes(blogs);
		console.log('RESULT', result);
		expect(result).toEqual(authorWithMostLikes);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
