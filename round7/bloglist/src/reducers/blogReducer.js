/* eslint-disable indent */
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'CREATE_BLOG': {
      const blog = action.data
      return [...state, blog]
    }
    case 'DELETE_BLOG': {
      const { id } = action.data
      return state.filter((blog) => blog.id !== id)
    }
    case 'UPDATE_BLOG': {
      const { id, updatedBlog } = action.data
      return state.map((blog) => (blog.id === id ? updatedBlog : blog))
    }
    default: {
      return state
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 'error'))
    }
  }
}

export const removeBlogByID = (id) => {
  return async (dispatch) => {
    try {
      await blogService.destroy(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: { id }
      })
      dispatch(setNotification('deleted blog', 'success'))
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 'error'))
    }
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.create({ ...blog, likes: 0 })
      dispatch({
        type: 'CREATE_BLOG',
        data: savedBlog
      })
      dispatch(
        setNotification(
          `a new blog ${blog.title} by ${blog.author} added`,
          'success'
        )
      )
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 'error'))
    }
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.comment(id, comment)
      dispatch({
        type: 'UPDATE_BLOG',
        data: { id, updatedBlog }
      })
      dispatch(setNotification(`Commented: ${comment}`, 'success'))
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 'error'))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { user, ...blogWithoutUser } = blog
      const updatedBlog = await blogService.update(blog.id, {
        ...blogWithoutUser,
        likes: blog.likes + 1
      })
      dispatch({
        type: 'UPDATE_BLOG',
        data: {
          id: blog.id,
          updatedBlog
        }
      })
      dispatch(setNotification(`Liked ${blog.title} by ${blog.author}`, 'success'))
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 'error'))
    }
  }
}

export default reducer
