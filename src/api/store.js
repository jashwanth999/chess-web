import { createStore, combineReducers } from "redux";
import { pieceReducer } from "../reducers/PieceReducer";
import { addUserReducer } from "../reducers/AddUserReducer";
import { piecesOpponent } from "../helpers/imageHelpers";

const combined = combineReducers({
  pieces: pieceReducer,
  users: addUserReducer,
  user: addUserReducer,
  piecesOpponent: pieceReducer,
});
export const store = createStore(combined);
