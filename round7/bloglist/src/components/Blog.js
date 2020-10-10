import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShow = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}by ${blog.author}`)) {
      handleDelete()
    }
  }

  return (
    <div id="blog" style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleShow}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button id="like-button" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.name === user.name && (
            <button onClick={removeBlog}>remove</button>
          )}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
