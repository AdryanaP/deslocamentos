"use client";
import Button from "@mui/material/Button";

export default function deleteDisplacement(props: { displacementId: number }) {
  const deletar = () => {
    fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${props.displacementId}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          id: props.displacementId,
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
