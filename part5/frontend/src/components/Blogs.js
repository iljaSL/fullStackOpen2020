import React, { useState, useEffect, useRef } from 'react';
import Blog from './Blog';
import blogService from '../services/blogs';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = ({ user, setUser, setNotification, setErrorMessage}) => {
    const [blogs, setBlogs] = useState([]);
    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const hideBlogForm = () => {
        blogFormRef.current.toggleVisibility();
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <div>
            <h2>blogs</h2>
            <p>
                {user.name} logged in <button onClick={handleLogout}> logout </button>
            </p>
            <Togglable label='Create new blog' ref={blogFormRef}>
                <BlogForm setBlogs={setBlogs}
                          token={user.token}
                          setNotification={setNotification}
                          setErrorMessage={setErrorMessage}
                          hideBlogForm={hideBlogForm}
                />
            </Togglable>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default Blogs;