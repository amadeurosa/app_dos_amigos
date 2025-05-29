document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("lista");
  const nomeInput = document.getElementById("nome");
  const addBtn = document.getElementById("adicionar");
  const limparBtn = document.getElementById("limpar");

  // Carregar do localStorage
  const artistasSalvos = JSON.parse(localStorage.getItem("artistas")) || [];
  artistasSalvos.forEach((artista) => {
    adicionarArtistaNaLista(artista);
  });

  // Salvar lista no localStorage
  function salvarLista() {
    const artistas = [];
    lista.querySelectorAll("li").forEach((li) => {
      const span = li.querySelector("span");
      if (span) {
        artistas.push(span.textContent.trim());
      }
    });
    localStorage.setItem("artistas", JSON.stringify(artistas));
  }

  // Adicionar novo artista
  addBtn.addEventListener("click", function () {
    const nome = nomeInput.value.trim();
    if (!nome) return;
    adicionarArtistaNaLista(nome);
    nomeInput.value = "";
    salvarLista();
  });

  // Limpar lista
  limparBtn.addEventListener("click", function () {
    lista.innerHTML = "";
    localStorage.removeItem("artistas");
  });

  // Delegação para botão X
  lista.addEventListener("click", function (e) {
    if (e.target.classList.contains("del")) {
      e.stopPropagation();
      e.preventDefault();
      e.target.parentElement.remove();
      salvarLista();
    }
  });

  // Criar item
  function adicionarArtistaNaLista(nome) {
    const li = document.createElement("li");
    li.innerHTML = '<span class="texto">' + nome + '</span><button class="del">X</button>';
    lista.appendChild(li);
  }

  // Ativar sortable (com touch support)
  $("#lista").sortable({
    update: salvarLista,
  });
});
