const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_USER_REQUEST":
      return { ...state, loading: true };
    case "ADD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, action.payload.data]
      };
    case "ADD_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
