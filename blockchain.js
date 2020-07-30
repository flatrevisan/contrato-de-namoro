function identifyLovers() {
  
  if (typeof contratoComSignatario === "undefined") {
    alert("Você não está conectado ao Ethereum. Verifique seu Metamask");
    return;
  }
  contratoComSignatario
  .identifyLovers($("#_loversInvolved").val(), $("#_party").val(), $("#_name").val())
  .then((transacao) => {
    $("#descricaoStatusTransacoes").html("Transação enviada. Aguarde pela mineração...");
    $("#statusTransacoes").toggle();
    transacao
      .wait()
      .then((resultado) => {
        console.log("identifyLovers- o resultado foi ", resultado);
        if (resultado.status === 1) {
          $("#descricaoStatusTransacoes").html("Transação executada.");
        } else {
          $("#descricaoStatusTransacoes").html("Houve um erro na execução da transação no Ethereum.");
        }
      })
      .catch((err) => {
        console.error("commitment - a transação foi minerada e houve um erro. Veja abaixo");
        console.error(err);
        $("#descricaoStatusTransacoes").html("Algo saiu errado: " + err.message);
      });
  })
  .catch((err) => {
    console.error("commitment - tx só foi enviada");
    console.error(err);
    $("#descricaoStatusTransacoes").html("Algo saiu errado antes de enviar ao Ethereum: " + err.message);
  });
}

function commitment() {
  
    if (typeof contratoComSignatario === "undefined") {
      alert("Você não está conectado ao Ethereum. Verifique seu Metamask");
      return;
    }

    var additionalSettings = {
        value: ethers.utils.parseUnits('500', 'wei')
    };

    contratoComSignatario
    .commitment($("#_loverId").val(), $("#_consent1").val(), $("#_consent2").val(), additionalSettings)
    .then((transacao) => {
      $("#descricaoStatusTransacoes").html("Transação enviada. Aguarde pela mineração...");
      $("#statusTransacoes").toggle();
      transacao
        .wait()
        .then((resultado) => {
          console.log("commitment - o resultado foi ", resultado);
          if (resultado.status === 1) {
            $("#descricaoStatusTransacoes").html("Transação executada.");
          } else {
            $("#descricaoStatusTransacoes").html("Houve um erro na execução da transação no Ethereum.");
          }
        })
        .catch((err) => {
          console.error("commitment - a transação foi minerada e houve um erro. Veja abaixo");
          console.error(err);
          $("#descricaoStatusTransacoes").html("Algo saiu errado: " + err.message);
        });
    })
    .catch((err) => {
      console.error("commitment - tx só foi enviada");
      console.error(err);
      $("#descricaoStatusTransacoes").html("Algo saiu errado antes de enviar ao Ethereum: " + err.message);
    });
  }