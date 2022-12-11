import React from "react";

export default function KilledPieceComponent(props) {


  if (props.user?.username === props.users[0]?.username )
    return (
      <div style={{ display: "flex" }}>
        {props.killedPieces.map((piece, index) => {
            
          return (
            <img
              key={index}
              src={piece.image}
              alt=""
              style={{ objectFit: "cover", height: 20, width: 20 }}
            />
          );
        })}
      </div>
    );
  else
    
    return (
      <div style={{ display: "flex" }}>
        {props.opponentKilledPieces.map((piece, index) => {

          return (
            <img
              key={index}
              src={piece.image}
              alt=""
              style={{ objectFit: "cover", height: 20, width: 20 }}
            />
          );
        })}
      </div>
    );
}
