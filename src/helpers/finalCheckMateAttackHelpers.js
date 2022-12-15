import { pieceValidMethodMap } from "./validHelpers";

export const checkMateStopFromOTherPiece = (
  pieces,
  kingPosX,
  kingPosY,
  currentPiecePosX,
  currentPiecePosY
) => {
  let rowOrColumnAttack = false;
  let diagonalAttack = false;

  let knightAttack = false;

  if (
    (kingPosX + 2 === currentPiecePosX && kingPosY + 1 === currentPiecePosY) ||
    (kingPosX - 2 === currentPiecePosX && kingPosY + 1 === currentPiecePosY) ||
    (kingPosX + 2 === currentPiecePosX && kingPosY - 1 === currentPiecePosY) ||
    (kingPosX - 2 === currentPiecePosX && kingPosY - 1 === currentPiecePosY) ||
    (kingPosX + 1 === currentPiecePosX && kingPosY + 2 === currentPiecePosY) ||
    (kingPosX - 1 === currentPiecePosX && kingPosY + 2 === currentPiecePosY) ||
    (kingPosX + 1 === currentPiecePosX && kingPosY - 2 === currentPiecePosY) ||
    (kingPosX - 1 === currentPiecePosX && kingPosY - 2 === currentPiecePosY)
  ) {
    knightAttack = true;
  } else if (
    Math.abs(kingPosX - currentPiecePosX) ===
    Math.abs(kingPosY - currentPiecePosY)
  ) {
    diagonalAttack = true;
  } else rowOrColumnAttack = true;

  if (rowOrColumnAttack) {
    let left = false,
      right = false,
      up = false,
      down = false;

    if (kingPosY - currentPiecePosY > 0) left = true;

    if (kingPosY - currentPiecePosY < 0) right = true;

    if (kingPosX - currentPiecePosX > 0) up = true;

    if (kingPosX - currentPiecePosX < 0) down = true;

    if (up) {
      for (let i = kingPosX - 1; i >= currentPiecePosX; i--) {
        if (
          allPiecesOfKingColorAbleToStopCheckMate(
            pieces,
            i,
            kingPosY,
            kingPosX,
            kingPosY
          )
        ) {
          console.log("up");
          return true;
        }
      }
    }

    if (down) {
      for (let i = kingPosX + 1; i <= currentPiecePosX; i++) {
        if (
          allPiecesOfKingColorAbleToStopCheckMate(
            pieces,
            i,
            kingPosY,
            kingPosX,
            kingPosY
          )
        ) {
          console.log("down");
          return true;
        }
      }
    }

    if (right) {
      for (let i = kingPosY + 1; i <= currentPiecePosY; i++) {
        if (
          allPiecesOfKingColorAbleToStopCheckMate(
            pieces,
            kingPosX,
            i,
            kingPosX,
            kingPosY
          )
        ) {
          console.log("right");
          return true;
        }
      }
    }

    if (left) {
      for (let i = kingPosY - 1; i >= currentPiecePosY; i--) {
        if (
          allPiecesOfKingColorAbleToStopCheckMate(
            pieces,
            kingPosX,
            i,
            kingPosX,
            kingPosY
          )
        ) {
          console.log("left");
          return true;
        }
      }
    }
  }

  if (diagonalAttack) {
    let rightUp = false,
      rightDown = false,
      leftUp = false,
      leftDown = false;

    if (kingPosX - currentPiecePosX > 0 && kingPosY - currentPiecePosY > 0)
      leftUp = true;

    if (kingPosX - currentPiecePosX > 0 && kingPosY - currentPiecePosY < 0)
      rightUp = true;

    if (kingPosX - currentPiecePosX < 0 && kingPosY - currentPiecePosY > 0)
      leftDown = true;

    if (kingPosX - currentPiecePosX < 0 && kingPosY - currentPiecePosY < 0)
      rightDown = true;

    if (leftUp) {
      for (
        let i = kingPosX - 1, j = kingPosY - 1;
        i >= currentPiecePosX && j >= currentPiecePosY;
        i--, j--
      ) {
        if (
          allPiecesOfKingColorAbleToStopCheckMate(
            pieces,
            i,
            j,
            kingPosX,
            kingPosY
          )
        ) {
          console.log("leftup");
          return true;
        }
      }
    }

    if (rightUp) {
      for (
        let i = kingPosX - 1, j = kingPosY + 1;
        i >= currentPiecePosX && j <= currentPiecePosY;
        i--, j++
      ) {
        if (
          allPiecesOfKingColorAbleToStopCheckMate(
            pieces,
            i,
            j,
            kingPosX,
            kingPosY
          )
        ) {
          console.log("rightup");
          return true;
        }
      }
    }

    if (leftDown) {
      for (
        let i = kingPosX + 1, j = kingPosY - 1;
        i <= currentPiecePosX && j >= currentPiecePosY;
        i++, j--
      ) {
        if (
          allPiecesOfKingColorAbleToStopCheckMate(
            pieces,
            i,
            j,
            kingPosX,
            kingPosY
          )
        ) {
          console.log("leftdown");
          return true;
        }
      }
    }

    if (rightDown) {
      for (
        let i = kingPosX + 1, j = kingPosY + 1;
        i <= currentPiecePosX && j <= currentPiecePosY;
        i++, j++
      ) {
        if (
          allPiecesOfKingColorAbleToStopCheckMate(
            pieces,
            i,
            j,
            kingPosX,
            kingPosY
          )
        ) {
          console.log("right down");
          return true;
        }
      }
    }
  }

  if (knightAttack) {
    console.log("knight")
    return allPiecesOfKingColorAbleToStopCheckMate(
      pieces,
      currentPiecePosX,
      currentPiecePosY,
      kingPosX,
      kingPosY
    );
  }
  console.log("all pieces not able to stop king")

  return false;
};

export const allPiecesOfKingColorAbleToStopCheckMate = (
  pieces,
  x,
  y,
  kingPosX,
  kingPosY
) => {
  let kingPos = kingPosX.toString() + ":" + kingPosY.toString();

  let kingPosColor = pieces[kingPos].color;

  

  for (let piecePos in pieces) {
    let piecePosX = piecePos.split(":")[0];
    let piecePosY = piecePos.split(":")[1];

    if (!pieces[piecePos]) continue;

    if (kingPos === piecePos || pieces[piecePos].color !== kingPosColor) {
      continue;
    }

    if (
      pieceValidMethodMap(
        piecePosX,
        piecePosY,
        x,
        y,
        pieces[piecePos].pieceName,
        pieces
      )
    ) {
      return true;
    }
  }

  return false;
};

export const kingAbleToMoveAfterCheckMate = (kingPosX, kingPosY, pieces) => {
  let allDir = [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];

  let kingPos = kingPosX.toString() + ":" + kingPosY.toString();

  let allDirCnt = 0;

  for (let i = 0; i < allDir.length; i++) {
    let kingNextMovePosX = kingPosX + allDir[i][0];
    let kingNextMovePosY = kingPosY + allDir[i][1];

    let kingNextMovePos =
      kingNextMovePosX.toString() + ":" + kingNextMovePosY.toString();

    if (
      pieces[kingNextMovePos] &&
      pieces[kingPos].color === pieces[kingNextMovePos].color
    )
      continue;

    if (!allDirTraverse(kingNextMovePosX, kingNextMovePosY, pieces, kingPos)) {
      continue;
    }

    allDirCnt++;
  }

  console.log("number of dir king able to move", allDirCnt);

  return allDirCnt > 0 ? true : false;
};

const allDirTraverse = (
  kingNextMovePosX,
  kingNextMovePosY,
  pieces,
  kingPos
) => {
  //down

  if (
    kingNextMovePosX < 0 ||
    kingNextMovePosY < 0 ||
    kingNextMovePosX >= 8 ||
    kingNextMovePosY >= 8
  )
    return false;

  for (let i = kingNextMovePosX + 1; i < 8; i++) {
    let pos = i.toString() + ":" + kingNextMovePosY.toString();

    if (pieces[pos] && pieces[kingPos].color !== pieces[pos].color) {
      if (pieces[pos].pieceName === "q" || pieces[pos].pieceName === "r") {
        console.log("down");
        return false;
      }
    }
  }
  //right

  for (let i = kingNextMovePosY + 1; i < 8; i++) {
    let pos = kingNextMovePosX.toString() + ":" + i.toString();

    if (pieces[pos] && pieces[kingPos].color !== pieces[pos].color) {
      if (pieces[pos].pieceName === "q" || pieces[pos].pieceName === "r") {
        console.log("right");
        return false;
      }
    }
  }
  //up

  for (let i = kingNextMovePosX - 1; i >= 0; i--) {
    let pos = i.toString() + ":" + kingNextMovePosY.toString();

    if (pieces[pos] && pieces[kingPos].color !== pieces[pos].color) {
      if (pieces[pos].pieceName === "q" || pieces[pos].pieceName === "r") {
        console.log("up");
        return false;
      }
    }
  }
  //left

  for (let i = kingNextMovePosY - 1; i >= 0; i--) {
    let pos = kingNextMovePosX.toString() + ":" + i.toString();

    if (pieces[pos] && pieces[kingPos].color !== pieces[pos].color) {
      if (pieces[pos].pieceName === "q" || pieces[pos].pieceName === "r") {
        console.log("left");
        return false;
      }
    }
  }

  //leftUp

  for (
    let i = kingNextMovePosX - 1, j = kingNextMovePosY - 1;
    i >= 0 && j >= 0;
    i--, j--
  ) {
    let pos = i.toString() + ":" + j.toString();

    if (pieces[pos] && pieces[kingPos].color !== pieces[pos].color) {
      if (pieces[pos].pieceName === "b" || pieces[pos].pieceName === "r") {
        console.log("leftUp");
        return false;
      }
    }
  }

  //leftDown

  for (
    let i = kingNextMovePosX + 1, j = kingNextMovePosY - 1;
    i < 8 && j >= 0;
    i++, j--
  ) {
    let pos = i.toString() + ":" + j.toString();

    if (pieces[pos] && pieces[kingPos].color !== pieces[pos].color) {
      if (
        pieces[pos].pieceName === "b" ||
        pieces[pos].pieceName === "r" ||
        (pieces[pos].pieceName === "p" &&
          Math.abs(kingNextMovePosX - i) === 1 &&
          Math.abs(j - kingNextMovePosY) === 1)
      ) {
        console.log( "leftDown");
        return false;
      }
    }
  }
  //rightUp
  for (
    let i = kingNextMovePosX - 1, j = kingNextMovePosY + 1;
    i >= 0 && j < 8;
    i--, j++
  ) {
    let pos = i.toString() + ":" + j.toString();

    if (pieces[pos] && pieces[kingPos].color !== pieces[pos].color) {
      if (pieces[pos].pieceName === "b" || pieces[pos].pieceName === "r") {
        console.log("rightUp");
        return false;
      }
    }
  }
  //rightDown
  for (
    let i = kingNextMovePosX + 1, j = kingNextMovePosY + 1;
    i < 8 && j < 8;
    i++, j++
  ) {
    let pos = i.toString() + ":" + j.toString();

    if (pieces[pos] && pieces[kingPos].color !== pieces[pos].color) {
      if (
        pieces[pos].pieceName === "b" ||
        pieces[pos].pieceName === "r" ||
        (pieces[pos].pieceName === "p" &&
          Math.abs(i - kingNextMovePosX) === 1 &&
          Math.abs(j - kingNextMovePosY) === 1)
      ) {
        console.log("rightDown");
        return false;
      }
    }
  }

  return true;
};
