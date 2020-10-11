import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { likeBlog, removeBlogByID } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}by ${blog.author}`)) {
      dispatch(removeBlogByID(blog.id))
      history.push('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}{' '}
        <button id="like-button" onClick={handleLike}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.name === user.name && (
        <button onClick={removeBlog}>remove</button>
      )}
      <h3>comments</h3>
      {blog.comments &&
        blog.comments.map((comment) => (
          <ul key={comment}>
            <li>{comment}</li>
          </ul>
        ))}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired
}

export default Blog
