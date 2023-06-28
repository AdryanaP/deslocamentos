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

interface Cliente {
  id: number;
  nome: string;
  tipoDocumento: string;
  numeroDocumento: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export default function FormCreateClient(props: { client: Cliente }) {
  const [client, setClient] = React.useState<Cliente>(props.client);
  const [errorMessage, setErrorMessage] = React.useState(String);

  React.useEffect(() => {
    setClient(props.client);
  }, [props.client]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setClient({ ...client, [name]: value });
  };

  const validateForm = () => {
    let hasEmptyField = false;
    Object.entries(client).forEach(([key, value]) => {
      if (!value.length && key != "id") {
        hasEmptyField = true;
        const error = key.replace(/([A-Z]+)/g, " $1").toLowerCase();
        setErrorMessage(`Campo ${error} é obrigatório`);
      }
    });

    if (!hasEmptyField) {
      putClient();
    }
  };

  const putClient = () => {
    fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${client.id}`,
      {
        method: "PUT",
        body: JSON.stringify(client),
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
            name="nome"
            label="Nome"
            variant="outlined"
            color="primary"
            value={client.nome}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="tipoDocumento"
            label="Tipo de Documento"
            variant="outlined"
            color="primary"
            value={client.tipoDocumento}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="numeroDocumento"
            label="Número do Documento"
            variant="outlined"
            color="primary"
            type="text"
            onKeyUp={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={client.numeroDocumento}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          fullWidth
          sx={{ my: 1.5 }}
          className="grid md:grid-cols-4 gap-4"
        >
          <TextField
            required
            id="outlined-basic"
            name="logradouro"
            label="Rua"
            variant="outlined"
            color="primary"
            className="md:col-span-3"
            value={client.logradouro}
            onChange={handleChange}
          />

          <TextField
            required
            id="outlined-basic"
            name="numero"
            label="Número"
            type="text"
            onKeyUp={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            variant="outlined"
            color="primary"
            value={client.numero}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="bairro"
            label="Bairro"
            variant="outlined"
            color="primary"
            value={client.bairro}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="cidade"
            label="Cidade"
            variant="outlined"
            color="primary"
            value={client.cidade}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            required
            id="outlined-basic"
            name="uf"
            label="Estado"
            variant="outlined"
            color="primary"
            value={client.uf}
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
