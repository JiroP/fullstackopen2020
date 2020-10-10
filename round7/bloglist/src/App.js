import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

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
          <BlogList user={user} />
        </>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
