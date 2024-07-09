"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../services/api";
import { IEquipe } from "@/interfaces/IEquipe";

// Função assíncrona para buscar os equipes da API
async function fetchEquipes(): Promise<IEquipe[]> {
    const result = await api.get("http://localhost:3000/api/equipe");
    return result.data;
}

export default function Home() {
    const [equipes, setEquipes] = useState<IEquipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredEquipes, setFilteredEquipes] = useState<IEquipe[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const getEquipes = async () => {
            try {
                const equipesData = await fetchEquipes();
                setEquipes(equipesData);
                setFilteredEquipes(equipesData);
            } catch (error) {
                console.error("Erro ao buscar equipes:", error);
            } finally {
                setLoading(false);
            }
        };
        getEquipes();
    }, []);

    const handleSearch = () => {
        const filtered = equipes.filter((equipe) =>
            equipe.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEquipes(filtered);
    };

    if (loading) {
        return (
            <main className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Carregando...</h1>
            </main>
        );
    }

    return (
        <main className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Equipes</h1>
            <div className="flex mb-8 mt-8 justify-center items-center">
                <input
                    type="text"
                    placeholder="Filtrar por nome"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Filtrar
                </button>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredEquipes.length > 0 ? (
                    filteredEquipes.map((equipe: IEquipe) => (
                        <div key={equipe.id} className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10">
                            <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                                <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                                    {equipe.nome}
                                </h2>
                            </div>
                            <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                                <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    ID: {equipe.id}
                                </span>
                            </div>
                            <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                                <Link href={`/deleteEquipe/${equipe.id}`}>
                                    <button className="bg-red-500 hover:bg-black text-white font-bold py-2 px-4 rounded mr-2">
                                        Excluir
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Nenhum equipe encontrado!</h1>
                )}
            </section>
        </main>
    );
}
