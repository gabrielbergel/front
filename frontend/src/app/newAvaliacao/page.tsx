"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import { IAvaliacaoFormData } from "@/interfaces/IAvaliacao";

export default function NewAvaliacao() {
  const router = useRouter();
  const [formDataAvaliacao, setFormDataAvaliacao] = useState<IAvaliacaoFormData>({
    id: 0,
    avaliador_id: "",
    equipe_id: "",
    notas: {
      criterio1: "",
      criterio2: "",
      criterio3: "",
    }
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (name.startsWith("criterio")) {
      setFormDataAvaliacao((prevFormData) => ({
        ...prevFormData,
        notas: {
          ...prevFormData.notas,
          [name]: value,
        },
      }));
    } else {
      setFormDataAvaliacao((prevFormData) => ({
        ...prevFormData, // mantém todos os outros dados intactos
        [name]: value, // altera o dado que está sendo modificado
      }));
    }
  };

  const makePostRequest = async () => {
    try {
      const response = await api.post("http://localhost:3000/api/avaliacao", {
        ...formDataAvaliacao
      });

      console.log("Dados enviados com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/allAvaliacoes");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-8">
      <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">
        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Avaliador</label>
          <input
            type="number"
            name="avaliador_id"
            value={formDataAvaliacao.avaliador_id}
            onChange={handleChange}
            placeholder="ID do Avaliador"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Equipe</label>
          <input
            type="number"
            name="equipe_id"
            value={formDataAvaliacao.equipe_id}
            onChange={handleChange}
            placeholder="ID da Equipe"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>
        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Critério 1</label>
          <select
            type="number"
            name="criterio1"
            value={formDataAvaliacao.notas.criterio1}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          >
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={String(index + 1)}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Critério 2</label>
          <select
            type="number"
            name="criterio2"
            value={formDataAvaliacao.notas.criterio2}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          >
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={String(index + 1)}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Critério 3</label>
          <select
            type="number"
            name="criterio3"
            value={formDataAvaliacao.notas.criterio3}
            onChange={handleChange}
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          >
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={String(index + 1)}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={makePostRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar Avaliacao
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
