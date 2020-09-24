import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);

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

  const handleCreate = async (event) => {
    try {
      event.preventDefault();
      const blog = await blogService.create({ title, author, url });
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
          <h2>create new</h2>
          <form onSubmit={handleCreate}>
            <div>
              title:
              <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit"> create</button>
          </form>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
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
