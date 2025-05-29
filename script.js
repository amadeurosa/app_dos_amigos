document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("lista");
  const nomeInput = document.getElementById("nome");
  const addBtn = document.getElementById("adicionar");
  const limparBtn = document.getElementById("limpar");

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

  function adicionarArtistaNaLista(nome) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.classList.add("texto");
    span.textContent = nome;

    const botao = document.createElement("button");
    botao.classList.add("del");
    botao.textContent = "X";

    // Eventos separados para mobile e desktop
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

    li.appendChild(span);
    li.appendChild(botao);
    lista.appendChild(li);
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

  // Delegação adicional (extra segurança)
  lista.addEventListener("click", function (e) {
    if (e.target.classList.contains("del")) {
      e.target.parentElement.remove();
      salvarLista();
    }
  });

  // Carregar artistas salvos
  const artistasSalvos = JSON.parse(localStorage.getItem("artistas")) || [];
  artistasSalvos.forEach((artista) => adicionarArtistaNaLista(artista));

  // Ativar ordenação
  $("#lista").sortable({
    update: salvarLista,
  });
});

