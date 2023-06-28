"use client";
import FormCreateConductor from "@/components/conductors/formCreateConductor";
import Card from "@/components/conductors/cardConductor";
import Modal from "@/components/ui/modal-create";
import { useState, useEffect } from "react";
import { getConductors } from "@/repository/deslocamentoApi";

interface Conductor {
  id: number;
  nome: string;
  numeroHabilitacao: string;
  catergoriaHabilitacao: string;
  vencimentoHabilitacao: Date;
}

export default function Condutores() {
  const [conductors, setConductors] = useState([]);

  useEffect(() => {
    const fetchConductors = async () => {
      await getConductors()
        .then((res) => res.json())
        .then((res) => setConductors(res));
    };

    fetchConductors();
  }, []);

  return (
    <div className="mt-14 mx-4 md:mx-auto md:max-w-[80%]">
      <div className="flex justify-between items-center gap-2">
        <h1 className="font-semibold text-3xl md:text-4xl">Condutores</h1>
        <Modal title="Criar Condutor">
          <FormCreateConductor />
        </Modal>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-between gap-8 my-10">
        {conductors?.map((conductor: Conductor) => (
          <div key={conductor.id}>
            <Card card={conductor} />
          </div>
        ))}
      </div>
    </div>
  );
}
