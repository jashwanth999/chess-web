import { pieces, piecesOpponent } from "../helpers/imageHelpers";

const initialState = {
  pieces: pieces,

  piecesOpponent: piecesOpponent,
};
export const pieceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PIECE_POSITION":
      return {
        ...state,
        pieces: action.payload,
        piecesOpponent: action.payload,
      };

      case "CHANGE_OPPONENT_PIECE_POSITION":
        return {
          ...state,
          pieces: action.payload,
          piecesOpponent: action.payload,
        };
    default:
      return state;
  }
};
