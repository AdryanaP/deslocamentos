"use client";
import Button from "@mui/material/Button";

export default function deleteConductor(props: { conductorId: number }) {
  const deletar = () => {
    fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${props.conductorId}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          id: props.conductorId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      window.location.reload();
    });
  };
  return (
    <Button
      variant="outlined"
      size="large"
      sx={{
        color: "#6366f1",
        width: "8rem",
        borderColor: "#6366f1",
      }}
      onClick={deletar}
    >
      Deletar
    </Button>
  );
}
