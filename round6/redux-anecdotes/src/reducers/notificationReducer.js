const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_NOTIFICATION": {
      const { notification } = action.data;
      return notification;
    }
    case "CLEAR": {
      return "";
    }
    default: {
      return state;
    }
  }
};

let timeOutID;

export const setNotification = (notification, timeout) => {
  return async (dispatch) => {
    if (timeOutID) {
      clearTimeout(timeOutID)
    }
    dispatch(createNotification(notification));
    timeOutID = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

const createNotification = (notification) => {
  return {
    type: "CREATE_NOTIFICATION",
    data: { notification }
  };
};

const clearNotification = () => {
  return {
    type: "CLEAR",
    data: ""
  };
};

export default reducer;
