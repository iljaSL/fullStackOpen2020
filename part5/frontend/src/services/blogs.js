import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const postBlog = async (newBlog, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	};
	const result = await axios.post(baseUrl, newBlog, config);
	return result.data;
};

export default { getAll, postBlog };
