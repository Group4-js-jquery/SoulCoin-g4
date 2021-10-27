//////////////////// DEFINIÇÕES DOS SCRIPTS DE TODAS AS PÁGINAS

// ////////////////////////// COMUM A TODAS AS PÁGINAS - BOTÕES DE ACESSIBILIDADE

// vai identificar o elemento pelo id e setar uma classe para ele, a classe vai mudar o tamanho da fonte
var htmlFonte = document.getElementById('htmlFont');
function normalFontSize() {
  htmlFonte.className = 'normalFont';
}
function largeFontSize() {
  htmlFonte.className = 'largeFont';
}
function largerFontSize() {
  htmlFonte.className = 'largerFont';
}

$('#iconeNormal').click(function () {
  normalFontSize();
});
$('#iconeMaior').click(function () {
  largeFontSize();
});
$('#iconeMuitoMaior').click(function () {
  largerFontSize();
});

/////////////////////////// PÁGINA CÂMBIO

//////////////////////////////////////COMEÇO CALCULADORA///////////////////////////////////

//a calculadora aparece quando clica no botão toggle e desaparece após clicar no mesmo botão
$('#toggleCalculadora').click(function () {
  $('#apareceCalculadora').toggle();
});
//setando a variável que é mostrada no visor como vazia, ela será concatenada conforme o usuário digite
//inicializando as variáveis
var numDigitado = '';
var numCorrente = 0;
var resultado = 0;
var operador = '';
//esconde os botões da classe cientifica
//e após isso, verifica o clique no botão "cientifica", então mostra os botões da calculadora cientifica e habilita o botão que volta para a calculadora normal
$('.cientifica').hide();
$('#calcCientifica').click(function () {
  if ($('#calcCientifica').val('cientifica')) {
    $('#calcNormal').css('grid-row', '1/3');
    $('.cientifica').show();
    $('#calcCientifica').hide();
  }
  $('#calcNormal').click(function () {
    $('.cientifica').hide();
    $('#calcCientifica').show();
  });
});

//função será chamada para limpar o visor da calculadora ao clicar na tecla "C"
$('#limpar').click(function () {
  numCorrente = 0;
  numDigitado = '';
  $('#mostrarResultados').val(numDigitado);
});

// for vai percorrer as teclas numéricas com o id numx, conforme forem clicados o número vai concatenando com os valores anterioes e sendo mostrado no visor
for (let i = 0; i <= 9; i++) {
  $('#num' + i + '').click(function () {
    numDigitado = numDigitado + '' + i + '';
    $('#mostrarResultados').val(numDigitado);
  });
}
// o ponto será concatenado ao numero que está sendo digitado
$('#ponto').click(function () {
  numDigitado = numDigitado + '.';
  $('#mostrarResultados').val(numDigitado);
});

$('.operador').click(function () {
  operador = this.id;
  numCorrente = parseFloat(numDigitado);
  numDigitado = '';
  $('#mostrarResultados').val(numDigitado);
});

$('#potencia2').click(function () {
  resultado = Math.pow(numDigitado, 2);
  $('#mostrarResultados').val(resultado);
  numDigitado = '';
});
$('#potencia3').click(function () {
  resultado = Math.pow(numDigitado, 3);
  $('#mostrarResultados').val(resultado);
  numDigitado = '';
});
$('#raiz').click(function () {
  resultado = Math.sqrt(numDigitado);
  $('#mostrarResultados').val(resultado);
  numDigitado = '';
});

$('#igual').click(function () {
  conta(numDigitado, numCorrente, operador);
  numDigitado = '';
  numCorrente = 0;
  operador = '';
});

function conta(num1, num2, operacao) {
  switch (operacao) {
    case 'soma':
      resultado = parseFloat(num1) + parseFloat(num2);
      $('#mostrarResultados').val(resultado);
      break;
    case 'subtracao':
      resultado = parseFloat(num1) - parseFloat(num2);
      $('#mostrarResultados').val(resultado);
      break;
    case 'multiplicacao':
      resultado = parseFloat(num1) * parseFloat(num2);

      $('#mostrarResultados').val(resultado);
      break;
    case 'divisao':
      resultado = parseFloat(num2) / parseFloat(num1);

      $('#mostrarResultados').val(resultado);
      break;
    case 'porcentagem':
      resultado = (parseFloat(num1) / 100) * parseFloat(num2);

      $('#mostrarResultados').val(resultado);
      break;

    default:
      $('#mostrarResultados').val('0');
      break;
  }
}
//////////////////////////////////////FIM CALCULADORA///////////////////////////////////

/////////////////////////// PÁGINA SIMULAÇÃO

///////////////////////////////////////////// COMEÇO SCRIPT POO /////////////////////////////////////

class SoulCoin {
  constructor() {
    this.id = 1;

    this.arrayMoeda = [];

    this.testeBtn = 0;
  }

  salvar() {
    let novaOperacao = this.lerDados();

    if (this.validarCampos(novaOperacao)) {
      if (this.testeBtn == 0) {
        this.adicionar(novaOperacao);
      } else {
        this.atualizar(this.testeBtn);
      }

      this.listarDados();

      this.cancelar();
    }
  }

  listarDados() {
    let tbody = document.getElementById('tbody');

    tbody.innerText = '';

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

      let imgEdit = document.createElement('img');
      imgEdit.src = 'img/edit.png';
      td_acoes.appendChild(imgEdit);

      let imgDelete = document.createElement('img');
      imgDelete.src = 'img/del.png';
      td_acoes.appendChild(imgDelete);

      imgDelete.setAttribute(
        'onclick',
        'novaOperacao.deletar(' + this.arrayMoeda[m].id + ')'
      );

      imgEdit.setAttribute(
        'onclick',
        'novaOperacao.mostrarDados(' + JSON.stringify(this.arrayMoeda[m]) + ')'
      );

      $('img:first-child').click(function () {
        $('#tipoOperacao').attr('disabled', true);
      });
    }
  }

  adicionar(novaOperacao) {
    this.arrayMoeda.push(novaOperacao);
    this.id++;
  }

  cancelar() {
    document.getElementById('tipoOperacao').value = '';
    document.getElementById('quantidadeMoeda').value = '';
    document.getElementById('btnS').innerText = 'Salvar';
    this.testeBtn = 0;
    $('#tipoOperacao').attr('disabled', false);
  }

  lerDados() {
    let novaOperacao = {};

    novaOperacao.operacao = document.getElementById('tipoOperacao').value;

    // if (novaOperacao.operacao == "Compra") {
    //     $("#tbody td").css("background", "#ccc");
    // }
    // else {
    //     $("#tbody td").css("background", "#000");
    // }

    var cotacaoHoje = (Math.random() + 7).toFixed(4);

    var cotacao2 = Math.random();

    var cotacaoCompra =
      Math.sqrt(
        Math.sqrt(Math.pow(document.getElementById('quantidadeMoeda').value, 3))
      ) +
      document.getElementById('quantidadeMoeda').value * cotacaoHoje;

    var cotacaoVenda =
      cotacaoCompra - (cotacao2 * (cotacaoCompra * 0.1) + cotacaoCompra * 0.08);

    novaOperacao.quantidade = document.getElementById('quantidadeMoeda').value;
    if (novaOperacao.operacao == 'Compra') {
      novaOperacao.valor = cotacaoCompra.toFixed(4);
    } else if (novaOperacao.operacao == 'Venda') {
      novaOperacao.valor = cotacaoVenda.toFixed(4);
    }

    novaOperacao.cotacao = cotacaoHoje;

    novaOperacao.cotacao2 = cotacao2;

    novaOperacao.id = this.id;

    return novaOperacao;
  }

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

  deletar(buscaId) {
    if (confirm('Deseja Realmente Deletar o Câmbio de ID: ' + buscaId)) {
      for (let m = 0; m < this.arrayMoeda.length; m++) {
        if (this.arrayMoeda[m].id == buscaId) {
          this.arrayMoeda.splice(m, 1);
          tbody.deleteRow(m);
        }
      }
    }
    $('#tipoOperacao').attr('disabled', false);
  }

  mostrarDados(dados) {
    document.getElementById('tipoOperacao').value = dados.operacao;
    document.getElementById('quantidadeMoeda').value = dados.quantidade;

    document.getElementById('btnS').innerText = 'Atualizar';
    this.testeBtn = dados.id;
  }

  atualizar(id) {
    for (let m = 0; m < this.arrayMoeda.length; m++) {
      if (id == this.arrayMoeda[m].id) {
        this.arrayMoeda[m].operacao = this.arrayMoeda[m].operacao;
        this.arrayMoeda[m].quantidade =
          document.getElementById('quantidadeMoeda').value;
        if (this.arrayMoeda[m].operacao == 'Compra') {
          this.arrayMoeda[m].valor = (
            Math.sqrt(Math.sqrt(Math.pow(this.arrayMoeda[m].quantidade, 3))) +
            this.arrayMoeda[m].quantidade * this.arrayMoeda[m].cotacao
          ).toFixed(4);
        } else if (this.arrayMoeda[m].operacao == 'Venda') {
          this.arrayMoeda[m].valor = (
            Math.sqrt(Math.sqrt(Math.pow(this.arrayMoeda[m].quantidade, 3))) +
            this.arrayMoeda[m].quantidade * this.arrayMoeda[m].cotacao -
            (this.arrayMoeda[m].cotacao2 *
              ((Math.sqrt(
                Math.sqrt(Math.pow(this.arrayMoeda[m].quantidade, 3))
              ) +
                this.arrayMoeda[m].quantidade * this.arrayMoeda[m].cotacao) *
                0.1) +
              (Math.sqrt(
                Math.sqrt(Math.pow(this.arrayMoeda[m].quantidade, 3))
              ) +
                this.arrayMoeda[m].quantidade * this.arrayMoeda[m].cotacao) *
                0.08)
          ).toFixed(4);
        }
      }
    }
    $('#tipoOperacao').attr('disabled', false);

    document.getElementById('btnS').innerText = 'Salvar';
    this.testeBtn = 0;
  }
}
var novaOperacao = new SoulCoin();

///////////////////////////////////////////// FIM SCRIPT POO /////////////////////////////////////

/////////////////////////////////////////PÁGINA CADASTRO

// ////////////////////////////////////////// COMEÇO - SCRIPT FORM CADASTRO

///CONSUMIR A API
//função que sera chamada no html com o onblur, quando sair daquele elemento que executa a função

//apresentar os resultados da api nos input
const apresentaDados = resultado => {
  //for in mostra os indices, o of mostra os conteudos
  for (let campo in resultado) {
    if (document.querySelector('#' + campo)) {
      document.querySelector('#' + campo).value = resultado[campo];
      // console.log(campo);
    }
  }
};

//primeiro só um exemplo pra entender o funcionamento
function consultaCep() {
  let cepDigitado = document.getElementById('cep');

  if (cepDigitado.value == '') {
    console.log('cep não digitado');
  } else {
    let cepProcurado = cepDigitado.value.replace('-', '');
    console.log(cepProcurado);
    //por enquanto deixar o https sem o S para fazer funcionar
    fetch(`http://viacep.com.br/ws/${cepProcurado}/json`)
      .then(response => {
        response.json().then(data => console.log(apresentaDados(data)));
      })
      .catch(x => {
        $('#mensagemCaixa').text('CEP inválido');
        $('#caixaAlerta').css('display', 'block');

        $('#botaoOk').click(function () {
          $('#caixaAlerta').css('display', 'none');
          document.fale.cep.focus();
        });
        return false;
      });
  }
}

function validacaoCompleta() {
  let valida = 0;
  //If para verificar se o campo nome do formulário fale está vazio ou com menos de dois caracteres.
  if (document.fale.nome.value.length < 3) {
    $('#mensagemCaixa').text('Nome inválido');
    $('#caixaAlerta').css('display', 'block');

    $('#botaoOk').click(function () {
      console.log('to aqui');
      $('#caixaAlerta').css('display', 'none');
      document.fale.nome.focus();
    });
    //Caixa trazendo a informação de que o campo não foi preenchido corretamente
    //Focus para setar para a caica de texto que não foi preenchida corretamente
    //Sem o return false, entra numa repetição de caixa de alert e perde a função do focus.
    valida = 0;
    return false;
  }

  if (vercpf(document.fale.cpf.value) == false) {
    errors = '1';
    if (errors) {
      $('#mensagemCaixa').text('CPF inválido');
      $('#caixaAlerta').css('display', 'block');
    }
    document.retorno = errors == '';
    //Focus para setar para a caica de texto que não foi preenchida corretamente

    $('#botaoOk').click(function () {
      console.log('to aqui');
      $('#caixaAlerta').css('display', 'none');
      document.fale.cpf.focus();
    });
    //Sem o return false, entra numa repetição de caixa de alert e perde a função do focus.
    valida = 0;
    return false;
  }

  if (verificaDataN() == false) {
    $('#mensagemCaixa').text('Data de Nascimento inválida');
    $('#caixaAlerta').css('display', 'block');

    $('#botaoOk').click(function () {
      $('#caixaAlerta').css('display', 'none');
      document.fale.dataNasc.focus();
    });
    valida = 0;
    return false;
  }

  if (document.fale.email.value.length < 3) {
    $('#mensagemCaixa').text('Email inválido');
    $('#caixaAlerta').css('display', 'block');

    $('#botaoOk').click(function () {
      console.log('to aqui');
      $('#caixaAlerta').css('display', 'none');
      document.fale.email.focus();
    });
    valida = 0;

    return false;
  }

  if (document.fale.mensagem.value.length < 10) {
    $('#mensagemCaixa').text('Mensagem muito curta');
    $('#caixaAlerta').css('display', 'block');

    $('#botaoOk').click(function () {
      console.log('to aqui');
      $('#caixaAlerta').css('display', 'none');
      document.fale.mensagem.focus();
    });
    valida = 0;

    return false;
  }

  if (valida == 0) {
    $('#mensagemCaixa').text(
      'Olá ' +
        document.fale.nome.value +
        ', seu cadastro foi realizado. O email para login é (' +
        document.fale.email.value +
        ') e a sua senha é (' +
        document.fale.cpf.value +
        ').'
    );
    $('#caixaAlerta').css('display', 'block');

    $('#botaoOk').click(function () {
      $('#caixaAlerta').css('display', 'none');
      $('.inputForm').val('');
    });
    return false;
  }
}

function verificaDataN() {
  let valorDigitado = $('#dataNasc').val();

  // **************************************************************
  // *********Criando Substrings da string valordigitao************
  let anoDigitado = '';
  anoDigitado = valorDigitado.substr(0, 4);

  let mesDigitado = '';
  mesDigitado = valorDigitado.substr(5, 2);

  let diaDigitado = '';
  diaDigitado = valorDigitado.substr(8, 2);

  let valorAtual = [anoDigitado, mesDigitado, diaDigitado];
  console.log(valorAtual);

  // **************************************************************
  // *********Criando função para encontrar a idade ***************
  function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
    var d = new Date(),
      ano_atual = d.getFullYear(),
      mes_atual = d.getMonth() + 1,
      dia_atual = d.getDate(),
      ano_aniversario = +ano_aniversario,
      mes_aniversario = +mes_aniversario,
      dia_aniversario = +dia_aniversario,
      quantos_anos = ano_atual - ano_aniversario;

    if (
      mes_atual < mes_aniversario ||
      (mes_atual == mes_aniversario && dia_atual < dia_aniversario)
    ) {
      quantos_anos--;
    }
    return quantos_anos < 0 ? 0 : quantos_anos;
  }
  // **************************************************************
  // *****************Verificador de idade*************************
  let extrair = idade(anoDigitado, mesDigitado, diaDigitado);
  if (extrair < 18 || extrair > 130) {
    return false;
  } else {
    // alert('seu cadastro foi aprovado');
    return true;
  }
}
function vercpf(cpf) {
  if (
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  )
    return false;
  add = 0;
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;
  add = 0;
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
}

/////////////////////////////////////////////FIM - SCRIPT FORM CADASTRO

// *****************Banner de Imagens**************************

let vtBanner = ['img/b1.jpg', 'img/b2.jpg', 'img/b3.jpg', 'img/b4.jpg'];
let max = vtBanner.length - 1;
let i = 0;

$('#btnAnte').text('<');
$('#btnProx').text('>');
$('#banner').css('backgroundImage', 'url(' + vtBanner[0] + ')');

$('#btnAnte').click(function () {
  troca(-1);
});
$('#btnProx').click(function () {
  troca(1);
});

function troca(opr) {
  $('#banner')
    .css('backgroundImage', 'url(' + vtBanner[i] + ')')
    .fadeOut(1000, function () {
      i += opr;
      if (i > max) {
        i = 0;
      } else if (i < 0) {
        i = max;
      }
      $('#banner')
        .css('backgroundImage', 'url(' + vtBanner[i] + ')')
        .fadeIn(1000);
    });
}
setInterval(() => troca(1), 5000);
// ***************** FIM Banner de Imagens**************************

// ********************Conta*************************
$(document).ready(function () {
  $('#botaoConta').click(function () {
    // no seletor p, de parágrafo... mostre e esconda o texto com o toggle.
    $('#apareceLogin').fadeToggle(2000);
  });
});

$('#fecharLogin').click(function () {
  $('#apareceLogin').hide(3000);
});
// ********************FIM Conta*************************
