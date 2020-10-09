const reducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_FILTER": {
      const { filterValue } = action.data;
      return filterValue;
    }
    default: {
      return state;
    }
  }
};

export const updateFilter = (filterValue) => {
  return {
    type: "UPDATE_FILTER",
    data: { filterValue }
  };
};

export default reducer;
