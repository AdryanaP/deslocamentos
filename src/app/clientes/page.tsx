"use client";
import FormCreateClient from "@/components/clients/formCreateClient";
import Card from "@/components/clients/cardClient";
import Modal from "@/components/ui/modal-create";
import { getClients } from "@/repository/deslocamentoApi";
import { useState, useEffect } from "react";

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

export default function Clientes() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      await getClients()
        .then((res) => res.json())
        .then((res) => setClients(res));
    };

    fetchClients();
  }, []);

  return (
    <div className="mt-14 mx-4 md:mx-auto md:max-w-[80%]">
      <div className="flex justify-between items-center gap-2">
        <h1 className="font-semibold text-3xl md:text-4xl">Clientes</h1>
        <Modal title="Criar Cliente">
          <FormCreateClient />
        </Modal>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-between gap-8 my-10">
        {clients?.map((client: Cliente) => (
          <div key={client.id}>
            <Card card={client} />
          </div>
        ))}
      </div>
    </div>
  );
}
