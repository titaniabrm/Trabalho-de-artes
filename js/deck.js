/* =========================================================
   DECK — motor da apresentação: montagem, navegação,
   teclado, mouse, toque, progresso e sincronia com a URL
   ========================================================= */

(function () {
  "use strict";

  var FX = window.APP_EFFECTS;
  var SLIDES = window.APP_SLIDES;

  var deck, hud, nav, prevBtn, nextBtn, dotsList, progressFill, progressBar,
      counterCurrent, counterTotal, keyhint, scrollcue, liveRegion;

  var elements = [];
  var current = 0;
  var cleanupTimer = null;
  var CLEANUP_MS = 900;

  /* -------------------------------------------------------
     Montagem
     ------------------------------------------------------- */
  function mount() {
    deck = document.getElementById("deck");
    hud = document.getElementById("hud");
    nav = document.getElementById("nav");
    prevBtn = document.getElementById("prevBtn");
    nextBtn = document.getElementById("nextBtn");
    dotsList = document.getElementById("dots");
    progressFill = document.getElementById("deckProgressFill");
    progressBar = document.getElementById("deckProgress");
    counterCurrent = document.getElementById("counterCurrent");
    counterTotal = document.getElementById("counterTotal");
    keyhint = document.getElementById("keyhint");
    scrollcue = document.getElementById("scrollcue");
    liveRegion = document.getElementById("liveRegion");

    var deckHtml = "";
    var dotsHtml = "";

    SLIDES.forEach(function (slide, i) {
      deckHtml +=
        '<section class="slide slide--' + slide.id + '" id="slide-' + slide.id + '" ' +
        'role="group" aria-roledescription="slide" aria-label="' +
        (i + 1) + " de " + SLIDES.length + " — " + slide.label + '">' +
        slide.render() +
        "</section>";

      dotsHtml +=
        '<li class="dots__item"><button class="dots__btn" type="button" data-index="' + i + '" ' +
        'aria-label="Slide ' + (i + 1) + ": " + slide.label + '"></button></li>';
    });

    deck.innerHTML = deckHtml;
    dotsList.innerHTML = dotsHtml;

    elements = Array.prototype.slice.call(deck.querySelectorAll(".slide"));
    counterTotal.textContent = SLIDES.length;

    FX.splitText(deck);
    FX.initPointerFx(deck);

    bindEvents();

    var start = indexFromHash();
    activate(start, "next", true);
  }

  /* -------------------------------------------------------
     Navegação
     ------------------------------------------------------- */
  function activate(index, dir, immediate) {
    index = Math.max(0, Math.min(index, elements.length - 1));
    if (!immediate && index === current) return;

    var from = elements[current];
    var to = elements[index];

    deck.dataset.dir = dir || (index > current ? "next" : "prev");

    // Navegação rápida: encerra na hora qualquer saída ainda pendente.
    if (cleanupTimer) { clearTimeout(cleanupTimer); cleanupTimer = null; }
    elements.forEach(function (el) {
      if (el === from || el === to) return;
      if (el.classList.contains("is-leaving") || el.classList.contains("is-active")) {
        el.classList.remove("is-leaving", "is-active");
        FX.resetSlide(el);
      }
    });

    if (from && from !== to) {
      from.classList.remove("is-active");
      from.classList.add("is-leaving");
      cleanupTimer = setTimeout(function () {
        from.classList.remove("is-leaving");
        FX.resetSlide(from);
        cleanupTimer = null;
      }, CLEANUP_MS);
    }

    // A narração pertence ao slide dela: sair da página cala a voz.
    if (from !== to && window.APP_NARRATOR) window.APP_NARRATOR.stop(true);

    current = index;
    to.classList.remove("is-leaving");
    to.classList.add("is-active");
    to.scrollTop = 0;
    FX.revealSlide(to);

    syncChrome();
    syncHash();
    syncScrollCue();
  }

  /** Mostra o aviso de rolagem enquanto houver conteúdo abaixo. */
  function syncScrollCue() {
    var s = elements[current];
    if (!s || !scrollcue) return;
    var hasMore = s.scrollHeight - s.clientHeight - s.scrollTop > 24;
    scrollcue.classList.toggle("is-visible", hasMore);
  }

  function next() { activate(current + 1, "next"); }
  function prev() { activate(current - 1, "prev"); }

  /** Leva o usuário até o card do player, esteja ele no slide atual ou não. */
  function gotoPlayer() {
    var card = document.getElementById("playerCard");
    if (!card) return;

    var slide = card.closest(".slide");
    if (slide && slide !== elements[current]) {
      activate(elements.indexOf(slide), "next");
    }
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* -------------------------------------------------------
     Interface auxiliar (HUD, dots, progresso)
     ------------------------------------------------------- */
  function syncChrome() {
    var total = elements.length;
    var pct = total > 1 ? (current / (total - 1)) * 100 : 100;

    progressFill.style.width = pct.toFixed(2) + "%";
    progressBar.setAttribute("aria-valuenow", Math.round(pct));
    counterCurrent.textContent = current + 1;

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;

    Array.prototype.forEach.call(dotsList.querySelectorAll(".dots__btn"), function (btn, i) {
      btn.setAttribute("aria-current", i === current ? "true" : "false");
    });

    // A capa fica limpa: HUD e navegação só aparecem a partir do slide 2.
    var onCover = current === 0;
    hud.classList.toggle("is-hidden", onCover);
    nav.classList.toggle("is-hidden", onCover);
    keyhint.classList.toggle("is-visible", onCover);

    document.title =
      (onCover ? "" : SLIDES[current].label + " · ") +
      window.APP_DATA.track.title + " — " + window.APP_DATA.track.artist;

    if (liveRegion) {
      liveRegion.textContent =
        "Slide " + (current + 1) + " de " + total + ": " + SLIDES[current].label;
    }
  }

  function syncHash() {
    var id = SLIDES[current].id;
    // Alguns contextos (file://, sandboxes) bloqueiam replaceState:
    // a apresentação continua funcionando mesmo sem o link direto.
    try {
      history.replaceState(null, "", "#" + id);
    } catch (err) {
      try { location.hash = id; } catch (e) {}
    }
  }

  function indexFromHash() {
    var id = (location.hash || "").replace("#", "");
    for (var i = 0; i < SLIDES.length; i++) {
      if (SLIDES[i].id === id) return i;
    }
    return 0;
  }

  function indexOfId(id) {
    for (var i = 0; i < SLIDES.length; i++) {
      if (SLIDES[i].id === id) return i;
    }
    return 0;
  }

  /* -------------------------------------------------------
     Eventos
     ------------------------------------------------------- */
  function bindEvents() {
    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    dotsList.addEventListener("click", function (e) {
      var btn = e.target.closest(".dots__btn");
      if (btn) activate(Number(btn.dataset.index), Number(btn.dataset.index) > current ? "next" : "prev");
    });

    // Botões de ação dentro dos slides
    deck.addEventListener("click", function (e) {
      var actionEl = e.target.closest("[data-action]");
      if (!actionEl) return;

      var action = actionEl.dataset.action;
      if (action === "start") next();
      if (action === "restart") activate(0, "prev");
      if (action === "goto-player") gotoPlayer();
    });

    // Clique em área vazia do slide avança (comportamento de apresentação).
    // Só conta o fundo em si — cliques em texto, cards ou links são preservados.
    deck.addEventListener("click", function (e) {
      var slide = elements[current];
      if (e.target !== slide && e.target !== slide.firstElementChild) return;
      if (window.getSelection && String(window.getSelection())) return;
      next();
    });

    // Teclado
    document.addEventListener("keydown", function (e) {
      var t = e.target;
      if (t && t.matches && t.matches("input, textarea, select, [contenteditable]")) return;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          next(); e.preventDefault(); break;
        case "ArrowLeft":
        case "PageUp":
          prev(); e.preventDefault(); break;
        case "Home":
          activate(0, "prev"); e.preventDefault(); break;
        case "End":
          activate(elements.length - 1, "next"); e.preventDefault(); break;
        case " ":
          if (e.target === document.body) { next(); e.preventDefault(); }
          break;
      }
    });

    // Roda do mouse: só navega quando o slide não precisa rolar
    var wheelLock = 0;
    deck.addEventListener("wheel", function (e) {
      var slide = elements[current];
      if (slide.scrollHeight > slide.clientHeight + 4) return; // deixa rolar
      if (Math.abs(e.deltaY) < 12) return;

      var t = Date.now();
      if (t - wheelLock < 700) return;
      wheelLock = t;

      e.deltaY > 0 ? next() : prev();
    }, { passive: true });

    // Toque: swipe horizontal
    var sx = 0, sy = 0, tracking = false;
    deck.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      tracking = true;
    }, { passive: true });

    deck.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      var dx = e.changedTouches[0].clientX - sx;
      var dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      dx < 0 ? next() : prev();
    }, { passive: true });

    deck.addEventListener("scroll", syncScrollCue, true);
    window.addEventListener("resize", syncScrollCue);

    window.addEventListener("hashchange", function () {
      var i = indexFromHash();
      if (i !== current) activate(i, i > current ? "next" : "prev");
    });
  }

  window.APP_DECK = {
    mount: mount,
    next: next,
    prev: prev,
    goTo: function (id) { activate(indexOfId(id), "next"); },
    get index() { return current; }
  };
})();
