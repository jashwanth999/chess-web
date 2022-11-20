import { createStore, combineReducers } from "redux";
import { pieceReducer } from "../reducers/PieceReducer";
import { addUserReducer } from "../reducers/AddUserReducer";

const combined = combineReducers({
  pieces: pieceReducer,
  users: addUserReducer,
  user: addUserReducer,
  piecesOpponent: pieceReducer,
  piecesConstants:pieceReducer,
  piecesOpponentConstants:pieceReducer
});
export const store = createStore(combined);
