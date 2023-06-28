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

interface Conductor {
  id: number;
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: Date;
}

export default function FormCreateConductor(props: { conductor: Conductor }) {
  const [conductor, setConductor] = React.useState<Conductor>(props.conductor);
  const [errorMessage, setErrorMessage] = React.useState(String);
  const [showDate, setShowDate] = React.useState(Boolean);

  React.useEffect(() => {
    setConductor(props.conductor);
  }, [props.conductor]);

  const focusDate = () => {
    setShowDate(!showDate);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setConductor({ ...conductor, [name]: value });
  };

  const validateForm = () => {
    let hasEmptyField = false;
    Object.entries(conductor).forEach(([key, value]) => {
      if (!value.length && key != "id") {
        hasEmptyField = true;
        const error = key.replace(/([A-Z]+)/g, " $1").toLowerCase();
        setErrorMessage(`Campo ${error} é obrigatório`);
      }
    });

    if (!hasEmptyField) {
      postConductor();
    }
  };

  const postConductor = () => {
    fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${conductor.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: conductor.id,
          categoriaHabilitacao:
            props.conductor.catergoriaHabilitacao +
            conductor.catergoriaHabilitacao,
          vencimentoHabilitacao: conductor.vencimentoHabilitacao,
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
    <ThemeProvider theme={theme}>
      <div className="overflow-auto h-full  max-h-[21rem] md:max-h-[22rem] 2xl:max-h-[36rem] md:pr-4 2xl:pr-0">
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="catergoriaHabilitacao"
            label="Categoria de Habilitação"
            variant="outlined"
            color="primary"
            disabled
            value={props.conductor.catergoriaHabilitacao}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="catergoriaHabilitacao"
            label="Adicionar outra categoria de Habilitação"
            variant="outlined"
            color="primary"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="vencimentoHabilitacao"
            label="Vencimento do Habilitação"
            variant="outlined"
            color="primary"
            type={showDate ? "datetime-local" : "text"}
            onFocus={focusDate}
            onBlur={focusDate}
            value={conductor.vencimentoHabilitacao}
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
