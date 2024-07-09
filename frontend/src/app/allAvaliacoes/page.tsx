"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../services/api";
import { IAvaliacao } from "@/interfaces/IAvaliacao";

// Função assíncrona para buscar os avaliacoes da API
async function fetchAvaliacoes(): Promise<IAvaliacao[]> {
    const result = await api.get("http://localhost:3000/api/avaliacao");
    return result.data;
}

export default function Home() {
    const [avaliacoes, setAvaliacoes] = useState<IAvaliacao[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredAvaliacoes, setFilteredAvaliacoes] = useState<IAvaliacao[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const getAvaliacoes = async () => {
            try {
                const avaliacoesData = await fetchAvaliacoes();
                setAvaliacoes(avaliacoesData);
                setFilteredAvaliacoes(avaliacoesData);
            } catch (error) {
                console.error("Erro ao buscar avaliacoes:", error);
            } finally {
                setLoading(false);
            }
        };
        getAvaliacoes();
    }, []);

    const handleSearch = () => {
        const searchTermLower = searchTerm.toLowerCase();
        const filtered = avaliacoes.filter((avaliacao) =>
            avaliacao.equipe_id.toString().includes(searchTermLower) ||
            avaliacao.avaliador_id.toString().includes(searchTermLower)
        );
        setFilteredAvaliacoes(filtered);
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
            <h1 className="text-3xl font-bold mb-8 text-center">Avaliacoes</h1>
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
                {filteredAvaliacoes.length > 0 ? (
                    filteredAvaliacoes.map((avaliacao: IAvaliacao) => (
                        <div key={avaliacao.id} className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col mb-10">
                            <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                                <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                                    ID do Avaliador: {avaliacao.avaliador_id}
                                </h2>
                            </div>
                            <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                                <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                                    ID da Equipe: {avaliacao.equipe_id}
                                </h2>
                            </div>
                            <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                                <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                                    Notas: <h2></h2>Criterio 1: {avaliacao.notas.criterio1}
                                    <h2></h2>Criterio 2: {avaliacao.notas.criterio2}
                                    <h2></h2>Criterio 3: {avaliacao.notas.criterio3}
                                </h2>
                            </div>
                            <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                                <span className="inline-block w-[30%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    ID: {avaliacao.id}
                                </span>
                            </div>
                            <div className="px-6 pt-4 pb-4 flex items-center justify-center text-center">
                                <Link href={`/deleteAvaliacoes/${avaliacao.id}`}>
                                    <button className="bg-red-500 hover:bg-black text-white font-bold py-2 px-4 rounded mr-2">
                                        Excluir
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Nenhum avaliacao encontrado!</h1>
                )}
            </section>
        </main>
    );
}
