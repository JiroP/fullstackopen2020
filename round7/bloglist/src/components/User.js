import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => {
  const blogs = useSelector((state) =>
    state.blogs.filter((blog) => blog.user.name === user.name)
  )

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
