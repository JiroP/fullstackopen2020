import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlogByID } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = ({ user, handleUpdate }) => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(removeBlogByID(id))
  }

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))
  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      handleUpdate={handleUpdate}
      handleDelete={(() => handleDelete(blog.id))}
      user={user}
    />
  ))
}

export default BlogList
