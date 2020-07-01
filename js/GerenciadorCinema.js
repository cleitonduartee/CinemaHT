//class Cliente 
class Cliente {
    constructor(id, nome, idade, email) {
        this.id = id
        this.nome = nome;
        this.idade = idade;
        this.email = email;
    }
}
const Cadeira = {    
    cliente:null,
    ocupado:false,   
}

class Sala {
    constructor(id,identificador) {
        this.id=id;
        this.identificador = identificador;
        this.cadeiras = {
            A: [{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira}],
            B: [{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira}],
            C: [{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira}],
            D: [{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira}],
            E: [{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira}],
            F: [{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira},{Cadeira}]
        }
    }
}

class Sessao {
    constructor(data, horarioInicio, legendado, tresD, sala) {
        this.data = data,
            this.horarioInicio = horarioInicio,
            this.legendado = legendado,
            this.tresD = tresD,
            this.sala = sala
    }
}
class Filme {
    constructor(id,titulo, duracao,classificacao, genero, sinopse) {
        this.id = id;
        this.titulo = titulo;        
        this.duracao = duracao;
        this.classificacao = classificacao;
        this.genero = genero;
        this.sinopse = sinopse;
    }
}



class GerenciadorCinema {
    constructor() {
        this.sessoes = [];
        this.clientes = [];
        this.filmes = [];
        this.salas = [];
        this.idCliente = 0;
        this.idFilme = 0;
        this.idSala = 0;
        this.idEdicaoCliente = null;
        this.idEdicaoFilme = null;
        this.idEdicaoSala = null;
    }

    //Inicialização Tela



    //Leitura de daodos    
    lerDados(tela) {
        if (tela == "filme") {
            let filme = {}

            filme.titulo = document.getElementById("nomeFilme").value;            
            filme.duracao = document.getElementById("duracaoFilme").value;
            filme.classificacao = document.getElementById("classificacaoFilme").value;
            filme.genero = document.getElementById("generoFilme").value;
            filme.sinopse = document.getElementById("sinopseFilme").value;

            return filme;

        } else if (tela == "cliente") {
            let cliente = {}

            cliente.nome = document.getElementById("nomeCliente").value;
            cliente.idade = document.getElementById("idadeCliente").value;
            cliente.email = document.getElementById("emailCliente").value;

            return cliente;
        }
        else if( tela == "sala"){
            let nomeSala = {};
            nomeSala.identificador = document.getElementById("nomeSala").value;

            return nomeSala;
        }
    }

    //Validação
    validarDados(dados, tela) {
        let buffer = "";

        if (tela == "cliente") {        
            if (dados.nome == "") buffer += "Preencha o campo Nome\n"
            if (dados.idade == "") buffer += "Preencha o campo Idade\n"
            if (dados.email == "") {
                buffer += "Preencha o campo Email\n"
            } else {
                if (dados.email.indexOf('@') == -1) buffer += "Inclua um '@' no endereço de email.\n"
            }


            if (buffer != "") {
                this.gerarMSg(buffer);
                return false
            } else return true
            
        }else if(tela == "filme"){
            if (dados.titulo == "") buffer += "Informe o campo Nome do Filme\n"
            if (dados.duracao == "") buffer += "Informe a Duração do Filme\n"           
            if (dados.genero == "") buffer += "Informe o gênero do Filme\n"
            if (dados.sinopse == "") buffer += "Informe uma descrição para o Filme em SINOPSE\n"

            if(buffer != ""){
                this.gerarMSg(buffer);
                return false
            }else return true;
            
        }
        else if (tela == "sala"){
            if(dados.identificador=="")buffer = "Informe o nome da Sala\n"

            if(buffer != "") {
            this.gerarMSg(buffer)
            return false
            }else return true;
        }

    }
    verificarEmail(email, id) {
        let i = 0;
        let achou = false;

        //se for primeiro cadastro
        if (this.clientes.length == 0) return achou;

        //se for edição
        if (id != undefined) {
            while (i < this.clientes.length && achou == false) {
                if (this.clientes[i].email == email) {
                    if (this.clientes[i].id != id) {
                        achou = true;
                    }
                }
                i++;
            }
            //se for novo cadastro
        } else {
            while (i < this.clientes.length && achou == false) {
                if (this.clientes[i].email == email) {
                    achou = true;
                }
                i++;
            }
        }
        return achou;

    }
    gerarMSg(msg) {
        document.getElementById("mensagem").innerText = msg;
        document.getElementById("idboxMsg").classList.add("aparece");
    }
    fechaMensag() {
        document.getElementById("idboxMsg").classList.remove("aparece");
    }



    salvar(tela) {
        //Tela cliente
        if (tela == "cliente") {
            let dadosCliente = this.lerDados("cliente");

            if (this.validarDados(dadosCliente, "cliente") == false) return
            if (this.verificarEmail(dadosCliente.email, dadosCliente.id) == true) return this.gerarMSg("Email já cadastrado.");

            let cliente = new Cliente(this.idCliente, dadosCliente.nome, dadosCliente.idade, dadosCliente.email);
            this.idCliente++

            this.clientes.unshift(cliente);

            this.gerarTabela(this.clientes, "cliente");
        } 
        //Tela filme
        else if (tela == "filme") {
            let dadosFilme = this.lerDados("filme");

            if (this.validarDados(dadosFilme, "filme") == false) return

            let filme = new Filme(this.idFilme, dadosFilme.titulo, dadosFilme.duracao, dadosFilme.classificacao, dadosFilme.genero,dadosFilme.sinopse);
            this.idFilme++;

            this.filmes.unshift(filme);

            this.gerarTabela(this.filmes, "filme")
        }
        //Tela Sala
        else if(tela=="sala"){
            let dadosSala = this.lerDados("sala");
            if(this.validarDados(dadosSala,"sala")==false )return;

            let sala = new Sala(this.idSala,dadosSala.identificador);
            this.idSala++;

            this.salas.unshift(sala);

            this.gerarTabela(this.salas, "sala");

        }



    }
    formatHoras(time) {
       let horas = time.slice(0,2);
       let minutos = time.slice(3);
       let timeFormat = `${horas} Horas e ${minutos} Minutos`       
      
       return timeFormat;


    }
    formatMaiusculo(text) {
        return text.toUpperCase();
    }
    gerarTabela(dados, tela) {
        //quando excluir todos dados da tabela
        if (dados.length == 0) {
            if (tela == "cliente") document.getElementById("tbodyCliente").innerHTML = "";
            if (tela == "filme") document.getElementById("tbodyFilmes").innerHTML = "";
            if (tela == "sala") document.getElementById("tbodySala").innerHTML = "";
            
        }

        //Tabela Cliente
        if (tela == "cliente") {
            let tabela = document.getElementById("tbodyCliente");
            let linha = "";
            for (let i = 0; i < dados.length; i++) {
                linha += `
                    <tr>
                        <td id="colNome" class="tbleClienteNome">${this.formatMaiusculo(dados[i].nome)}</td>
                        <td class="tableClienteIdade">${dados[i].idade}</td>
                        <td class="tableClienteEmail">${dados[i].email}</td>
                        <td class="tableClienteacao"> <div class="btnCrud"> <button type="button" onclick="gerenciadorCinema.editar('${dados[i].id}','cliente')">Edit</button>   <button type="button" onclick="gerenciadorCinema.excluirDados('${dados[i].id}','cliente')">Excluir</button> </div> </td>
                    </tr>
                `
                tabela.innerHTML = linha;
            }
            this.cancelar("cliente");
            this.salvarLS(dados, this.idCliente, "cliente");
        }

        //Tela Filmes
        else if(tela == "filme"){
            let tabela = document.getElementById("tbodyFilmes");
            let linha = "";
            for (let i = 0; i < dados.length; i++) {
                linha += `
                    <tr>
                        <td id="colNome" class="tableFilmeNome">${this.formatMaiusculo(dados[i].titulo)}</td>
                        <td class="tableFilmeDuracao">${this.formatHoras(dados[i].duracao)}</td>      
                        <td class="tableFilmeGenero">${this.formatMaiusculo(dados[i].genero)}</td>                 
                        <td class="tableFilmeAcao"><div class="btnCrud"> <button type="button" onclick="gerenciadorCinema.editar('${dados[i].id}','filme')">Edit</button>   <button type="button" onclick="gerenciadorCinema.excluirDados('${dados[i].id}','filme')">Excluir</button> </div> </td>
                    </tr>
                `
                tabela.innerHTML = linha;
            }
            this.cancelar("filme");
            this.salvarLS(dados, this.idCliente, "filme");
        }
        //Tela Sala
        else if(tela == "sala"){
            let tabela = document.getElementById("tbodySala");
            let linha = "";
            for (let i = 0; i < dados.length; i++) {
                linha += `
                    <tr>
                        <td class="tableSalaNomee">${this.formatMaiusculo(dados[i].identificador)}</td>                                    
                        <td class="tableSalaAcao"><div class="btnCrud"> <button type="button" onclick="gerenciadorCinema.editar('${dados[i].id}','sala')">Edit</button>   <button type="button" onclick="gerenciadorCinema.excluirDados('${dados[i].id}','sala')">Excluir</button> </div> </td>
                    </tr>
                `
                tabela.innerHTML = linha;
            }
            this.cancelar("sala");
            this.salvarLS(dados, this.idCliente, "sala");
        }
    }
    salvarLS(dados, id, tela) {
        //Salva dados Cliente
        if (tela == "cliente") {
            let jsonClientes = JSON.stringify(dados);
            let jsonIdCliente = JSON.stringify(id);

            localStorage.setItem("ClientesCinemaHT", jsonClientes);
            localStorage.setItem("id_ClientesCinemaHT", jsonIdCliente);
        }
        //Salva dados Filme
        else if(tela == "filme"){
            let jsonFilmes = JSON.stringify(dados);
            let jsonIdFilmes = JSON.stringify(id);

            localStorage.setItem("FilmesCinemaHT", jsonFilmes);
            localStorage.setItem("id_FilmesCinemaHT", jsonIdFilmes);
        }
        //Salvar dados sala
        else if(tela == "sala"){
            let jsonSala = JSON.stringify(dados);
            let jsonIdSala = JSON.stringify(id);

            localStorage.setItem("SalasCinemaHT", jsonSala);
            localStorage.setItem("id_SalasCinemaHT", jsonIdSala);
        }

    }
    initLS(tela) {
        if (tela == "cliente") {
            let clientes = JSON.parse(localStorage.getItem("ClientesCinemaHT"));
            let idClientes = JSON.parse(localStorage.getItem("id_ClientesCinemaHT"));

            if (clientes != null || idClientes != null) {
                this.clientes = clientes;
                this.idCliente = idClientes;

                this.gerarTabela(clientes, "cliente");
            }
        }

        else if(tela == "filme") {
            let filmes = JSON.parse(localStorage.getItem("FilmesCinemaHT"));
            let idFilmes = JSON.parse(localStorage.getItem("id_FilmesCinemaHT"));

            if (filmes != null || idFilmes != null) {
                this.filmes = filmes;
                this.idFilme = idFilmes;

                this.gerarTabela(filmes, "filme");
            }
        }
        else if( tela == "sala"){
            let salas = JSON.parse(localStorage.getItem("SalasCinemaHT"));
            let idSalas = JSON.parse(localStorage.getItem("id_SalasCinemaHT"));

            if(salas != null || idSalas !== null){
                this.salas = salas;
                this.idSala = idSalas;

                this.gerarTabela(salas, "sala");
            }
        }
    }
    cancelar(tela) {
        if (tela == "cliente") {
            document.getElementById("nomeCliente").value = "";
            document.getElementById("idadeCliente").value = "";
            document.getElementById("emailCliente").value = "";
            this.idEdicaoCliente = null;

            document.getElementById('btnSalvarCliente').style.display = "inline-block";
            document.getElementById('btnAtualizarCliente').style.display = "none";
        }
        else if (tela == "filme") {
            document.getElementById("nomeFilme").value = "";
            document.getElementById("classificacaoFilme").value = "";
            document.getElementById("duracaoFilme").value = "";
            document.getElementById("generoFilme").value = "";
            document.getElementById("sinopseFilme").value = "";
            this.idEdicaoFilme = null;

            document.getElementById('btnSalvarFilme').style.display = "inline-block";
            document.getElementById('btnAtualizarFilme').style.display = "none";
        }
        else if(tela=="sala"){
            document.getElementById("nomeSala").value = "";

            this.idEdicaoSala = null;

            document.getElementById('btnSalvarSala').style.display = "inline-block";
            document.getElementById('btnAtualizarSala').style.display = "none";
        }

    }

    editar(id, tela) {
        if (tela == "cliente") {
            let i = 0;
            let achou = false;
            while (i < this.clientes.length && achou == false) {

                if (this.clientes[i].id == id) {
                    document.getElementById("nomeCliente").value = this.clientes[i].nome;
                    document.getElementById("idadeCliente").value = this.clientes[i].idade;
                    document.getElementById("emailCliente").value = this.clientes[i].email;

                    this.idEdicaoCliente = this.clientes[i].id;

                    document.getElementById('btnSalvarCliente').style.display = "none";
                    document.getElementById('btnAtualizarCliente').style.display = "inline-block";

                    achou = true;
                }
                i++;
            }
        }
        
       else if (tela == "filme") {
            let i = 0;
            let achou = false;
            while (i < this.filmes.length && achou == false) {

                if (this.filmes[i].id == id) {
                    document.getElementById("nomeFilme").value = this.filmes[i].titulo;
                    document.getElementById("duracaoFilme").value = this.filmes[i].duracao;
                    document.getElementById("classificacaoFilme").value = this.filmes[i].classificacao;
                    document.getElementById("generoFilme").value = this.filmes[i].genero;
                    document.getElementById("sinopseFilme").value = this.filmes[i].sinopse;

                    this.idEdicaoFilme = this.filmes[i].id;

                    document.getElementById('btnSalvarFilme').style.display = "none";
                    document.getElementById('btnAtualizarFilme').style.display = "inline-block";

                    achou = true;
                }
                i++;
            }
        }
        else if(tela=="sala"){
            let i = 0;
            let achou = false;

            while(i<this.salas.length && achou == false){
                
                if(this.salas[i].id == id){
                    document.getElementById("nomeSala").value = this.salas[i].identificador;

                    this.idEdicaoSala = this.salas[i].id;

                    document.getElementById("btnSalvarSala").style.display = "none";
                    document.getElementById("btnAtualizarSala").style.display = "inline-block";

                    achou = true;
                }
                i++;
            }
        }
    }
    atualizarDados(tela) {
        if (tela == "cliente") {
            let cliente = this.lerDados('cliente');
            let achou = false;
            let i = 0;

            if (this.validarDados(cliente, "cliente") == false) return
            if (this.verificarEmail(cliente.email, this.idEdicaoCliente) == true) return this.gerarMSg("Email já cadastrado.");

            while (i < this.clientes.length && achou == false) {
                if (this.clientes[i].id == this.idEdicaoCliente) {
                    this.clientes[i].id = this.idEdicaoCliente;
                    this.clientes[i].nome = cliente.nome;
                    this.clientes[i].idade = cliente.idade;
                    this.clientes[i].email = cliente.email;
                    achou = true;
                }
                i++;
            }
            this.gerarTabela(this.clientes, "cliente");
        } else if (tela == "filme") {
           
            let filme = this.lerDados('filme');
            if (this.validarDados(filme, "filme") == false) return
            let achou = false;
            let i = 0;

           

            while (i < this.filmes.length && achou == false) {
                if (this.filmes[i].id == this.idEdicaoFilme) {
                    this.filmes[i].id = this.idEdicaoFilme;
                    this.filmes[i].titulo = filme.titulo;
                    this.filmes[i].duracao = filme.duracao;
                    this.filmes[i].classificacao = filme.classificacao;
                    this.filmes[i].genero = filme.genero;
                    this.filmes[i].sinopse = filme.sinopse;
                    achou = true;
                }
                i++;
            }
            this.gerarTabela(this.filmes, "filme");
        }
        else if(tela == "sala"){
            
            let sala = this.lerDados('sala');
            if(this.validarDados(sala, "sala")==false) return
            let achou = false;
            let i = 0;

            while(i<this.salas.length && achou ==false){
                if(this.salas[i].id == this.idEdicaoSala){
                    this.salas[i].id = this.idEdicaoSala;
                    this.salas[i].identificador = sala.identificador;
                    achou = true;
                }
                i++;
            }
            this.gerarTabela(this.salas, "sala");
        }
    }
    excluirDados(id, tela) {
        if (tela == "cliente") {
            if (confirm("Tem certeza que deseja Excluir?")) {
                let i = 0;
                let achou = false;
                while (i < this.clientes.length && achou == false) {
                    if (this.clientes[i].id == id) {
                        //primeiro
                        if (i == 0) {
                            achou = true;
                            this.clientes.shift();
                            this.gerarTabela(this.clientes, "cliente")
                            //ultimo
                        } else if (i == this.clientes.length - 1) {
                            achou = true;
                            this.clientes.pop();
                            this.gerarTabela(this.clientes, "cliente")
                            //meio
                        } else {
                            achou = true;
                            let arrayInicio = this.clientes.slice(0, i);
                            let arrayFinal = this.clientes.slice(i + 1);
                            this.clientes = arrayInicio.concat(arrayFinal);
                            this.gerarTabela(this.clientes, "cliente")
                        }

                    }
                    i++
                }
            }
        }
        else  if (tela == "filme") {
            if (confirm("Tem certeza que deseja Excluir?")) {
                let i = 0;
                let achou = false;
                while (i < this.filmes.length && achou == false) {
                    if (this.filmes[i].id == id) {
                        //primeiro
                        if (i == 0) {
                            achou = true;
                            this.filmes.shift();
                            this.gerarTabela(this.filmes, "filme")
                            //ultimo
                        } else if (i == this.filmes.length - 1) {
                            achou = true;
                            this.filmes.pop();
                            this.gerarTabela(this.filmes, "filme")
                            //meio
                        } else {
                            achou = true;
                            let arrayInicio = this.filmes.slice(0, i);
                            let arrayFinal = this.filmes.slice(i + 1);
                            this.filmes = arrayInicio.concat(arrayFinal);
                            this.gerarTabela(this.filmes, "filme")
                        }

                    }
                    i++
                }
            }
        }
        else if(tela == "sala"){
            if(confirm("Tem certeza que deseja Excluir?")) {
                let i = 0;
                let achou = false;
                while (i < this.salas.length && achou == false) {
                    if (this.salas[i].id == id) {
                            //primeiro
                        if (i == 0) {
                            achou = true;
                            this.salas.shift();
                            this.gerarTabela(this.salas, "sala")
                            //ultimo
                        } else if (i == this.salas.length - 1) {
                            achou = true;
                            this.salas.pop();
                            this.gerarTabela(this.salas, "sala")
                            //meio
                        } else {
                            achou = true;
                            let arrayInicio = this.salas.slice(0, i);
                            let arrayFinal = this.salas.slice(i + 1);
                            this.salas = arrayInicio.concat(arrayFinal);
                            this.gerarTabela(this.salas, "sala")
                        }

                    }
                    i++
                }
            }
        }
    }



}
let gerenciadorCinema = new GerenciadorCinema();
