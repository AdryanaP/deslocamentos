"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ErrorMessage from "@/components/errorMessage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  getClients,
  getConductors,
  getVehicles,
} from "@/repository/deslocamentoApi";
import { useEffect, useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
    },
  },
});

interface Displacement {
  idVeiculo: string;
  idCondutor: string;
  idCliente: string;
  observacao: string;
  checkList: string;
  motivo: string;
  kmInicial: number;
  inicioDeslocamento: Date;
}

export default function FormCreateDisplacement() {
  const [displacement, setDisplacement] = useState<Displacement>({
    idCondutor: "",
    idVeiculo: "",
    idCliente: "",
    observacao: "",
    checkList: "",
    motivo: "",
    kmInicial: 0,
    inicioDeslocamento: new Date(),
  });
  const [showDate, setShowDate] = useState(Boolean);
  const [errorMessage, setErrorMessage] = useState(String);
  const [clients, setClients] = useState([]);
  const [conductors, setConductors] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      await getClients()
        .then((res) => res.json())
        .then((res) => setClients(res));
    };

    const fetchConductors = async () => {
      await getConductors()
        .then((res) => res.json())
        .then((res) => setConductors(res));
    };

    const fetchVehicles = async () => {
      await getVehicles()
        .then((res) => res.json())
        .then((res) => setVehicles(res));
    };

    fetchVehicles();
    fetchConductors();
    fetchClients();
  }, []);

  const focusDate = () => {
    setShowDate(!showDate);
  };

  const handleSelects = (event: SelectChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setDisplacement((values) => ({ ...values, [name]: value }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    setDisplacement((values) => ({ ...values, [name]: value }));
  };

  const validateForm = () => {
    let hasEmptyField = false;
    Object.entries(displacement).forEach(([key, value]) => {
      if (
        value == 0 &&
        value == "" &&
        key != "motivo" &&
        key != "checkList" &&
        key != "observacao"
      ) {
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
      `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento`,
      {
        method: "POST",
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
            name="inicioDeslocamento"
            label="Início do Deslocamento"
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
            name="kmInicial"
            label="Km inicial"
            variant="outlined"
            type="number"
            color="primary"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            id="outlined-basic"
            name="motivo"
            label="Motivo"
            variant="outlined"
            color="primary"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <TextField
            id="outlined-basic"
            name="checkList"
            label="CheckList"
            variant="outlined"
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
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Cliente"
            name="idCliente"
            value={displacement.idCliente}
            onChange={handleSelects}
          >
            {clients?.map((client: { id: number; nome: string }) => (
              <MenuItem key={client.id} value={client.id}>
                {client.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <InputLabel id="demo-simple-select-label">Veículo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Veículo"
            name="idVeiculo"
            value={displacement.idVeiculo}
            onChange={handleSelects}
          >
            {vehicles?.map((vehicle: { id: number; placa: string }) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.placa}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ my: 1.5 }}>
          <InputLabel id="demo-simple-select-label">Condutor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Condutor"
            name="idCondutor"
            value={displacement.idCondutor}
            onChange={handleSelects}
          >
            {conductors?.map((conductor: { id: number; nome: string }) => (
              <MenuItem key={conductor.id} value={conductor.id}>
                {conductor.nome}
              </MenuItem>
            ))}
          </Select>
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
