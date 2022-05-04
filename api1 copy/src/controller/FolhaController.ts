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

        id++;

        console.log(body);
        
        folhas.push(body);

        return res.status(200).json(body);
    }

    async listar(req: Request, res: Response) {
        return res.status(200).json(folhas);
    }

    async filtrar(req: Request, res: Response) {
        const cpf = req.params.cpf as string;
        const mes = parseInt(req.params.mes as string);
        const ano = parseInt(req.params.ano as string);

        const folha = folhas.find(it => it.mes == mes && it.ano == ano && it.funcionario.cpf == cpf);

        return res.status(200).json(folha);
    }
}