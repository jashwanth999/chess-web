export const pieceValidMethodMap = (prevX, prevY, x, y, pieceName, pieces) => {
  let validMove = new ValidMove(prevX, prevY, x, y, pieces);

  // console.log(prevX, x, prevY, y, pieceName, pieces);

  if (pieceName === "p") {
    return validMove.isPawn();
  }

  if (pieceName === "r") {
    return validMove.isRook();
  }

  if (pieceName === "b") {
    return validMove.isBishop();
  }

  if (pieceName === "n") {
    return validMove.isKnight();
  }

  if (pieceName === "q") {
    return validMove.isQueen();
  }

  if (pieceName === "k") {
    console.log(validMove.isKing());
    return validMove.isKing();
  }
};

class ValidMove {
  constructor(prevX, prevY, x, y, pieces) {
    this.prevX = prevX;
    this.prevY = prevY;
    this.x = x;
    this.y = y;
    this.check = false;
    this.pieces = pieces;
  }

  isPawn() {
    if (this.prevX - 1 !== this.x || Math.abs(this.prevY - this.y) > 1)
      return false;

    let prevPos = this.prevX.toString() + ":" + this.prevY.toString();

    let pos = this.x.toString() + ":" + this.y.toString();

    if (
      this.pieces[pos] !== undefined &&
      this.pieces[pos].color !== this.pieces[prevPos].color
    ) {
      return true;
    }

    return this.pieces[pos] === undefined && Math.abs(this.prevY - this.y) === 0
      ? true
      : false;
  }

  isRook() {
    if (
      Math.abs(this.prevX - this.x) > 0 &&
      Math.abs(this.prevY - this.y) > 0
    ) {
      return false;
    }

    let left = false,
      right = false,
      up = false,
      down = false;

    if (this.prevY - this.y > 0) left = true;

    if (this.prevY - this.y < 0) right = true;

    if (this.prevX - this.x > 0) up = true;

    if (this.prevX - this.x < 0) down = true;

    if (up) {
      for (let i = this.prevX - 1; i > this.x; i--) {
        let pos = i.toString() + ":" + this.y.toString();

        if (this.pieces[pos]) return false;
      }
    }

    if (down) {
      for (let i = this.prevX + 1; i < this.x; i++) {
        let pos = i.toString() + ":" + this.y.toString();

        if (this.pieces[pos]) return false;
      }
    }

    if (right) {
      for (let i = this.prevY + 1; i < this.y; i++) {
        let pos = this.x.toString() + ":" + i.toString();
        if (this.pieces[pos]) return false;
      }
    }

    if (left) {
      for (let i = this.prevY - 1; i > this.y; i--) {
        let pos = this.x.toString() + ":" + i.toString();

        if (this.pieces[pos]) return false;
      }
    }

    return true;
  }

  isBishop() {
    if (Math.abs(this.prevX - this.x) !== Math.abs(this.prevY - this.y)) {
      return false;
    }

    let rightUp = false,
      rightDown = false,
      leftUp = false,
      leftDown = false;

    if (this.prevX - this.x > 0 && this.prevY - this.y > 0) leftUp = true;

    if (this.prevX - this.x > 0 && this.prevY - this.y < 0) rightUp = true;

    if (this.prevX - this.x < 0 && this.prevY - this.y > 0) leftDown = true;

    if (this.prevX - this.x < 0 && this.prevY - this.y < 0) rightDown = true;

    if (leftUp) {
      for (
        let i = this.prevX - 1, j = this.prevY - 1;
        i > this.x && j > this.y;
        i--, j--
      ) {
        let pos = i.toString() + ":" + j.toString();

        if (this.pieces[pos]) return false;
      }
    }

    if (rightUp) {
      for (
        let i = this.prevX - 1, j = this.prevY + 1;
        i > this.x && j < this.y;
        i--, j++
      ) {
        let pos = i.toString() + ":" + j.toString();

        if (this.pieces[pos]) return false;
      }
    }

    if (leftDown) {
      for (
        let i = this.prevX + 1, j = this.prevY - 1;
        i < this.x && j > this.y;
        i++, j--
      ) {
        let pos = i.toString() + ":" + j.toString();

        if (this.pieces[pos]) return false;
      }
    }

    if (rightDown) {
      for (
        let i = this.prevX + 1, j = this.prevY + 1;
        i < this.x && j < this.y;
        i++, j++
      ) {
        let pos = i.toString() + ":" + j.toString();

        if (this.pieces[pos]) return false;
      }
    }

    return true;
  }

  isKnight() {
    if (
      (this.prevX + 2 === this.x && this.prevY + 1 === this.y) ||
      (this.prevX - 2 === this.x && this.prevY + 1 === this.y) ||
      (this.prevX + 2 === this.x && this.prevY - 1 === this.y) ||
      (this.prevX - 2 === this.x && this.prevY - 1 === this.y) ||
      (this.prevX + 1 === this.x && this.prevY + 2 === this.y) ||
      (this.prevX - 1 === this.x && this.prevY + 2 === this.y) ||
      (this.prevX + 1 === this.x && this.prevY - 2 === this.y) ||
      (this.prevX - 1 === this.x && this.prevY - 2 === this.y)
    ) {
      return true;
    }

    return false;
  }

  isQueen() {
    return this.isBishop() || this.isRook();
  }

  isKing() {
    if (
      Math.abs(this.prevX - this.x) <= 1 &&
      Math.abs(this.prevY - this.y) <= 1
    )
      return true;

    return false;
  }
}

export const isValidMoveForCheckMate = (
 
  kingPosX,
  kingPosY,
  pieces
) => {
  let grabPos = kingPosX.toString() + ":" + kingPosY.toString();

  console.log("checkmate->" + grabPos);

  // up

  try {
    for (let i = kingPosX - 1; i >= 0; i--) {
      let pos = i.toString() + ":" + kingPosY.toString();

      if (pieces[pos] && pieces[pos].color === pieces[grabPos].color) {
        break;
      }

      if (pieces[pos] && pieces[pos].color !== pieces[grabPos].color) {
        if (pieces[pos].pieceName === "r" || pieces[pos].pieceName === "q") {
          console.log("up");

          return true;
        } else break;
      }
    }

    // down

    for (let i = kingPosX + 1; i < 8; i++) {
      let pos = i.toString() + ":" + kingPosY.toString();

      if (pieces[pos] && pieces[pos].color === pieces[grabPos].color) {
        break;
      }

      if (pieces[pos] && pieces[pos].color !== pieces[grabPos].color) {
        if (pieces[pos].pieceName === "r" || pieces[pos].pieceName === "q") {
          console.log("down");
          return true;
        } else break;
      }
    }

    // left

    for (let i = kingPosX - 1; i >= 0; i++) {
      let pos = kingPosX.toString() + ":" + i.toString();

      if (pieces[pos] && pieces[pos].color === pieces[grabPos].color) {
        break;
      }

      if (pieces[pos] && pieces[pos].color !== pieces[grabPos].color) {
        if (pieces[pos].pieceName === "r" || pieces[pos].pieceName === "q") {
          console.log("left");
          return true;
        } else break;
      }
    }

    // right

    for (let i = kingPosX + 1; i < 8; i++) {
      let pos = kingPosX.toString() + ":" + i.toString();

      if (pieces[pos] && pieces[pos].color === pieces[grabPos].color) {
        break;
      }

      if (pieces[pos] && pieces[pos].color !== pieces[grabPos].color) {
        if (pieces[pos].pieceName === "r" || pieces[pos].pieceName === "q") {
          console.log("right");
          return true;
        } else break;
      }
    }

    // leftup

    for (let i = kingPosX - 1, j = kingPosY - 1; i >= 0 && j >= 0; i--, j--) {
      let pos = i.toString() + ":" + j.toString();

      if (pieces[pos] && pieces[pos].color === pieces[grabPos].color) {
        break;
      }

      if (pieces[pos] && pieces[pos].color !== pieces[grabPos].color) {
        if (pieces[pos].pieceName === "b" || pieces[pos].pieceName === "q") {
          console.log("leftup");
          return true;
        } else break;
      }
    }

    // leftDown

    for (let i = kingPosX + 1, j = kingPosY - 1; i < 8 && j >= 0; i++, j--) {
      let pos = i.toString() + ":" + j.toString();

      if (pieces[pos] && pieces[pos].color === pieces[grabPos].color) {
        break;
      }

      if (pieces[pos] && pieces[pos].color !== pieces[grabPos].color) {
        if (pieces[pos].pieceName === "b" || pieces[pos].pieceName === "q") {
          console.log("leftdown");
          return true;
        } else break;
      }
    }

    // RightUp

    for (let i = kingPosX - 1, j = kingPosY + 1; i >= 0 && j < 8; i--, j++) {
      let pos = i.toString() + ":" + j.toString();

      if (pieces[pos] && pieces[pos].color === pieces[grabPos].color) {
        break;
      }

      if (pieces[pos] && pieces[pos].color !== pieces[grabPos].color) {
        if (pieces[pos].pieceName === "b" || pieces[pos].pieceName === "q") {
          console.log("rightup");
          return true;
        } else break;
      }
    }

    // RightDown

    for (let i = kingPosX + 1, j = kingPosY + 1; i < 8 && j < 8; i++, j++) {
      let pos = i.toString() + ":" + j.toString();

      if (pieces[pos] && pieces[pos].color === pieces[grabPos].color) {
        break;
      }

      if (pieces[pos] && pieces[pos].color !== pieces[grabPos].color) {
        if (pieces[pos].pieceName === "b" || pieces[pos].pieceName === "q") {
          console.log("rightdown");
          return true;
        } else break;
      }
    }
  } catch (e) {
    console.log("Error while validating move for checkmate", e.message);
  }

  return false;
};
