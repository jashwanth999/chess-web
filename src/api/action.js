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

export const changePieceConstantPositionAction = (data) => {
  return {
    type: "CHANGE_PIECE_CONSTANTS_POSITION",
    payload: data,
  };
};
export const changeOpponentPiecePositionAction = (data) => {
  return {
    type: "CHANGE_OPPONENT_PIECE_POSITION",
    payload: data,
  };
};

export const changeOpponentPieceConstantPositionAction = (data) => {
  return {
    type: "CHANGE_OPPONENT_PIECE_CONSTANTS_POSITION",
    payload: data,
  };
};
