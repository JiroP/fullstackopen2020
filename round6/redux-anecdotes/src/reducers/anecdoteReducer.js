import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE": {
      const { updatedAnecdote } = action.data;

      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
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

export const voteForAnecdote = (id, anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id, {
      ...anecdote,
      votes: anecdote.votes + 1
    });
    dispatch({
      type: "VOTE",
      data: { updatedAnecdote }
    });
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.create(anecdote);
    dispatch({
      type: "CREATE_ANECDOTE",
      data: savedAnecdote
    });
  };
};

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INITIALIZE_ANECDOTES",
      data: anecdotes
    });
  };
};

export default reducer;
