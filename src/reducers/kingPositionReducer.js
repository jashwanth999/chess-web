const initialState = {
  kingPos: "7:4",
  kingPosOp: "0:3",
};
export const kingPositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_KING_POSITION":
      return {
        ...state,
        kingPos: action.payload,
      };

    case "CHANGE_OPPONENT_KING_POSITION":
      return {
        ...state,
        kingPosOp: action.payload,
      };

    default:
      return state;
  }
};
