/* eslint-disable indent */
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const user = action.data
      return user
    }
    case 'LOGOUT': {
      return null
    }
    default: {
      return state
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        data: user
      })
      dispatch(setNotification('logged in succesfully', 'success'))
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 'error'))
    }
  }
}

export const loginWithLocalStorage = (loggedBlogappUser) => {
  const user = JSON.parse(loggedBlogappUser)
  blogService.setToken(user.token)
  return {
    type: 'LOGIN',
    data: user
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'LOGOUT',
    data: {}
  }
}

export default reducer
