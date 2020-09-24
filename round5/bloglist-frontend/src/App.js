import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notificationCleanUpWithTimeOut = () => {
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const user = await loginService.login({ username, password });
      console.log("loggin in with", username, password);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotification({ message: `logged in successfully`, color: "green" });
      notificationCleanUpWithTimeOut();
    } catch (error) {
      setNotification({ message: error.response.data.error, color: "red" });
      notificationCleanUpWithTimeOut();
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create(blogObject);
      setNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        color: "green"
      });
      notificationCleanUpWithTimeOut();
      setBlogs(blogs.concat(blog));
    } catch (error) {
      setNotification({ message: error.response.data.error, color: "red" });
      notificationCleanUpWithTimeOut();
      console.log(error);
    }
  };

  const handleUpdate = async (blogObject) => {
    try {
      const updatedObject = {
        ...blogObject,
        user: blogObject.user.id,
        likes: blogObject.likes + 1
      };
      await blogService.update(blogObject.id, updatedObject);
      setBlogs(
        blogs.map((blog) =>
          blog.id === blogObject.id
            ? { ...blogObject, likes: blogObject.likes + 1 }
            : blog
        )
      );
    } catch (error) {
      setNotification({ message: error.response.data.error, color: "red" });
      notificationCleanUpWithTimeOut();
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.destroy(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setNotification({ message: "blog deleted", color: "green" });
      notificationCleanUpWithTimeOut();
    } catch (error) {
      setNotification({ message: error.response.data.error, color: "red" });
      notificationCleanUpWithTimeOut();
      console.log(error);
    }
  };

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));

  return (
    <div>
      {user ? (
        <>
          <h2>blogs</h2>
          {notification && (
            <Notification
              message={notification.message}
              color={notification.color}
            />
          )}
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
            <BlogForm handleCreate={handleCreate} />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleUpdate={handleUpdate}
              handleDelete={() => handleDelete(blog.id)}
              user={user}
            />
          ))}
        </>
      ) : (
        <>
          <h2>login</h2>
          {notification && (
            <Notification
              message={notification.message}
              color={notification.color}
            />
          )}
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default App;
