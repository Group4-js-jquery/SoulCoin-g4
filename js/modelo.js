/*******************************************CPF****************************************************/
function VerificaCPF() {
    if (vercpf(document.frmcpf.cpf.value)) { document.frmcpf.submit(); } else {
        errors = "1"; if (errors) alert('CPF NÃO VÁLIDO');
        document.retorno = (errors == '');
    }
}
function vercpf(cpf) {
    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
        return false;
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    alert('O CPF INFORMADO É VÁLIDO.'); return true;
}

/*******************************************CEP****************************************************/

const apresentaDados = (resultado) => {
    for(let campo in resultado){
        if(document.querySelector("#" + campo)){
            console.log(campo);
            document.querySelector("#" + campo).value = resultado[campo];
        }
    }
}

function consultaCep() {
    let cepDigitado = document.getElementById("cep");

    if (cepDigitado.value == "") {
        cepDigitado.style.border = "1px solid red";
    } else {
        let cepProcurado = cepDigitado.value.replace("-", "");
        console.log(cepProcurado);

        fetch(`http://viacep.com.br/ws/${cepProcurado}/json/`)
            .then(response => {
                response.json()
                .then(data => console.log(apresentaDados(data)))
            })
            .catch(x => console.log ("CEP não localizado!"))
    }

}

/*******************************************dataNascimento****************************************************/
function verificaNasc(){
    let valorDigitado = $("#dataNasc").val();

    // **************************************************************
    // *********Criando Substrings da string valordigitao************
    let anoDigitado = "";
    anoDigitado = valorDigitado.substr(0,4);
    
    let mesDigitado = "";
    mesDigitado = valorDigitado.substr(5,2);
    
    let diaDigitado = "";
    diaDigitado = valorDigitado.substr(8,2);

    let valorAtual=[anoDigitado,mesDigitado,diaDigitado];
    console.log(valorAtual)

    // **************************************************************
    // *********Criando função para encontrar a idade ***************
    function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
        var d = new Date,
            ano_atual = d.getFullYear(),
            mes_atual = d.getMonth() + 1,
            dia_atual = d.getDate(),

            ano_aniversario = +ano_aniversario,
            mes_aniversario = +mes_aniversario,
            dia_aniversario = +dia_aniversario,

            quantos_anos = ano_atual - ano_aniversario;

        if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
            quantos_anos--;
        }
        return quantos_anos < 0 ? 0 : quantos_anos;
    }
    // **************************************************************
    // *****************Verificador de idade*************************
    let extrair=(idade(anoDigitado, mesDigitado, diaDigitado))
    if(extrair<18 || extrair>130){
        alert("você não está apto a realizar o cadastro")
    }else{
        alert("seu cadastro foi aprovado")
    }
    console.log(idade(anoDigitado, mesDigitado, diaDigitado)); 
}  

// *****************Validação**************************
function validacaoCompleta(){
    verificaNasc();

    //If para verificar se o campo nome do formulário fale está vazio ou com menos de dois caracteres.
    if (document.frmcpf.nome.value.length < 3) {
        //Caixa trazendo a informação de que o campo não foi preenchido corretamente
        alert("Preencha campo nome corretamente!");
        //Focus para setar para a caica de texto que não foi preenchida corretamente
        document.frmcpf.nome.focus();
        //Sem o return false, entra numa repetição de caixa de alert e perde a função do focus.
        return false;
    }

    if (document.frmcpf.email.value == "" || document.frmcpf.email.value.length < 3) {
        alert("Preencha campo e-mail corretamente!");
        document.frmcpf.email.focus();
        return false;
    }

    if (document.frmcpf.assunto.value == "" || document.frmcpf.assunto.value.length < 3) {
        alert("Preencha campo assunto corretamente!");
        document.frmcpf.assunto.focus();
        return false;
    }

    if (document.frmcpf.mensagem.value =="" || document.frmcpf.mensagem.value.length < 10){
        alert("Prencha campo menssagem corrtamente! Use caracteres com bom senso. Excesso de espaços em branco não serão permitidos.");
        document.frmcpf.mensagem.focus();
        return false;
    }

    {
        alert("Cadastro enviado com sucesso!");
    }
}


// *****************Banner de Imagens**************************

let vtBanner = ["img/b1.jpg", "img/b2.jpg", "img/b3.jpg", "img/b4.jpg"];
let max = vtBanner.length - 1;
let i = 0;

$("#btnAnte").text("<");
$("#btnProx").text(">");
$("#banner").css("backgroundImage", "url(" + vtBanner[0] + ")");

$("#btnAnte").click(function () {
    troca(-1);

})
$("#btnProx").click(function () {
    troca(1);
})


function troca(opr) {
    $("#banner").css("backgroundImage", "url(" + vtBanner[i] + ")").fadeOut(1000,
        function () {
            i += opr;
            if (i > max) {
                i = 0;
            } else if (i < 0) {
                i = max;
            }
    $("#banner").css("backgroundImage", "url(" + vtBanner[i] + ")").fadeIn(1000);
});
}
setInterval(() => troca(1), 5000)




