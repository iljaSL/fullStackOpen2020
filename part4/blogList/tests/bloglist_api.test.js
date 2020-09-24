const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('notes are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('there are three blog entries', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body).toHaveLength(3);
});

test('the first blogs title is Cool Post', async () => {
	const response = await api.get('/api/blogs');
	expect(response.body[0].title).toBe('Cool Post');
});

afterAll(() => {
	mongoose.connection.close();
});
