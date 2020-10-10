import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    default: {
      return state
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer
