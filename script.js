$(function () {
  // Carrega do LocalStorage ao iniciar
  const artistasSalvos = JSON.parse(localStorage.getItem("artistas")) || [];
  artistasSalvos.forEach(artista => {
    $("#lista").append('<li>' + artista + ' <button class="del">X</button></li>');
  });

  $('#lista').sortable({
    update: salvarLista // salva nova ordem
  });

  $("#adicionar").on("click", function () {
    const artista = $("#nome").val().trim();
    if (!artista) return;

    $("#lista").append('<li>' + artista + ' <button class="del">X</button></li>');
    $("#nome").val("");
    salvarLista();
  });

  $("#lista").on("click", ".del", function () {
    $(this).parent().remove();
    salvarLista();
  });

  $("#limpar").on("click", function () {
    $("#lista").empty();
    localStorage.removeItem("artistas");
  });

  // Função para salvar no LocalStorage
  function salvarLista() {
    const artistas = [];
    $("#lista li").each(function () {
      const texto = $(this).clone().children().remove().end().text().trim(); // remove botão X
      artistas.push(texto);
    });
    localStorage.setItem("artistas", JSON.stringify(artistas));
  }
});

$(function () {
  $("#lista").sortable();
  $("#lista").disableSelection();
});
