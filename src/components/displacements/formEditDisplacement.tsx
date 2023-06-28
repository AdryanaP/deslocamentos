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

interface Displacement {
  id: number;
  kmFinal: number;
  fimDeslocamento: Date;
  observacao: string;
}
export default function FormEditDisplacement(props: {
  observation: string;
  displacementId: number;
}) {
  const [displacement, setDisplacement] = React.useState<Displacement>({
    id: props.displacementId,
    kmFinal: 0,
    fimDeslocamento: new Date(),
    observacao: props.observation,
  });
  const [errorMessage, setErrorMessage] = React.useState(String);
  const [showDate, setShowDate] = React.useState(Boolean);

  const focusDate = () => {
    setShowDate(!showDate);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setDisplacement({ ...displacement, [name]: value });
  };

  const validateForm = () => {
    let hasEmptyField = false;
    Object.entries(displacement).forEach(([key, value]) => {
      if (value == 0 && value == "" && key != "id" && key != "observacao") {
        hasEmptyField = true;
        const error = key.replace(/([A-Z]+)/g, " $1").toLowerCase();
        setErrorMessage(`Campo ${error} é obrigatório`);
      }
    });

    if (!hasEmptyField) {
      postDisplacement();
    }
  };

  const postDisplacement = () => {
    fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${displacement.id}/EncerrarDeslocamento`,
      {
        method: "PUT",
        body: JSON.stringify(displacement),
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
      <div className="overflow-auto h-full  max-h-[21rem] md:max-h-[22rem] 2xl:max-h-[36rem] md:pr-4 2xl:pr-0">
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="fimDeslocamento"
            label="Fim do Deslocamento"
            variant="outlined"
            color="primary"
            type={showDate ? "datetime-local" : "text"}
            onFocus={focusDate}
            onBlur={focusDate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="kmFinal"
            label="Km final"
            variant="outlined"
            type="number"
            color="primary"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            id="outlined-basic"
            name="observacao"
            label="Observação"
            variant="outlined"
            color="primary"
            value={displacement.observacao}
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
