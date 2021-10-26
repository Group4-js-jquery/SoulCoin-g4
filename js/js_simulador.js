// CÓDIGO TABELA DE CADASTRO

// criar a classe com letra maiscula para diferenciar dos atribuitos
// declaração da classe - ela engloba tudo, nossos dados, eventos e funções necessárias para conseguirmos montar nosso banco de dados/listas/base de produtos.
var dataId = Date.now();

class SoulCoin {
  // definição dos atributos da classe
  constructor() {
    // "this" condições dos atributos, normalmente se começa com "id=1", mas podemos deixar aberto para o usuário digitar ou inciarmos a partir de outro número.
    // o "id" será a nosso ponto inicial e de indexização com o nosso cadastro.
    this.id = dataId;

    // aqui estamos fazendo um array dos nossos dados, neste exemplo estamos puxando o "id" que será sequencial (a partir de 1) e jea está declarado, após isso temos o dado nome e depois o dado valor.
    this.arrayMoeda = [];

    // propriedade para testa qual método deve ser executado pelo botão "btn1"
    // esta propriedade está aqui para validar quando iremos adicionar dados e ele deixa de ser 0 sendo atribuido um novo valor, ou quando precisamos corrigir um dado digitado e ele não crie novos dados e só atualize.
    // esta propriedade está aqui para validar quando iremos adicionar dados e ele deixa de ser 0 sendo atribuido um novo valor, ou quando precisamos corrigir um dado digitado e ele não crie novos dados e só atualize.
    // esta propriedade está aqui para validar quando iremos adicionar dados e ele deixa de ser 0 sendo atribuido um novo valor, ou quando precisamos corrigir um dado digitado e ele não crie novos dados e só atualize.
    this.testeBtn = 0;
  }

  // salvar o produto digitado pelo usuário no objeto produto.
  salvar() {
    // alert("Salvando");
    // criando uma varieavel local que irá adicionar novos ou atualizar os dados da lista.
    let novaOperacao = this.lerDados();

    // essa validação serve para definir se iremos adicionar dados ou atualizá-lo ou se há dados a serem adicionados. há uma validação abaixo com o detalhamento desse evento.
    if (this.validarCampos(novaOperacao)) {
      // alert("Podemos Salvar?");
      // se o campo estiver vazio vamos adicionar
      if (this.testeBtn == 0) {
        this.adicionar(novaOperacao);
      }
      // se o campo tiver dados vamos atualizá-lo
      else {
        this.atualizar(this.testeBtn);
      }
      // aqui temos o retorno dos eventos de listarDados com todos os itens da nossa lista jea digitado ou o cancelar onde limpar os campos digitados antes de salvar.
      this.listarDados();
      this.cancelar();
    }
    // imprimir na tela o item novo ou atualizado.
    console.log(this.arrayMoeda);
  }

  // método para alimentar a tabela com os arrayMoedas.
  listarDados() {
    // delcaracnao de uma variável para referenciar o tbody da tabela dos arrayMoedas.
    let tbody = document.getElementById('tbody');

    tbody.innerText = '';

    // loop para pecorrer o array de arrayMoedas.
    for (let i = 0; i < this.arrayMoeda.length; i++) {
      // inserir uma nova linha no tbody.
      let novaLinha = tbody.insertRow();

      // criar cada coluna (célula) de cada linha.
      let td_id = novaLinha.insertCell();
      let td_operacao = novaLinha.insertCell();
      let td_quantidade = novaLinha.insertCell();
      let td_valor = novaLinha.insertCell();
      let td_cotacao = novaLinha.insertCell();

      // alimentar as células.
      td_id.innerText = this.arrayMoeda[i].id;
      td_operacao.innerText = this.arrayMoeda[i].operacao;
      td_quantidade.innerText = this.arrayMoeda[i].quantidade;
      td_valor.innerText = this.arrayMoeda[i].valor;
      td_cotacao.innerText = this.arrayMoeda[i].cotacao;
    }
  }

  adicionar(novaOperacao) {
    this.arrayMoeda.push(novaOperacao);

    this.id = dataId;
  }

  // metodo para limpar os inputs
  cancelar() {
    document.getElementById('tipoOperação').value = '';
    document.getElementById('quantidadeMoeda').value = '';
    this.testeBtn = 0;
  }

  // capturar o que foi digitado pelo usuários nos inputs.
  lerDados() {
    // as chaves vazias segue a mesma ideia do que se fazia em Array, deixando uma lista vazia a ser preenchida. Poderia seguir o mesmo esquema padrão, colocando as chaves antes e depois dos valores (depois do let e antes do return). Quando se colaca as {} ela é uma variável do tipo objeto.
    // as chaves vazias segue a mesma ideia do que se fazia em Array, deixando uma lista vazia a ser preenchida. Poderia seguir o mesmo esquema padrão, colocando as chaves antes e depois dos valores (depois do let e antes do return). Quando se colaca as {} ela é uma variável do tipo objeto.
    // as chaves vazias segue a mesma ideia do que se fazia em Array, deixando uma lista vazia a ser preenchida. Poderia seguir o mesmo esquema padrão, colocando as chaves antes e depois dos valores (depois do let e antes do return). Quando se colaca as {} ela é uma variável do tipo objeto.
    let novaOperacao = {};

    novaOperacao.operacao = document.getElementById('tipoOperação').value;
    //COLOCAR A FUNÇÃO DE CONVERSÃO AQUI
    const converte =
      Number(document.getElementById('quantidadeMoeda').value) * 3;
    novaOperacao.quantidade = converte;

    novaOperacao.id = this.id;

    return novaOperacao;
  }

  // validação dos conteúdos dos inputs
  validarCampos(novaOperacao) {
    let msg = '';
    if (novaOperacao.operacao == '') {
      msg += '- informe o tipo de operação\n';
    }
    if (novaOperacao.quantidade == '') {
      msg += '- informe o quantidade de Moedas \n';
    }
    if (msg != '') {
      alert(msg);
      return false;
    }
    return true;
  }

  mostrarDados(dados) {
    // alert("Vamos Editar o ID: " + dados.id);

    // mostrar as propriedades dos produtos nos inputs.
    document.getElementById('tipoOperação').value = dados.operacao;
    document.getElementById('quantidadeMoeda').value = dados.quantidade;

    // modificar o texto do botão Salvar e atribuindo a propriedade "testeBtn"para o id do produto selecionado.
    document.getElementById('btn1').innerText = 'Atualizar';
    this.testeBtn = dados.id;
  }

  atualizar(id) {
    //alert("Agora Vamos Atualizar?")

    // procurando pelo produto que será atualizado.
    for (let i = 0; i < this.arrayMoeda.length; i++) {
      if (id == this.arrayMoeda[i].id) {
        // atualizando o nome e valor do produto.
        this.arrayMoeda[i].operacao =
          document.getElementById('tipoOperação').value;
        this.arrayMoeda[i].quantidade =
          document.getElementById('quantidadeMoeda').value;
      }
    }
    // voltando a escritado do botão para salvar e voltando também a propriedade "testeBtn" para 0 para o modo adicionar
    document.getElementById('btn1').innerText = 'Salvar';
    this.testeBtn = 0;
  }
}

// com a "var produto" temos a criação de uma nova varáviavel tendo como estrutura os atributos da "class Produto".
var novaOperacao = new SoulCoin();
