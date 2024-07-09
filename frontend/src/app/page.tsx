// pages/dashboard.tsx
"use client";

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
    const [avaliadoresCount, setAvaliadoresCount] = useState<number>(0);
    const [avaliacoesCount, setAvaliacoesCount] = useState<number>(0);
    const [equipesCount, setEquipesCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const avaliadoresResponse = await api.get('http://localhost:3000/api/avaliador');
                const avaliacoesResponse = await api.get('http://localhost:3000/api/avaliacao');
                const equipesResponse = await api.get('http://localhost:3000/api/equipe');

                setAvaliadoresCount(avaliadoresResponse.data.length);
                setAvaliacoesCount(avaliacoesResponse.data.length);
                setEquipesCount(equipesResponse.data.length);
            } catch (error) {
                console.error('Erro ao buscar contagens:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <main className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Carregando...</h1>
            </main>
        );
    }

    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg shadow-md p-6 text-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                    <h2 className="text-2xl font-bold mb-2">{avaliadoresCount}</h2>
                    <p className="text-lg">Avaliadores</p>
                    <Link href={`/allAvaliadores`}>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Ver Avaliadores
                        </button>
                    </Link>
                </div>
                <div className="rounded-lg shadow-md p-6 text-center bg-gradient-to-br from-purple-400 to-purple-600 text-white">
                    <h2 className="text-2xl font-bold mb-2">{avaliacoesCount}</h2>
                    <p className="text-lg">Avaliações</p>
                    <Link href={`/allAvaliacoes`}>
                        <button className="mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                            Ver Avaliações
                        </button>
                    </Link>
                </div>
                <div className="rounded-lg shadow-md p-6 text-center bg-gradient-to-br from-green-400 to-green-600 text-white">
                    <h2 className="text-2xl font-bold mb-2">{equipesCount}</h2>
                    <p className="text-lg">Equipes</p>
                    <Link href={`/allEquipes`}>
                        <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Ver Equipes
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
