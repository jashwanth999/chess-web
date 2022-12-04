import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 220,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: 180,
  borderRadius: 1.5,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "white",
};

export default function CheckMatePopUp(props) {
  //   const [open, setOpen] = React.useState(true);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={true}
        onClose={() => {
          props.setCheckMatePopUpData();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={firstDiv}>
            <Typography
              id="modal-modal-title"
              variant="h7"
              component="h4"
              style={{ color: "white" }}
            >
              {props.checkMatePopupData.winnerName === props.username
                ? "You"
                : "Opponent"}
              !
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h7"
              component="h6"
              style={{ color: "white" }}
            >
              Won by Checkmate
            </Typography>
          </div>
          <br />

          <div style={{ display: "flex" }}>
            <img
              src={require("../assets/bp.png")}
              style={{
                height: 60,
                width: 60,
                objectFit: "contain",
                border:
                  props.checkMatePopupData?.color === "b"
                    ? "3px solid orange"
                    : "",
                margin: 5,
                borderRadius: 5,
              }}
            />

            <img
              src={require("../assets/wp.png")}
              style={{
                height: 60,
                width: 60,
                objectFit: "contain",
                border:
                  props.checkMatePopupData?.color === "w"
                    ? "3px solid orange"
                    : "",
                margin: 5,
                borderRadius: 5,
              }}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const firstDiv = {
  height: 60,
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: "orange",

  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
};
