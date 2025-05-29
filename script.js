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
      const texto = li.querySelector(".texto").textContent.trim();
      artistas.push(texto);
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

  lista.addEventListener("click", function (e) {
    if (e.target.classList.contains("del")) {
      e.target.parentElement.remove();
      salvarLista();
    }
  });

  function adicionarArtistaNaLista(nome) {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.className = "texto";
    texto.textContent = nome;

    const botao = document.createElement("button");
    botao.className = "del";
    botao.textContent = "X";

    li.appendChild(texto);
    li.appendChild(botao);

    lista.appendChild(li);
  }

  $("#lista").sortable({
    update: salvarLista,
  });
});

