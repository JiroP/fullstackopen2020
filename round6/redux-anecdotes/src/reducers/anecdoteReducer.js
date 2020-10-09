const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE": {
      const { id } = action.data;

      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    }
    case "CREATE_ANECDOTE": {
      const anecdote = action.data;
      console.log(anecdote);
      return [...state, anecdote];
    }
    case "INITIALIZE_ANECDOTES": {
      const anecdotes = action.data;
      return anecdotes;
    }
    default: {
      return state;
    }
  }
};

export const voteForAnecdote = (id) => {
  return {
    type: "VOTE",
    data: {
      id
    }
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: "CREATE_ANECDOTE",
    data: anecdote
  };
};

export const initializeAnecdote = (anecdotes) => {
  return {
    type: "INITIALIZE_ANECDOTES",
    data: anecdotes
  };
};

export default reducer;
