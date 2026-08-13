/* =========================================================
   MAIN — inicialização da aplicação
   ========================================================= */

(function () {
  "use strict";

  function boot() {
    // 1. Fundo cinematográfico
    window.APP_EFFECTS.initParticles(document.getElementById("particles"));
    window.APP_EFFECTS.initParallax();

    // 2. Monta e ativa os slides
    window.APP_DECK.mount();

    // 3. Liga o player ao embed oficial do Spotify
    window.APP_PLAYER.init();

    document.body.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
