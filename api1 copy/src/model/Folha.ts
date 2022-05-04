import { Funcionario } from "./Funcionario";

export interface Folha {
    id: number;
    mes: number;
    ano: number;
    horas: number;
    valor: number;
    funcionario: Funcionario;
    bruto?: number;
    irrf?: number;
    inss?: number;
    fgts?: number;
    liquido?: number;
};