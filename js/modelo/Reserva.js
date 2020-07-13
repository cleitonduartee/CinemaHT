export class Reserva {
    constructor(id, sessao, cliente, cadeiras) {
        this.id = id;
        this.sessao = sessao;
        this.cliente = cliente;
        this.cadeirasReservadas = cadeiras;
    }
}