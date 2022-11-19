import { pieces } from "../helpers/imageHelpers";

const initialState = {
  pieces: pieces,
};
export const pieceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PIECE_POSITION":
      return {
        ...state,
        pieces: action.payload,
      };

    default:
      return state;
  }
};
