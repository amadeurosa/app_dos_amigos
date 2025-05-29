
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
      const texto = li.textContent.replace("X", "").trim();
      artistas.push(texto);
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
      e.target.parentElement.remove();
      salvarLista();
    }
  });

  // Criar item
  function adicionarArtistaNaLista(nome) {
    const li = document.createElement("li");
    li.innerHTML = nome + ' <button class="del">X</button>';
    lista.appendChild(li);
  }

  // Ativar sortable
  $("#lista").sortable({
    update: salvarLista,
  });
});
