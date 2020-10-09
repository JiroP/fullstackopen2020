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

export const createNotification = (notification) => {
  return {
    type: "CREATE_NOTIFICATION",
    data: { notification }
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR",
    data: ""
  }
}

export default reducer;
