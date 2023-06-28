"use client";
import Button from "@mui/material/Button";

export default function deleteVehicle(props: { vehicleId: number }) {
  const deletar = () => {
    fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${props.vehicleId}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          id: props.vehicleId,
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
