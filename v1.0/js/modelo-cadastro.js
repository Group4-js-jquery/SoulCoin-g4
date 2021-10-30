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
    console.log("cep não digitado")
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
    $('#apareceLogin').toggle();
  });
});

$('#fecharLogin').click(function () {
  $('#apareceLogin').hide(3000);
});
// ********************FIM Conta*************************
