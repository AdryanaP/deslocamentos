"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModalDelete from "../ui/modal-delete";
import ModalEdit from "../ui/modal-edit";
import DeleteConductor from "./deleteConductor";
import FormEditConductor from "./formEditConductor";
import { format } from "date-fns";

interface Card {
  card: {
    id: number;
    nome: string;
    numeroHabilitacao: string;
    catergoriaHabilitacao: string;
    vencimentoHabilitacao: Date;
  };
}

export default function BasicCard(props: Card) {
  return (
    <Card
      sx={{ minWidth: 275 }}
      className="h-full flex flex-col justify-between"
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Condutor {props.card.id}
        </Typography>

        <Typography sx={{ mb: 1.5, fontSize: 18 }} className="capitalize">
          {props.card.nome.length ? props.card.nome : "Nome não informado"}
        </Typography>
        <hr />

        <Typography sx={{ mt: 1.5, fontSize: 18 }}>
          {props.card.numeroHabilitacao.length
            ? `CNH: ${props.card.numeroHabilitacao}`
            : null}
        </Typography>
        <Typography sx={{ fontSize: 18 }}>
          {props.card.catergoriaHabilitacao.length
            ? `Categoria: ${props.card.catergoriaHabilitacao}`
            : null}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 18 }}>
          {props.card.vencimentoHabilitacao
            ? `Vencimento: ${format(
                new Date(props.card.vencimentoHabilitacao),
                "dd/MM/yyyy kk:mm:ss"
              )}`
            : null}
        </Typography>
      </CardContent>
      <CardActions className="justify-end">
        <ModalDelete title="condutor">
          <DeleteConductor conductorId={props.card.id} />
        </ModalDelete>
        <ModalEdit title="Editar Condutor">
          <FormEditConductor conductor={props.card} />
        </ModalEdit>
      </CardActions>
    </Card>
  );
}
