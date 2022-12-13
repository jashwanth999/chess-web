import { initialPieces, initialPiecesOpponent } from "../helpers/imageHelpers";

const initialState = {
  pieces: initialPieces,
  piecesOpponent: initialPiecesOpponent,
};
export const pieceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PIECE_POSITION":
      return {
        ...state,
        pieces: action.payload,
      };

    case "CHANGE_OPPONENT_PIECE_POSITION":
      return {
        ...state,
        piecesOpponent: action.payload,
      };

    case "RESET":
      return {
        ...state,
        pieces: initialPieces,
      };

    case "RESET_OPPONENT":
      return {
        ...state,
        piecesOpponent: initialPiecesOpponent,
      };
    default:
      return state;
  }
};
