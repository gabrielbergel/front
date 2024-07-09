"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import axios from "axios";
import api from "../../services/api";
import { IEquipeFormData } from "@/interfaces/IEquipe";

export default function NewEquipe() {
  const router = useRouter();
  const [formDataEquipe, setFormDataEquipe] = useState<IEquipeFormData>({
    id: 0,
    nome: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(e.target.type);

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormDataEquipe((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
      setFormDataEquipe((prevFormData) => ({
        ...prevFormData, //mantém todos os outros dados intactos
        [name]: value, //altera o dado que está sendo modificado
        // por exemplo, ficaria assim: [name]: value --> cpf: 12
      }));
    }
  };

  const makePostRequest = async () => {
    try {
      console.log(formDataEquipe);

      const response = await api.post("http://localhost:3000/api/equipe", {
        ...formDataEquipe
      });

      console.log("Dados enviados com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/allEquipes");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-8">
      <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={formDataEquipe.nome}
            onChange={handleChange}
            placeholder="Nome da Equipe"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={makePostRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar Equipe
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
