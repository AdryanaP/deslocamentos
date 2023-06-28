"use client";
import FormCreateDisplacement from "@/components/displacements/formCreateDisplacement";
import Card from "@/components/displacements/cardDisplacement";
import Modal from "@/components/ui/modal-create";
import { useState, useEffect } from "react";

interface Displacement {
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
}

export default function Deslocamentos() {
  const [displacements, setDisplacements] = useState([]);

  useEffect(() => {
    fetch("https://api-deslocamento.herokuapp.com/api/v1/Deslocamento", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        setDisplacements(json);
      });
  }, []);

  return (
    <div className="mt-14 mx-4 md:mx-auto md:max-w-[80%]">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <h1 className="font-semibold text-3xl md:text-4xl">Deslocamentos</h1>
        <Modal title="Criar Deslocamento">
          <FormCreateDisplacement />
        </Modal>
      </div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 justify-between gap-8 my-10">
        {displacements?.map((displacement: Displacement) => (
          <div key={displacement.id}>
            <Card card={displacement} />
          </div>
        ))}
      </div>
    </div>
  );
}
