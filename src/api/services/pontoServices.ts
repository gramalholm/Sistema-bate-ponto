import { PrismaClient } from "@prisma/client";
import { ponto } from "../../models/Ponto";
import { NotFoundException } from "../Exceptions/NotFoundException";
import { Exception } from "../Exceptions/Exception";

export async function criarPontoComConexoes(email: string, nome: string, tipo: string) {
    const prisma = new PrismaClient();
    try {
      const novoPonto = await prisma.ponto.create({
        data: {
          tipo: tipo,
          funcionarioE: {
            connect: { email },
          },
          funcionarioN: {
            connect: { name: nome },
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