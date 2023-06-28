"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "@mui/material/Button";
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

export default function ModalDelete(props: ModalData) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <IconButton
        onClick={handleOpen}
        sx={{
          color: "#6366f1",
        }}
        aria-label="apagar"
      >
        <DeleteOutlineIcon />
      </IconButton>
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
            width: isSmallScreen ? "90%" : "450px",
            height: "auto",
            padding: isSmallScreen ? "20px" : "50px",
            paddingTop: isSmallScreen ? "25px" : "40px",
            paddingBottom: isSmallScreen ? "25px" : "30px",
            margin: isSmallScreen ? "0px" : "50px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          sx={style}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tem certeza que deseja deletar esse {props.title}?
          </Typography>
          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "#6366f1",
                width: "8rem",
                borderColor: "#6366f1",
              }}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            {props.children}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
