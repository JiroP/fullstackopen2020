import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { login, loginWithLocalStorage, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      dispatch(loginWithLocalStorage(loggedUserJSON))
    }
  }, [dispatch])

  const handleLogin = (event, username, password) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleCreate = (blogObject) => {
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
          <User user={user}/>
        </>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
