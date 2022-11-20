import {
  pieces,
  piecesConstants,
  piecesOpponent,
  piecesOpponentConstants,
} from "../helpers/imageHelpers";

const initialState = {
  pieces: pieces,
  piecesOpponent: piecesOpponent,
  piecesConstants: piecesConstants,
  piecesOpponentConstants: piecesOpponentConstants
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

    case "CHANGE_PIECE_CONSTANTS_POSITION":
      return {
        ...state,
        piecesConstants: action.payload,
      };

      case "CHANGE_OPPONENT_PIECE_CONSTANTS_POSITION":
        return {
          ...state,
          piecesOpponentConstants: action.payload,
        };
    default:
      return state;
  }
};
