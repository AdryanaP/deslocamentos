"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModalDelete from "../ui/modal-delete";
import ModalEdit from "../ui/modal-edit";
import FormEditClient from "./formEditClient";
import DeleteClient from "./deleteClient";

interface Card {
  card: {
    id: number;
    nome: string;
    tipoDocumento: string;
    numeroDocumento: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
}

export default function BasicCard(props: Card) {
  const address = () => {
    let address = props.card.logradouro.length
      ? `${props.card.logradouro}, `
      : "";

    address += props.card.numero.length ? `${props.card.numero}, ` : "";
    address += props.card.bairro.length ? `${props.card.bairro}, ` : "";
    address += props.card.cidade.length ? `${props.card.cidade}, ` : "";
    address += props.card.uf.length ? props.card.uf : "";
    return <>{address}</>;
  };

  return (
    <Card
      sx={{ minWidth: 275 }}
      className="h-full flex flex-col justify-between"
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Cliente {props.card.id}
        </Typography>

        <Typography sx={{ mb: 0.5, fontSize: 18 }} className="capitalize">
          {props.card.nome.length ? props.card.nome : "Nome não informado"}
        </Typography>

        <Typography sx={{ mb: 1.5, fontSize: 18 }}>
          {props.card.tipoDocumento.length
            ? `${props.card.tipoDocumento} : ${props.card.numeroDocumento}`
            : null}
        </Typography>
        <hr />
        <Typography sx={{ mt: 1.5, fontStyle: "italic", fontSize: 18 }}>
          {address()}
        </Typography>
      </CardContent>
      <CardActions className="justify-end">
        <ModalDelete title="cliente">
          <DeleteClient clientId={props.card.id} />
        </ModalDelete>
        <ModalEdit title="Editar Cliente">
          <FormEditClient client={props.card} />
        </ModalEdit>
      </CardActions>
    </Card>
  );
}
