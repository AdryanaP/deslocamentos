"use client";
import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButtons(props: { text: string }) {
  return (
    <Button
      variant="outlined"
      size="large"
      sx={{
        color: "#6366f1",
        borderColor: "#6366f1",
      }}
    >
      {props.text}
    </Button>
  );
}
