document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("lista");
  const nomeInput = document.getElementById("nome");
  const addBtn = document.getElementById("adicionar");
  const limparBtn = document.getElementById("limpar");

  const artistasSalvos = JSON.parse(localStorage.getItem("artistas")) || [];
  artistasSalvos.forEach((artista) => {
    adicionarArtistaNaLista(artista);
  });

  function salvarLista() {
    const artistas = [];
    lista.querySelectorAll("li").forEach((li) => {
      const texto = li.querySelector(".texto");
      if (texto) {
        artistas.push(texto.textContent.trim());
      }
    });
    localStorage.setItem("artistas", JSON.stringify(artistas));
  }

  addBtn.addEventListener("click", function () {
    const nome = nomeInput.value.trim();
    if (!nome) return;
    adicionarArtistaNaLista(nome);
    nomeInput.value = "";
    salvarLista();
  });

  limparBtn.addEventListener("click", function () {
    lista.innerHTML = "";
    localStorage.removeItem("artistas");
  });

  function adicionarArtistaNaLista(nome) {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.className = "texto";
    texto.textContent = nome;

    const botao = document.createElement("button");
    botao.className = "del";
    botao.textContent = "X";

    botao.addEventListener("click", function (e) {
      e.stopPropagation();
      li.remove();
      salvarLista();
    });

    botao.addEventListener("touchend", function (e) {
      e.stopPropagation();
      li.remove();
      salvarLista();
    });

    li.appendChild(texto);
    li.appendChild(botao);
    lista.appendChild(li);
  }

  $("#lista").sortable({
    update: salvarLista,
  });
});
