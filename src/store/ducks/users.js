/**
 * Types
 */

export const Types = {
  ADD_REQUEST: "users/ADD_REQUEST",
  ADD_SUCCESS: "users/ADD_SUCCESS",
  ADD_FAILURE: "users/ADD_FAILURE",
  REMOVE_USER: "users/REMOVE_USER"
};

/**
 * Reducer
 */

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
  message: ""
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.data.message,
        data: [...state.data, action.payload.data]
      };
    case Types.ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case Types.REMOVE_USER:
      return {
        ...state,
        data: state.data.filter(user => user.id !== action.payload.id),
        message: "Usuário removido com sucesso!"
      };

    default:
      return state;
  }
}

/**
 * Actions
 */

export const Creators = {
  addUserRequest: (repository, latitude, longitude) => ({
    type: Types.ADD_REQUEST,
    payload: { repository, latitude, longitude }
  }),

  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data }
  }),

  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error }
  }),

  removeUser: id => ({
    type: Types.REMOVE_USER,
    payload: { id }
  })
};
