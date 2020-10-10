import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event, username, password) => {
    try {
      event.preventDefault()
      const user = await loginService.login({ username, password })
      console.log('loggin in with', username, password)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification('logged in succesfully', 'success'))
    } catch (error) {
      console.log(error.response.data.error)
      dispatch(setNotification(error.response.data.error, 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      console.log(blog)
      dispatch(
        setNotification(`a new blog ${blog.title} by ${blog.author} added`, 'success')
      )
      setBlogs(blogs.concat(blog))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error'))
      console.log(error)
    }
  }

  const handleUpdate = async (blogObject) => {
    try {
      const updatedObject = {
        ...blogObject,
        user: blogObject.user.id,
        likes: blogObject.likes + 1
      }
      await blogService.update(blogObject.id, updatedObject)
      setBlogs(
        blogs.map((blog) =>
          blog.id === blogObject.id
            ? { ...blogObject, likes: blogObject.likes + 1 }
            : blog
        )
      )
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error'))
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.destroy(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      dispatch(setNotification('blog deleted', 'success'))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error'))
      console.log(error)
    }
  }

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))

  return (
    <div>
      {user ? (
        <>
          <h2>blogs</h2>

          <Notification />

          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
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
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
