"use client";

import { useState, useEffect } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";
import { IAvaliacaoFormData } from "@/interfaces/IAvaliacao";

interface IPostParams extends Params {
  id: number;
}

export default function DeleteAvaliacao() {
  const router = useRouter();
  const params: IPostParams = useParams();
  const { id } = params;
  const [avaliacao, setAvaliacao] = useState<IAvaliacaoFormData | null>(null);

  useEffect(() => {
    const fetchAvaliacao = async () => {
      try {
        console.log(id);
        const response = await api.get(`http://localhost:3000/api/avaliacao/${id}`);
        const avaliacaoData: IAvaliacaoFormData = response.data;

        setAvaliacao(avaliacaoData);
      } catch (error) {
        console.error("Erro ao buscar avaliacao:", error);
      }
    };

    if (id) {
      fetchAvaliacao();
    }
  }, [id]);

  const handleDeleteAvaliacao = async () => {
    try {
      await api.delete(`http://localhost:3000/api/avaliacao/${id}`);
      console.log("Avaliacao excluído com sucesso!");
      router.push("/allAvaliacoes");
    } catch (error) {
      console.error("Erro ao excluir avaliacao:", error);
    }
  };

  if (!avaliacao) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-8">
      <div className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
        <h2 className="text-xl text-white mb-4">Excluir Avaliacao</h2>
        <p className="text-white mb-4">Tem certeza que deseja excluir o avaliacao {avaliacao.id}?</p>

        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={handleDeleteAvaliacao}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Excluir
          </button>

          <button
            type="button"
            onClick={() => router.push("/allAvaliacoes")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
