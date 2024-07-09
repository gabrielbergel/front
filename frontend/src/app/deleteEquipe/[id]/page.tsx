"use client";

import { useState, useEffect } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";
import { IEquipeFormData } from "@/interfaces/IEquipe";

interface IPostParams extends Params {
  id: number;
}

export default function DeleteEquipe() {
  const router = useRouter();
  const params: IPostParams = useParams();
  const { id } = params;
  const [equipe, setEquipe] = useState<IEquipeFormData | null>(null);

  useEffect(() => {
    const fetchEquipe = async () => {
      try {
        console.log(id);
        const response = await api.get(`http://localhost:3000/api/equipe/${id}`);
        const equipeData: IEquipeFormData = response.data;

        setEquipe(equipeData);
      } catch (error) {
        console.error("Erro ao buscar equipe:", error);
      }
    };

    if (id) {
      fetchEquipe();
    }
  }, [id]);

  const handleDeleteEquipe = async () => {
    try {
      await api.delete(`http://localhost:3000/api/equipe/${id}`);
      console.log("Equipe excluído com sucesso!");
      router.push("/allEquipes");
    } catch (error) {
      console.error("Erro ao excluir equipe:", error);
    }
  };

  if (!equipe) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-8">
      <div className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
        <h2 className="text-xl text-white mb-4">Excluir Equipe</h2>
        <p className="text-white mb-4">Tem certeza que deseja excluir a equipe {equipe.nome}?</p>

        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={handleDeleteEquipe}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Excluir
          </button>

          <button
            type="button"
            onClick={() => router.push("/allEquipes")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
