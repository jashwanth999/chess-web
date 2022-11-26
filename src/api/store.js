import { createStore, combineReducers } from "redux";
import { pieceReducer } from "../reducers/PieceReducer";
import { addUserReducer } from "../reducers/AddUserReducer";
import { kingPositionReducer } from "../reducers/kingPositionReducer";

const combined = combineReducers({
  users: addUserReducer,
  user: addUserReducer,
  pieces: pieceReducer,
  piecesOpponent: pieceReducer,
  kingPos: kingPositionReducer,
  kingPosOp: kingPositionReducer,
});
export const store = createStore(combined);
