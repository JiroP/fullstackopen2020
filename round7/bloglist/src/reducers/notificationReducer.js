/* eslint-disable indent */
const initialState = { message: '', severity: 'success' }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': {
      const { message, severity } = action.data
      return { message, severity }
    }
    case 'CLEAR_NOTIFICATION': {
      return initialState
    }
    default: {
      return state
    }
  }
}

let timeOutID

export const setNotification = (message, severity) => {
  return async (dispatch) => {
    if (timeOutID) {
      clearTimeout(timeOutID)
    }
    dispatch(createNotification(message, severity))
    timeOutID = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

const createNotification = (message, severity) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      message,
      severity
    }
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: {}
  }
}

export default reducer
