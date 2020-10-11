import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { login, loginWithLocalStorage, logout } from './reducers/loginReducer'
import { Route, useRouteMatch, Switch } from 'react-router-dom'
import UserList from './components/UserList'
import { initializeUsers } from './reducers/usersReducer'
import { Container } from '@material-ui/core'
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()
  const { loggedUser, users, blogs } = useSelector((state) => ({
    loggedUser: state.user,
    users: state.users,
    blogs: state.blogs
  }))

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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

  const getUserByID = (id) => users.find((u) => u.id === id)
  const getBlogByID = (id) => blogs.find((b) => b.id === id)

  const match = useRouteMatch('/users/:id')
  const user = match ? getUserByID(match.params.id) : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch ? getBlogByID(blogMatch.params.id) : null

  return (
    <Container>
      {loggedUser ? (
        <div>
          <Menu user={loggedUser} handleLogout={handleLogout} />
          <h2>blogs</h2>
          <Notification />
          <Switch>
            <Route path="/users/:id">
              <User user={user} />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/blogs/:id">
              <Blog blog={blog} user={loggedUser} />
            </Route>
            <Route path="/">
              <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                <BlogForm handleCreate={handleCreate} />
              </Togglable>
              <BlogList blogs={blogs} />
            </Route>
          </Switch>
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </Container>
  )
}

export default App
