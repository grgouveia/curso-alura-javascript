var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function() {
  var erro = document.querySelector("#erro-ajax");
  console.log("Buscando pacientes...");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api-pacientes.herokuapp.com/paci1111entes.");
  xhr.addEventListener("load", function() {
    if (xhr.status == 200) {
      erro.classList.add("invisivel");
      var resposta = xhr.responseText;
      var pacientes = JSON.parse(resposta);
      pacientes.forEach(function(paciente){
        adicionaPacienteNaTabela(paciente);
      });
    } else {
      erro.classList.remove("invisivel");
    }
  });
  xhr.send();
});
