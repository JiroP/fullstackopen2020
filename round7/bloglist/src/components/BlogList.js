import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))
  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      // handleUpdate={handleUpdate}
      // handleDelete={() => handleDelete(blog.id)}
      user={user}
    />
  ))
}

export default BlogList
