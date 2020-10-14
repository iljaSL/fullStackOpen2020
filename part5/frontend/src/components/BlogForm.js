import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ setBlogs, token, setNotification, setErrorMessage, hideBlogForm }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = async event => {
        event.preventDefault();
        try {
            const blog = await blogService.postBlog({ title, author, url }, token);
            setBlogs(blogs => blogs.concat(blog));
            setNotification(`A new blog ${title} by ${author} added`);
            setErrorMessage('ok')
            setTitle('');
            setAuthor('');
            setUrl('');
            hideBlogForm();
        } catch (exception) {
            setNotification(exception.response.data.error);
            console.log(exception)
        }
    };

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={createBlog}>
                    <div>
                       Title:
                        <input
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}/>
                    </div>
                    <div>
                       Author:
                        <input
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                    </div>
                    <div>
                       URL:
                        <input
                        value={url}
                        name="URL"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                    </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm;