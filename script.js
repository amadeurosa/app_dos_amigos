$(function () {
  const artistasSalvos = JSON.parse(localStorage.getItem("artistas")) || [];
  artistasSalvos.forEach(artista => {
    $("#lista").append('<li>' + artista + ' <button class="del">X</button></li>');
  });

  $("#lista").sortable({
    update: salvarLista
  });

  $("#lista").disableSelection();

  $("#adicionar").on("click", function () {
    const artista = $("#nome").val().trim();
    if (!artista) return;

    $("#lista").append('<li>' + artista + ' <button class="del">X</button></li>');
    $("#nome").val("");
    salvarLista();
  });

  $(document).on("click", ".del", function () {
    $(this).parent().remove();
    salvarLista();
  });

  $("#limpar").on("click", function () {
    $("#lista").empty();
    localStorage.removeItem("artistas");
  });

  function salvarLista() {
    const artistas = [];
    $("#lista li").each(function () {
      const texto = $(this).clone().children().remove().end().text().trim();
      artistas.push(texto);
    });
    localStorage.setItem("artistas", JSON.stringify(artistas));
  }
});
