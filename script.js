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
      const texto = li.querySelector(".texto").textContent.trim();
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

  // Criar item com botão de remoção
  function adicionarArtistaNaLista(nome) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "texto";
    span.textContent = nome;

    const botao = document.createElement("button");
    botao.className = "del";
    botao.textContent = "X";

    function removerItemSeguro() {
      if (botao.disabled) return;
      botao.disabled = true;
      li.remove();
      salvarLista();
      setTimeout(() => {
        botao.disabled = false;
      }, 300);
    }

    botao.addEventListener("click", function (e) {
      e.stopPropagation();
      removerItemSeguro();
    });

    botao.addEventListener("touchend", function (e) {
      e.stopPropagation();
      removerItemSeguro();
    });

    li.appendChild(span);
    li.appendChild(botao);
    lista.appendChild(li);
  }

  // Ativar arrastar com jQuery UI
  $("#lista").sortable({
    update: salvarLista,
  });
});

