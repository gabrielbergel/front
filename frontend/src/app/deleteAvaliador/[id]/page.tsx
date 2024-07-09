"use client";

import { useState, useEffect } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";
import { IAvaliadorFormData } from "@/interfaces/IAvaliador";

interface IPostParams extends Params {
  id: number;
}

export default function DeleteAvaliador() {
  const router = useRouter();
  const params: IPostParams = useParams();
  const { id } = params;
  const [avaliador, setAvaliador] = useState<IAvaliadorFormData | null>(null);

  useEffect(() => {
    const fetchAvaliador = async () => {
      try {
        console.log(id);
        const response = await api.get(`http://localhost:3000/api/avaliador/${id}`);
        const avaliadorData: IAvaliadorFormData = response.data;

        setAvaliador(avaliadorData);
      } catch (error) {
        console.error("Erro ao buscar avaliador:", error);
      }
    };

    if (id) {
      fetchAvaliador();
    }
  }, [id]);

  const handleDeleteAvaliador = async () => {
    try {
      await api.delete(`http://localhost:3000/api/avaliador/${id}`);
      console.log("Avaliador excluído com sucesso!");
      router.push("/allAvaliadores");
    } catch (error) {
      console.error("Erro ao excluir avaliador:", error);
    }
  };

  if (!avaliador) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-8">
      <div className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
        <h2 className="text-xl text-white mb-4">Excluir Avaliador</h2>
        <p className="text-white mb-4">Tem certeza que deseja excluir o avaliador {avaliador.login}?</p>

        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={handleDeleteAvaliador}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Excluir
          </button>

          <button
            type="button"
            onClick={() => router.push("/allAvaliadores")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
