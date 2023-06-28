"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModalDelete from "../ui/modal-delete";
import ModalEdit from "../ui/modal-edit";
import DeleteDisplacement from "../displacements/deleteDisplacement";
import FormEditDisplacement from "../displacements/formEditDisplacement";
import { format } from "date-fns";
import {
  getOneClient,
  getOneConductor,
  getOneVehicle,
} from "@/repository/deslocamentoApi";
import { useState, useEffect } from "react";

interface Card {
  card: {
    id: number;
    kmInicial: number;
    kmFinal: number;
    inicioDeslocamento: Date;
    fimDeslocamento: Date;
    checkList: string;
    motivo: string;
    observacao: string;
    idCondutor: number;
    idVeiculo: number;
    idCliente: number;
  };
}

export default function BasicCard(props: Card) {
  const [client, setClient] = useState(Object);
  const [conductor, setConductor] = useState(Object);
  const [vehicle, setVehicle] = useState(Object);

  useEffect(() => {
    const fetchOneClient = async () => {
      await getOneClient(props.card.idCliente)
        .then((res) => res.json())
        .then((res) => setClient(res));
    };

    const fetchOneConductor = async () => {
      await getOneConductor(props.card.idCondutor)
        .then((res) => res.json())
        .then((res) => setConductor(res));
    };

    const fetchOneVehicle = async () => {
      await getOneVehicle(props.card.idVeiculo)
        .then((res) => res.json())
        .then((res) => setVehicle(res));
    };

    fetchOneClient();
    fetchOneConductor();
    fetchOneVehicle();
  }, [props.card]);

  return (
    <Card
      sx={{ minWidth: 275 }}
      className="h-full flex flex-col justify-between"
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Deslocamento {props.card.id}
        </Typography>

        <Typography sx={{ fontSize: 18 }} className="capitalize">
          {props.card.inicioDeslocamento
            ? `Início: ${format(
                new Date(props.card.inicioDeslocamento),
                "dd/MM/yyyy kk:mm:ss"
              )}`
            : null}
        </Typography>

        <Typography sx={{ mb: 1.5, fontSize: 18 }}>
          Km inicial: {props.card.kmInicial}
        </Typography>

        <Typography sx={{ fontSize: 18 }}>
          Fim: {""}
          {props.card.fimDeslocamento
            ? ` ${format(
                new Date(props.card.fimDeslocamento),
                "dd/MM/yyyy kk:mm:ss"
              )}`
            : " deslocamento em andamento"}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 18 }}>
          Km final: {""}
          {props.card.kmFinal && props.card.kmFinal != 0
            ? props.card.kmFinal
            : " deslocamento em andamento"}
        </Typography>
        <hr />
        <Typography sx={{ my: 1.5, fontSize: 18 }}>
          Cliente: {""}
          {client ? client.nome : "não informado"}
        </Typography>
        <Typography sx={{ my: 1.5, fontSize: 18 }}>
          Condutor: {""}
          {conductor ? conductor.nome : "não informado"}
        </Typography>
        <Typography sx={{ my: 1.5, fontSize: 18 }}>
          Veículo: {""}
          {vehicle ? vehicle.placa : "não informado"}
        </Typography>
        <hr />
        <Typography sx={{ my: 1.5, fontSize: 18 }}>
          {props.card.motivo.length ? `Motivo: ${props.card.motivo}` : null}
        </Typography>
        <Typography sx={{ my: 1.5, fontSize: 18 }}>
          {props.card.checkList.length
            ? `CheckList: ${props.card.checkList}`
            : null}
        </Typography>
        <Typography sx={{ my: 1.5, fontSize: 18 }}>
          {props.card.observacao.length
            ? `Observação: ${props.card.observacao}`
            : null}
        </Typography>
      </CardContent>
      <CardActions className="justify-end">
        <ModalDelete title="deslocamento">
          <DeleteDisplacement displacementId={props.card.id} />
        </ModalDelete>
        {!props.card.fimDeslocamento && (
          <ModalEdit title="Finalizar deslocamento">
            <FormEditDisplacement
              displacementId={props.card.id}
              observation={props.card.observacao}
            />
          </ModalEdit>
        )}
      </CardActions>
    </Card>
  );
}
