import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'

const BlogForm = ({ handleCreate }) => {
  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.Title.value
    const author = event.target.Author.value
    const url = event.target.Url.value

    event.target.Title.value = ''
    event.target.Author.value = ''
    event.target.Url.value = ''
    handleCreate({ title, author, url })
  }

  return (
    <>
      <h2>create new</h2>
      <form id="blog-form" onSubmit={addBlog}>
        <TextField id="title" label="title" name="Title" />
        <div>
          <TextField id="author" label="author" name="Author" />
        </div>
        <div>
          <TextField id="url" label="url" name="Url" />
        </div>
        <Button variant="contained" color="primary" type="submit">
          {' '}
          create
        </Button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired
}

export default BlogForm
