import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { commentBlog, likeBlog, removeBlogByID } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField
} from '@material-ui/core'
import { ChatBubbleOutline as ChatBubbleIcon } from '@material-ui/icons'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, event.target.comment.value))
    event.target.comment.value = ''
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
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={1}
      >
        <Grid item>{blog.url}</Grid>
        <Grid item>
          likes {blog.likes}{' '}
          <Button
            size="small"
            color="primary"
            variant="outlined"
            id="like-button"
            onClick={handleLike}
          >
            like
          </Button>
        </Grid>
        <Grid item>added by {blog.user.name}</Grid>
        {blog.user.name === user.name && (
          <Grid item>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              onClick={removeBlog}
            >
              remove
            </Button>
          </Grid>
        )}
      </Grid>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <TextField
          name="comment"
          label="comment"
          style={{ position: 'relative', float: 'left' }}
        />
        <Button
          variant="contained"
          size="medium"
          color="primary"
          type="submit"
          style={{
            left: '1rem',
            top: '0.6rem',
            position: 'relative',
            float: 'left'
          }}
        >
          add comment
        </Button>
      </form>
      <List style={{ position: 'relative', top: '3rem' }}>
        {blog.comments &&
          blog.comments.map((comment) => (
            <ListItem key={comment}>
              <ListItemIcon>
                <ChatBubbleIcon />
              </ListItemIcon>
              <ListItemText primary={comment} />
            </ListItem>
          ))}
      </List>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired
}

export default Blog
