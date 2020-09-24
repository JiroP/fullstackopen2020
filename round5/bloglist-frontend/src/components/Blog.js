import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdate, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false)

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
    handleUpdate(blog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}by ${blog.author}`)) {
      handleDelete()
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleShow}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
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
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
