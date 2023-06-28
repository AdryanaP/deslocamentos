"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const style = {
  borderRadius: 2,
  boxShadow: 24,
};

interface ModalData {
  title: string;
  children: React.ReactElement;
}

export default function ModalCreate(props: ModalData) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        size="large"
        sx={{
          color: "#6366f1",
          borderColor: "#6366f1",
        }}
      >
        {props.title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            width: isSmallScreen ? "90%" : "650px",
            height: "auto",
            padding: isSmallScreen ? "10px" : "40px",
            paddingTop: isSmallScreen ? "25px" : "50px",
            paddingBottom: isSmallScreen ? "25px" : "50px",
            margin: isSmallScreen ? "0px" : "50px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          sx={style}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <div className="mt-2">{props.children}</div>
        </Box>
      </Modal>
    </div>
  );
}
