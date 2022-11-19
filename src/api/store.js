import { createStore, combineReducers } from "redux";
import { pieceReducer } from "../reducers/PieceReducer";


const combined = combineReducers({
   pieces: pieceReducer
});
export const store = createStore(combined);