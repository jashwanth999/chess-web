export const callingOpponentForCheckMate = (
  kingPosX,
  kingPosY,
  x,
  y,
  pieceName,
  pieces
) => {
  let checkMateAttack = new CheckMateAttack(kingPosX, kingPosY, x, y, pieces);

  console.log(kingPosX, kingPosY, x, y, pieceName);

  if (pieceName === "p") {
    return checkMateAttack.isPawn();
  }

  if (pieceName === "r") {
    return checkMateAttack.isRook();
  }

  if (pieceName === "b") {
    return checkMateAttack.isBishop();
  }

  if (pieceName === "n") {
    return checkMateAttack.isKnight();
  }

  if (pieceName === "q") {
    return checkMateAttack.isQueen();
  }

  if (pieceName === "k") {
    return checkMateAttack.isKing();
  }
};

class CheckMateAttack {
  constructor(kingPosX, kingPosY, x, y, pieces) {
    this.x = x;
    this.y = y;
    this.pieces = pieces;

    this.kingPosX = kingPosX;
    this.kingPosY = kingPosY;
  }

  isPawn() {
    if (this.kingPosX - 1 !== this.x || Math.abs(this.kingPosY - this.y) > 1)
      return false;

    let kingPos = this.kingPosX.toString() + ":" + this.kingPosY.toString();

    let pos = this.x.toString() + ":" + this.y.toString();

    if (
      this.pieces[pos] !== undefined &&
      this.pieces[pos].color !== this.pieces[kingPos].color
    ) {
      return true;
    }

    return this.pieces[pos] === undefined &&
      Math.abs(this.kingPosY - this.y) === 0
      ? true
      : false;
  }

  isRook() {
    if (Math.abs(this.kingPosX - this.x) && Math.abs(this.kingPosY - this.y))
      return false;

    let currentPiecePos = this.x.toString() + ":" + this.y.toString();

    let currentPieceColor = this.pieces[currentPiecePos].color;

    //right
    for (let i = this.y + 1; i <= this.kingPosY; i++) {
      let pos = this.x.toString() + ":" + i.toString();

      if (this.pieces[pos] && this.pieces[pos].color === currentPieceColor)
        break;

      if (this.pieces[pos] && this.pieces[pos].color !== currentPieceColor) {
        if (this.x === this.kingPosX && i === this.kingPosY) {
          console.log("right");
          return true;
        } else break;
      }
    }

    //left
    for (let i = this.y - 1; i >= this.kingPosY; i--) {
      let pos = this.x.toString() + ":" + i.toString();

      if (this.pieces[pos] && this.pieces[pos].color === currentPieceColor)
        break;

      if (this.pieces[pos] && this.pieces[pos].color !== currentPieceColor) {
        if (this.x === this.kingPosX && i === this.kingPosY) {
          console.log("left");
          return true;
        } else break;
      }
    }

    //up
    for (let i = this.x - 1; i >= this.kingPosX; i--) {
      let pos = i.toString() + ":" + this.y.toString();

      if (this.pieces[pos] && this.pieces[pos].color === currentPieceColor)
        break;

      if (this.pieces[pos] && this.pieces[pos].color !== currentPieceColor) {
        if (i === this.kingPosX && this.y === this.kingPosY) {
          console.log("up");
          return true;
        } else break;
      }
    }

    //down
    for (let i = this.x + 1; i <= this.kingPosX; i++) {
      let pos = i.toString() + ":" + this.y.toString();

      if (this.pieces[pos] && this.pieces[pos].color === currentPieceColor)
        break;

      if (this.pieces[pos] && this.pieces[pos].color !== currentPieceColor) {
        if (i === this.kingPosX && this.y === this.kingPosY) {
          console.log("down");
          return true;
        } else break;
      }
    }
    return false;
  }

  isBishop() {
    if (Math.abs(this.kingPosX - this.x) !== Math.abs(this.kingPosY - this.y)) {
      return false;
    }

    let currentPiecePos = this.x.toString() + ":" + this.y.toString();

    let currentPieceColor = this.pieces[currentPiecePos].color;

    //leftUp

    for (
      let i = this.x - 1, j = this.y - 1;
      i >= this.kingPosX && j >= this.kingPosY;
      i--, j--
    ) {
      let pos = i.toString() + ":" + j.toString();

      if (this.pieces[pos] && this.pieces[pos].color === currentPieceColor) {
        break;
      }

      

      if (this.pieces[pos] && this.pieces[pos].color !== currentPieceColor) {
        if (i === this.kingPosX && j === this.kingPosY) {
          console.log("leftup");
          return true;
        } else break;
      }
    }

    //leftDown

    for (
      let i = this.x + 1, j = this.y - 1;
      i <= this.kingPosX && j >= this.kingPosY;
      i++, j--
    ) {
      let pos = i.toString() + ":" + j.toString();

      if (this.pieces[pos] && this.pieces[pos].color === currentPieceColor)
        break;

      if (this.pieces[pos] && this.pieces[pos].color !== currentPieceColor) {
        if (i === this.kingPosX && j === this.kingPosY) {
          console.log("leftdown");
          return true;
        } else break;
      }
    }

    //rightUp

    for (
      let i = this.x - 1, j = this.y + 1;
      i >= this.kingPosX && j <= this.kingPosY;
      i--, j++
    ) {
      let pos = i.toString() + ":" + j.toString();

      if (this.pieces[pos] && this.pieces[pos].color === currentPieceColor)
        break;

      if (this.pieces[pos] && this.pieces[pos].color !== currentPieceColor) {
        if (i === this.kingPosX && j === this.kingPosY) {
          console.log("rightup");
          return true;
        } else break;
      }
    }

    //rightDown

    for (
      let i = this.x + 1, j = this.y + 1;
      i <= this.kingPosX && j <= this.kingPosY;
      i++, j++
    ) {
      let pos = i.toString() + ":" + j.toString();

      if (this.pieces[pos] && this.pieces[pos].color === currentPieceColor)
        break;

      if (
        this.pieces[pos] &&
        this.pieces[pos].color !== currentPieceColor &&
        i === this.kingPosX &&
        j === this.kingPosY
      ) {
        if (i === this.kingPosX && j === this.kingPosY) {
          console.log("rightdown");
          return true;
        } else break;
      }
    }
    return false;
  }

  isKnight() {
    if (
      (this.kingPosX + 2 === this.x && this.kingPosY + 1 === this.y) ||
      (this.kingPosX - 2 === this.x && this.kingPosY + 1 === this.y) ||
      (this.kingPosX + 2 === this.x && this.kingPosY - 1 === this.y) ||
      (this.kingPosX - 2 === this.x && this.kingPosY - 1 === this.y) ||
      (this.kingPosX + 1 === this.x && this.kingPosY + 2 === this.y) ||
      (this.kingPosX - 1 === this.x && this.kingPosY + 2 === this.y) ||
      (this.kingPosX + 1 === this.x && this.kingPosY - 2 === this.y) ||
      (this.kingPosX - 1 === this.x && this.kingPosY - 2 === this.y)
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
      Math.abs(this.kingPosX - this.x) <= 1 &&
      Math.abs(this.kingPosY - this.y) <= 1
    )
      return true;

    return false;
  }
}
