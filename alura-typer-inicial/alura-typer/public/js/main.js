var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    atualizaPlacar();

    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });

    $(".tooltip").tooltipster({
        trigger: "custom"
    });

    $("#botao-placar").click(mostraPlacar);
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase").text(numPalavras);
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();
        var qtdCaracteres = conteudo.length;
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-caracteres").text(qtdCaracteres);
        $("#contador-palavras").text(qtdPalavras);
    });
}

function inicializaCronometro() {
    campo.one("focus", function() {
        var tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                $("#botao-reiniciar").attr("disabled", false);
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.toggleClass("campo-desativado");
                inserePlacar(); 
            }
        }, 1000);
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    campo.toggleClass("campo-desativado");
    campo. removeClass("borda-verde");
    campo.removeClass("borda-vermelha");

    inicializaCronometro();
}

function inicializaMarcadores() {
    campo.on("input", function(){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        var ehCorreto = (digitado == comparavel);

        campo.toggleClass("borda-verde", ehCorreto);
        campo.toggleClass("borda-vermelha", !ehCorreto);
    });
}

