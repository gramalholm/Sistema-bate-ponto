import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "../Exceptions/NotFoundException";
import { Exception } from "../Exceptions/Exception";
import { ponto } from "../../models/Ponto";

export async function criarPontoComConexoes(email: string, nome: string, tipo: string) {
    const prisma = new PrismaClient();
    try {
      const novoPonto = await prisma.ponto.create({
        data: {
          tipo: tipo,
          funcionarioE: {
            connect: { email }, // Conecta o funcionário pelo email
          },
          funcionarioN: {
            connect: { name: nome }, // Conecta o funcionário pelo nome
          },
        },
      });
  
      console.log('Ponto criado com sucesso:', novoPonto);
      return novoPonto;
    } catch (error) {
      console.error('Erro ao criar ponto:', error);
      throw error;
    }
}

export async function getAllPontos(dataInicio: Date, dataFinal: Date): Promise<ponto[]> {
    const prisma = new PrismaClient();
    try {
        const pontos = await prisma.ponto.findMany({
            where: {
                horario: {
                    gte: dataInicio.toISOString(),
                    lte: dataFinal.toISOString()
                },
            },
            include: {
              funcionarioE: true,
              funcionarioN: true,
            },
    })
    return pontos;
    } catch (error) {
        console.error("Erro ao buscar pontos:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
  
}