import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BlogList
