import { changePawnRechedOtherSizeData } from "../helpers/chessBoardHelpers";
import {
  gridConstants,
  opponentPawnReachedOtherSidePieces,
  pawnReachedOtherSidePieces,
} from "../helpers/imageHelpers";

export default function PawnReachedOtherSide(props) {
  return (
    <div
      style={{
        width: 60,
        height: gridConstants.gridSize / 2,
        position: "absolute",
        backgroundColor: "white",
        margin: 10,
        display: props.pawnReachedOtherSideData?.open ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      {!props.pawnReachedOtherSideData?.opponent
        ? pawnReachedOtherSidePieces.map((piece, index) => {
            return (
              <img
                key={index}
                onClick={() => {
                  changePawnRechedOtherSizeData(
                    {
                      ...props.pawnReachedOtherSideData,
                      newPieceData: piece,
                    },
                    props.setPawnReachedOtherSideData
                  );
                }}
                src={piece.image}
                height={50}
                width={50}
                style={{ cursor: "pointer" }}
              />
            );
          })
        : opponentPawnReachedOtherSidePieces.map((piece, index) => {
            return (
              <img
                key={index}
                onClick={() => {
                  changePawnRechedOtherSizeData(
                    {
                      ...props.pawnReachedOtherSideData,
                      newPieceData: piece,
                    },
                    props.setPawnReachedOtherSideData
                  );
                }}
                src={piece.image}
                height={50}
                width={50}
                style={{ cursor: "pointer" }}
              />
            );
          })}
    </div>
  );
}

const rootDiv = {};
