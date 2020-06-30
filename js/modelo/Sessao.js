import Sala from "./Sala";

export default class Sessao{
    constructor(){
        this.data;
        this.horarioInicio;
        this.legendado = true;
        this.tresD = true;
        this.sala = new Sala();
    }
}