"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModalDelete from "../ui/modal-delete";
import ModalEdit from "../ui/modal-edit";
import DeleteVehicle from "../vehicles/deleteVehicle";
import FormEditVehicle from "../vehicles/formEditVehicle";

interface Card {
  card: {
    id: number;
    placa: string;
    marcaModelo: string;
    anoFabricacao: number;
    kmAtual: number;
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
          Veículo {props.card.id}
        </Typography>

        <Typography sx={{ fontSize: 18 }} className="capitalize">
          {props.card.marcaModelo.length ? props.card.marcaModelo : null}
        </Typography>

        <Typography sx={{ mb: 1.5, fontSize: 18 }}>
          {props.card.anoFabricacao
            ? props.card.anoFabricacao
            : "Ano de fabricação não informado"}
        </Typography>
        <hr />
        <Typography sx={{ mt: 1.5, fontSize: 18 }}>
          {props.card.placa.length ? `Placa: ${props.card.placa}` : null}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 18 }}>
          {props.card.kmAtual ? `Quilometragem: ${props.card.kmAtual}` : null}
        </Typography>
      </CardContent>
      <CardActions className="justify-end">
        <ModalDelete title="veículo">
          <DeleteVehicle vehicleId={props.card.id} />
        </ModalDelete>
        <ModalEdit title="Editar Veículo">
          <FormEditVehicle vehicle={props.card} />
        </ModalEdit>
      </CardActions>
    </Card>
  );
}
