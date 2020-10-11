import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))
  return sortedBlogs.map((blog) => (
    <div key={blog.id} style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  ))
}

export default BlogList
