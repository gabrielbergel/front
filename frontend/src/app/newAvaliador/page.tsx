"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import axios from "axios";
import api from "../../services/api";
import { IAvaliadorFormData } from "@/interfaces/IAvaliador";

export default function NewAvaliador() {
  const router = useRouter();
  const [formDataAvaliador, setFormDataAvaliador] = useState<IAvaliadorFormData>({
    id: 0,
    nome: "",
    login: "",
    senha: ""
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
      setFormDataAvaliador((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
      setFormDataAvaliador((prevFormData) => ({
        ...prevFormData, //mantém todos os outros dados intactos
        [name]: value, //altera o dado que está sendo modificado
        // por exemplo, ficaria assim: [name]: value --> cpf: 12
      }));
    }
  };

  const makePostRequest = async () => {
    try {
      console.log(formDataAvaliador);

      const response = await api.post("http://localhost:3000/api/avaliador", {
        ...formDataAvaliador
      });

      console.log("Dados enviados com sucesso!");
      console.log("Resposta:", response.data);
      router.push("/allAvaliadores");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-8">
      <form className="flex flex-col gap-3 p-12 items-center w-[50%] bg-slate-700 rounded-md border-white border-2 border-spacing-2">

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Login</label>
          <input
            type="text"
            name="login"
            value={formDataAvaliador.login}
            onChange={handleChange}
            placeholder="Login"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={formDataAvaliador.nome}
            onChange={handleChange}
            placeholder="Nome"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-col gap-3 items-center justify-center w-[97%]">
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={formDataAvaliador.senha}
            onChange={handleChange}
            placeholder="Senha"
            className="border border-gray-300 w-[50%] rounded-md px-3 py-2 mb-3 text-black"
          />
        </div>

        <div className="flex flex-row gap-6 items-center justify-center w-[97%]">
          <button
            type="button"
            onClick={makePostRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar Avaliador
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
