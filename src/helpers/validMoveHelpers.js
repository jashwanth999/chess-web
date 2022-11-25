export const pieceValidMethodMap = (prevX, prevY, x, y, pieceName) => {
  let validMove = new ValidMove(prevX, prevY, x, y);

  console.log(prevX, x, prevY, y, pieceName);

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
    return validMove.isKing();
  }
};

class ValidMove {
  constructor(prevX, prevY, x, y) {
    this.prevX = prevX;
    this.prevY = prevY;
    this.x = x;
    this.y = y;
    this.check = false;
  }

  isPawn() {
    if (this.prevX - 1 != this.x || Math.abs(this.prevY - this.y) > 0)
      return false;

    return true;
  }

  isRook() {


    



    if (
      Math.abs(this.prevX - this.x) > 0 &&
      Math.abs(this.prevY - this.y) > 0
    ) {
      return false;
    }

    return true;
  }

  isBishop() {
    if (Math.abs(this.prevX - this.x) !== Math.abs(this.prevY - this.y)) {
      return false;
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
    return true;
  }

  isKing() {
    if (
      Math.abs(this.prevX - this.x) === 1 ||
      Math.abs(this.prevY - this.y) === 1
    )
      return true;

    return false;
  }
}


// validAttack
