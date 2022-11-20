const initialState = {
  user: {},
  users: [],
};
export const addUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_USERS":
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
