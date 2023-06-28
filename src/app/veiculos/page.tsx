"use client";
import Card from "@/components/vehicles/cardVehicle";
import Modal from "@/components/ui/modal-create";
import { useState, useEffect } from "react";
import FormCreateVehicle from "@/components/vehicles/formCreateVehicle";
import { getVehicles } from "@/repository/deslocamentoApi";

interface Vehicles {
  id: number;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}

export default function Veiculos() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      await getVehicles()
        .then((res) => res.json())
        .then((res) => setVehicles(res));
    };

    fetchVehicles();
  }, []);

  return (
    <div className="mt-14 mx-4 md:mx-auto md:max-w-[80%]">
      <div className="flex justify-between items-center gap-2">
        <h1 className="font-semibold text-3xl md:text-4xl">Veículos</h1>
        <Modal title="Criar Veículo">
          <FormCreateVehicle />
        </Modal>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-between gap-8 my-10">
        {vehicles?.map((vehicle: Vehicles) => (
          <div key={vehicle.id}>
            <Card card={vehicle} />
          </div>
        ))}
      </div>
    </div>
  );
}
