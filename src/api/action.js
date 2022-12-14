export const addUser = (data) => {
  return {
    type: "USER_DETAILS",
    payload: data,
  };
};

export const addUsers = (data) => {
  return {
    type: "ADD_USERS",
    payload: data,
  };
};

export const changePiecePositionAction = (data) => {
  return {
    type: "CHANGE_PIECE_POSITION",
    payload: data,
  };
};

export const changeOpponentPiecePositionAction = (data) => {
  return {
    type: "CHANGE_OPPONENT_PIECE_POSITION",
    payload: data,
  };
};

export const changeKingPosition = (data) => {
  return {
    type: "CHANGE_KING_POSITION",
    payload: data,
  };
};

export const changeOpponentKingPosition = (data) => {
  return {
    type: "CHANGE_OPPONENT_KING_POSITION",
    payload: data,
  };
};

export const resetPiece = (data) => {
  return {
    type: "RESET",
    payload: data,
  };
};

export const resetOpponentPieces = (data) => {
  return {
    type: "RESET_OPPONENT",
    payload: data,
  };
};
