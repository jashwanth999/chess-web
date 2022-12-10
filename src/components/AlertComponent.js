import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function AlertComponent(props) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleclose}
    >
      <Alert
        onClose={props.handleclose}
        severity="warning"
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}
