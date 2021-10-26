// CÓDIGO TABELA DE CADASTRO

// criar a classe com letra maiscula para diferenciar dos atribuitos
// declaração da classe - ela engloba tudo, nossos dados, eventos e funções necessárias para conseguirmos montar nosso banco de dados/listas/base de produtos.


class SoulCoin {

    constructor() {

        this.id = 1

        this.arrayMoeda = [];

        this.testeBtn = 0;
    }

    salvar() {

        let novaOperacao = this.lerDados();

        if (this.validarCampos(novaOperacao)) {

            if (this.testeBtn == 0) {
                this.adicionar(novaOperacao);
            }
            
            else {
                this.atualizar(this.testeBtn);
            }
            
            this.listarDados();

            this.cancelar();
        }
        // console.log(this.arrayMoeda);
    }

    listarDados() {

        let tbody = document.getElementById("tbody");

        tbody.innerText = "";

        for (let m = 0; m < this.arrayMoeda.length; m++) {

            let novaLinha = tbody.insertRow();

            let td_id = novaLinha.insertCell();
            let td_operacao = novaLinha.insertCell();
            let td_quantidade = novaLinha.insertCell();
            let td_valor = novaLinha.insertCell();
            let td_cotacao = novaLinha.insertCell();
            let td_acoes = novaLinha.insertCell();

            td_id.innerText = this.arrayMoeda[m].id;
            td_operacao.innerText = this.arrayMoeda[m].operacao;
            td_quantidade.innerText = this.arrayMoeda[m].quantidade;
            td_valor.innerText = this.arrayMoeda[m].valor;
            td_cotacao.innerText = this.arrayMoeda[m].cotacao;

            let imgEdit = document.createElement("img");
            imgEdit.src = "img/edit.png";
            td_acoes.appendChild(imgEdit);

            let imgDelete = document.createElement("img");
            imgDelete.src = "img/del.png";
            td_acoes.appendChild(imgDelete);

            imgDelete.setAttribute("onclick", "novaOperacao.deletar(" + this.arrayMoeda[m].id + ")");

            imgEdit.setAttribute("onclick", "novaOperacao.mostrarDados(" + JSON.stringify(this.arrayMoeda[m]) + ")");
        }
    }

    adicionar(novaOperacao) {
        this.arrayMoeda.push(novaOperacao);
        this.id++;
    }

    cancelar() {
        document.getElementById("tipoOperacao").value = "";
        document.getElementById("quantidadeMoeda").value = "";
        document.getElementById("btn1").innerText = "Salvar"
        this.testeBtn = 0;
    }

    lerDados() {

        let novaOperacao = {};

        novaOperacao.operacao = document.getElementById("tipoOperacao").value;


        // var converte = (function(){
        //     if (novaOperacao.operacao == "Compra") {
        //        const vlrCompra = Math.sqrt(Math.sqrt(Math.pow(Number(document.getElementById("quantidadeMoeda").value), 3)))*7;
        //        console.log(vlrCompra);
        //     } 
        // });
        
        var cotacaoHoje = (Math.random()+7).toFixed(4)

        var cotacaoCompra = (Math.sqrt(Math.sqrt(Math.pow((document.getElementById("quantidadeMoeda").value), 3)))+(document.getElementById("quantidadeMoeda").value*cotacaoHoje))

        var cotacaoVenda = ((cotacaoCompra)-((Math.random()*(cotacaoCompra*0.1))+(cotacaoCompra*0.08)));

        novaOperacao.quantidade = document.getElementById("quantidadeMoeda").value;
        if (novaOperacao.operacao == "Compra") {
        novaOperacao.valor = cotacaoCompra.toFixed(4)}
        else if (novaOperacao.operacao == "Venda") {
            novaOperacao.valor = cotacaoVenda.toFixed(4)}

        novaOperacao.cotacao = cotacaoHoje
        
        novaOperacao.id = this.id;

        return novaOperacao;
    }

    validarCampos(novaOperacao) {
        let msg = "";
        if (novaOperacao.operacao == "") {
            msg += "- informe o tipo de operação\n";
        }
        if (novaOperacao.quantidade == "") {
            msg += "- informe o quantidade de Moedas \n";
        }
        if (msg != "") {
            alert(msg);
            return false;
        }
        return true;
    }

    deletar(buscaId) {

        if (confirm("Deseja Realmente Deletar o Câmbio de ID: " + buscaId)) {
            for (let m = 0; m < this.arrayMoeda.length; m++) {
                if (this.arrayMoeda[m].id == buscaId) {
                    this.arrayMoeda.splice(m, 1);
                    tbody.deleteRow(m);
                }
            }
        }
    }

    mostrarDados(dados) {

        document.getElementById("tipoOperacao").value = dados.operacao;
        document.getElementById("quantidadeMoeda").value = dados.quantidade;

        document.getElementById("btn1").innerText = "Atualizar";
        this.testeBtn = dados.id;
    }

    atualizar(id) {

        for (let m = 0; m < this.arrayMoeda.length; m++) {
            if (id == this.arrayMoeda[m].id) {
                this.arrayMoeda[m].operacao = document.getElementById("tipoOperação").value;
                this.arrayMoeda[m].quantidade = document.getElementById("quantidadeMoeda").value
            }
        }
        document.getElementById("btn1").innerText = "Salvar"
        this.testeBtn = 0;
    }
}

// com a "var produto" temos a criação de uma nova varáviavel tendo como estrutura os atributos da "class Produto".
var novaOperacao = new SoulCoin();
