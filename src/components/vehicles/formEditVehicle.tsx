"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ErrorMessage from "@/components/errorMessage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
    },
  },
});

interface Vehicle {
  id: number;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export default function FormEditVehicle(props: { vehicle: Vehicle }) {
  const [vehicle, setVehicle] = React.useState<Vehicle>(props.vehicle);
  const [errorMessage, setErrorMessage] = React.useState(String);

  React.useEffect(() => {
    setVehicle(props.vehicle);
  }, [props.vehicle]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setVehicle({ ...vehicle, [name]: value });
  };

  const validateForm = () => {
    let hasEmptyField = false;
    Object.entries(vehicle).forEach(([key, value]) => {
      if (value.length < 1 && key != "id") {
        switch (key) {
          case "marcaModelo":
            setErrorMessage(`Campo marca e modelo é obrigatório`);
            break;
          case "anoFabricacao":
            setErrorMessage(`Campo ano de fabricação é obrigatório`);
            break;
          case "kmAtual":
            setErrorMessage(`Campo quilometragem é obrigatório`);
            break;
        }
        hasEmptyField = true;
      }
    });

    if (!hasEmptyField) {
      putVehicle();
    }
  };

  const putVehicle = () => {
    fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${vehicle.id}`,
      {
        method: "PUT",
        body: JSON.stringify(vehicle),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      window.location.reload();
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="overflow-auto h-full max-h-[21rem] md:max-h-[22rem] 2xl:max-h-[36rem] md:pr-4 2xl:pr-0">
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="marcaModelo"
            label="Marca e Modelo"
            variant="outlined"
            color="primary"
            value={vehicle.marcaModelo}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="anoFabricacao"
            label="Ano Fabricação"
            type="number"
            variant="outlined"
            color="primary"
            value={vehicle.anoFabricacao}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="kmAtual"
            label="Quilometragem"
            variant="outlined"
            color="primary"
            type="number"
            value={vehicle.kmAtual}
            onChange={handleChange}
          />
        </FormControl>
      </div>
      {errorMessage.length > 1 && (
        <div>
          <ErrorMessage message={errorMessage} />
        </div>
      )}
      <FormControl fullWidth sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            color: "#6366f1",
            borderColor: "#6366f1",
          }}
          onClick={validateForm}
        >
          Enviar
        </Button>
      </FormControl>
    </ThemeProvider>
  );
}
