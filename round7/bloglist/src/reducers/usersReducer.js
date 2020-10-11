/* eslint-disable indent */
import usersService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS': {
      const users = action.data
      return users
    }
    default: {
      return state
    }
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default reducer
