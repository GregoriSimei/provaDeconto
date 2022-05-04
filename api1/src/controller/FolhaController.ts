import { Request, Response } from "express";
import { Folha } from "../model/Folha";
import axios from "axios";

const folhas: Folha[] = [];
let id: number = 1;

export class FolhaController {

    async cadastrar(req: Request, res: Response) {
        const body: Folha = req.body;

        const jaExiste = folhas.find(
            it => 
                it.ano == body.ano &&
                it.mes == body.mes &&
                it.funcionario.cpf == body.funcionario.cpf
        );

        if(jaExiste) return res.status(400).json({message : "Ja existe folha cadastrada"});

        body.id = id;
        body.irrf = null;
        body.bruto = null;
        body.liquido = null;
        body.inss = null;
        body.fgts = null;

        id++;
        
        folhas.push(body);

        return res.status(200).json(body);
    }

    async calcular(req: Request, res: Response) {
        for(const idxFolha in folhas) {

            const folha = folhas[idxFolha];
                
            console.log(!folha.bruto);
                
            if(!folha.bruto) {
                // Calcular salario bruto
                if(!folha.bruto) folha.bruto = folha.horas * folha.valor;
                
                // Calcular imposto de renda
                if(!folha.irrf) {
                    const salBruto = folha.bruto;
                    if(salBruto <= 1903.98) folha.irrf = 0;
                    else if(salBruto <= 2826.65) folha.irrf = salBruto * 0.075 - 142.80;
                    else if(salBruto <= 3751.05) folha.irrf = salBruto * 0.15 - 354.80;
                    else if(salBruto <= 4664.68) folha.irrf = salBruto * 0.225 - 636.13;
                    else folha.irrf = salBruto * 0.275 - 869.36;
                }

                // Calcular inss
                if(!folha.inss) {
                    const salBruto = folha.bruto;
                    if(salBruto <= 1693.72) folha.inss = salBruto * 0.08;
                    else if(salBruto <= 2822.90) folha.inss = salBruto * 0.09;
                    else if(salBruto <= 5645.80) folha.inss = salBruto * 0.11;
                    else folha.inss = 621.03;
                }
                
                // Calcular FGTS
                if(!folha.fgts) folha.fgts = folha.bruto * 0.08;

                // Calcular Salário liquido
                if(!folha.liquido) folha.liquido = folha.bruto - folha.irrf - folha.inss;

                await axios.post("http://localhost:4321/folha/cadastrar", folha);
            }
        }
        return res.status(200).send();
    }
}