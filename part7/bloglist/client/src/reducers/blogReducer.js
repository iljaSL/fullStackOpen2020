import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOG':
			return action.blogs;
		case 'CREATE_BLOG':
			return state.concat(action.blog);
		case 'REMOVE_BLOG':
			return state.filter((blog) => blog.id !== action.id);
		case 'UPDATE_LIKES':
			return state.map((blog) => (blog.id === action.id ? action.blog : blog));
		default:
			return state;
	}
};

const initializeBlog = (blogs) => ({ type: 'INIT_BLOG', blogs });
const createBlog = (blog) => ({ type: 'CREATE_BLOG', blog });
const removeBlog = (id) => ({ type: 'REMOVE_BLOG', id });
const updateLikes = (id, blog) => ({ type: 'UPDATE_LIKES', id, blog });

export const getAllBlogsFromDb = () => {
	return async (dispatch) => {
		try {
			const blogs = await blogService.getAll();
			dispatch(initializeBlog(blogs));
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error'));
		}
	};
};

export const createBlogInDb = (blog, token) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.postBlog(blog, token);
			dispatch(createBlog(newBlog));
			dispatch(
				setNotification(
					`A new blog ${newBlog.title} by ${newBlog.author} added`,
					'info'
				)
			);
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error'));
		}
	};
};

export const removeBlogFromDb = (id, token) => {
	return async (dispatch) => {
		try {
			const status = await blogService.removeBlogPost(id, token);
			status === 204 && dispatch(removeBlog(id));
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error'));
		}
	};
};

export const updateBlogInDb = (blog) => {
	return async (dispatch) => {
		try {
			const updatedBlog = await blogService.updateBlogPost(blog.id, {
				likes: blog.likes + 1,
				title: blog.title,
				author: blog.author,
				url: blog.url,
			});
			dispatch(updateLikes(updatedBlog.id, updatedBlog));
		} catch (error) {
			dispatch(setNotification(error.response.data.error, 'error'));
		}
	};
};

export default blogReducer;
