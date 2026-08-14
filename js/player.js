/* =========================================================
   PLAYER — controles próprios ligados ao player oficial do
   Spotify (IFrame API). Nenhum áudio é hospedado aqui.

   Modo A (padrão): Spotify IFrame API
     · play / pause / avançar / retroceder / barra de progresso reais
     · volume é gerenciado pelo próprio Spotify (a API não o expõe)

   Modo B (opcional): arquivo local em APP_DATA.track.localAudio
     · todos os controles funcionam, inclusive volume
   ========================================================= */

(function () {
  "use strict";

  var T = window.APP_DATA.track;

  var api = null;         // objeto entregue pela IFrame API do Spotify
  var controller = null;  // controlador do embed
  var audio = null;       // <audio> local, quando configurado
  var mode = null;        // "spotify" | "local" | "fallback"
  var bound = false;

  var state = { position: 0, duration: 0, paused: true, stamp: 0 };
  var previewNoticed = false;
  var ui = {};
  var raf = null;

  /* -------------------------------------------------------
     Ponto de entrada da API oficial do Spotify
     ------------------------------------------------------- */
  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    api = IFrameAPI;
    createController();
  };

  /* -------------------------------------------------------
     Inicialização (chamada por main.js após montar os slides)
     ------------------------------------------------------- */
  function init() {
    cacheUI();
    if (!ui.play) return;
    bindUI();

    if (T.localAudio) {
      startLocal();
    } else {
      createController();
      // Se a API não responder, degrada para o embed simples.
      setTimeout(function () {
        if (mode !== "spotify") setFallback();
      }, 7000);
    }
  }

  function cacheUI() {
    ui.card = document.querySelector(".player");
    ui.play = document.getElementById("playerPlay");
    ui.back = document.getElementById("playerBack");
    ui.fwd = document.getElementById("playerFwd");
    ui.bar = document.getElementById("playerBar");
    ui.fill = document.getElementById("playerFill");
    ui.current = document.getElementById("playerCurrent");
    ui.total = document.getElementById("playerDuration");
    ui.status = document.getElementById("playerStatus");
    ui.eq = document.getElementById("playerEq");
    ui.volume = document.getElementById("playerVolume");
    ui.volumeWrap = document.getElementById("playerVolumeWrap");
  }

  function bindUI() {
    if (bound) return;
    bound = true;

    ui.play.addEventListener("click", togglePlay);
    ui.back.addEventListener("click", function () { nudge(-15); });
    ui.fwd.addEventListener("click", function () { nudge(15); });

    ui.bar.addEventListener("click", function (e) {
      var r = ui.bar.getBoundingClientRect();
      seekRatio((e.clientX - r.left) / r.width);
    });

    ui.bar.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { nudge(5); e.preventDefault(); e.stopPropagation(); }
      if (e.key === "ArrowLeft")  { nudge(-5); e.preventDefault(); e.stopPropagation(); }
      if (e.key === " " || e.key === "Enter") { togglePlay(); e.preventDefault(); }
    });

    ui.volume.addEventListener("input", function () {
      if (mode === "local" && audio) audio.volume = ui.volume.value / 100;
    });

    // Sem arquivo local, o volume pertence ao Spotify.
    if (!T.localAudio) {
      ui.volume.disabled = true;
      ui.volumeWrap.classList.add("is-locked");
      ui.volumeWrap.title = "O volume desta faixa é controlado pelo player do Spotify.";
    }
  }

  /* -------------------------------------------------------
     Modo A — Spotify IFrame API
     ------------------------------------------------------- */
  function createController() {
    var host = document.getElementById("spotify-embed");
    if (!api || !host || controller || T.localAudio) return;

    api.createController(
      host,
      { uri: "spotify:track:" + T.spotifyTrackId, width: "100%", height: "152" },
      function (ctrl) {
        controller = ctrl;
        mode = "spotify";

        ctrl.addListener("ready", function () {
          // Não sobrescreve o aviso de prévia, que é mais específico.
          if (!previewNoticed) setStatus("Player oficial conectado. Toque para ouvir.");
          if (ui.card) ui.card.classList.add("is-live");
        });

        ctrl.addListener("playback_update", function (e) {
          var data = e && e.data ? e.data : {};
          state.duration = data.duration || state.duration;
          state.position = data.position || 0;
          state.paused = data.isPaused !== false;
          state.stamp = now();
          announcePreview();
          syncPlayingClass();
          if (!raf) raf = requestAnimationFrame(tick);
          render();
        });

        ctrl.addListener("account_error", function () {
          setStatus("Faça login no Spotify neste navegador para ouvir a faixa completa.");
        });
      }
    );
  }

  /* -------------------------------------------------------
     Modo B — arquivo de áudio local (opcional)
     ------------------------------------------------------- */
  function startLocal() {
    audio = new Audio(T.localAudio);
    audio.preload = "metadata";
    audio.volume = ui.volume.value / 100;
    mode = "local";

    audio.addEventListener("loadedmetadata", function () {
      state.duration = audio.duration * 1000;
      setStatus("Áudio local carregado.");
      if (ui.card) ui.card.classList.add("is-live");
      render();
    });
    audio.addEventListener("timeupdate", function () {
      state.position = audio.currentTime * 1000;
      state.stamp = now();
      render();
    });
    audio.addEventListener("play", function () { state.paused = false; syncPlayingClass(); });
    audio.addEventListener("pause", function () { state.paused = true; syncPlayingClass(); });
    audio.addEventListener("ended", function () { state.paused = true; syncPlayingClass(); });
    audio.addEventListener("error", function () {
      mode = null;
      audio = null;
      setStatus("Não foi possível carregar o áudio local. Usando o player do Spotify.");
      createController();
    });
  }

  /* -------------------------------------------------------
     Ações
     ------------------------------------------------------- */
  function togglePlay() {
    // A narração e a música não podem disputar o mesmo ouvido.
    if (window.APP_NARRATOR) window.APP_NARRATOR.stop(true);

    if (mode === "local" && audio) {
      audio.paused ? audio.play() : audio.pause();
      return;
    }
    if (controller) {
      controller.togglePlay();
      return;
    }
    // Sem controlador disponível: abre a faixa oficialmente.
    window.open(T.spotifyUrl, "_blank", "noopener");
  }

  function nudge(seconds) {
    var target = clamp((displayPosition() + seconds * 1000) / 1000, 0, state.duration / 1000 || 0);
    applySeek(target);
  }

  function seekRatio(ratio) {
    if (!state.duration) return;
    applySeek(clamp(ratio, 0, 1) * (state.duration / 1000));
  }

  function applySeek(seconds) {
    if (mode === "local" && audio) {
      audio.currentTime = seconds;
      return;
    }
    if (controller) {
      controller.seek(seconds);
      state.position = seconds * 1000;
      state.stamp = now();
      render();
    }
  }

  /** Pausa a reprodução (usado ao reiniciar a apresentação). */
  function pause() {
    if (mode === "local" && audio) { audio.pause(); return; }
    if (controller) controller.pause();
  }

  /* -------------------------------------------------------
     Render
     ------------------------------------------------------- */
  function displayPosition() {
    if (state.paused) return state.position;
    return Math.min(state.position + (now() - state.stamp), state.duration || Infinity);
  }

  function tick() {
    render();
    raf = state.paused ? null : requestAnimationFrame(tick);
  }

  function render() {
    if (!ui.fill) return;
    var pos = displayPosition();
    var pct = state.duration ? clamp(pos / state.duration, 0, 1) * 100 : 0;

    ui.fill.style.width = pct.toFixed(2) + "%";
    ui.bar.setAttribute("aria-valuenow", Math.round(pct));
    ui.current.textContent = fmt(pos);
    if (state.duration) ui.total.textContent = fmt(state.duration);
  }

  function syncPlayingClass() {
    var playing = !state.paused;
    if (ui.card) ui.card.classList.toggle("is-playing", playing);
    if (ui.eq) ui.eq.classList.toggle("is-playing", playing);
    ui.play.setAttribute("aria-label", playing ? "Pausar" : "Reproduzir");
    if (playing && !raf) raf = requestAnimationFrame(tick);
  }

  /** Sem login no Spotify, o embed entrega só uma prévia curta. */
  function announcePreview() {
    if (mode !== "spotify" || !state.duration || previewNoticed) return;
    previewNoticed = true;
    if (state.duration < 120000) {
      setStatus("Prévia de " + fmt(state.duration) + ". Entre na sua conta Spotify neste navegador para ouvir a faixa completa (" + T.duration + ").");
    } else {
      setStatus("Tocando a faixa completa pelo Spotify.");
    }
  }

  function setFallback() {
    if (mode === "spotify" || mode === "local") return;
    mode = "fallback";
    if (ui.card) ui.card.classList.add("is-fallback");
    setStatus("Use o player oficial abaixo ou abra a faixa diretamente no Spotify.");
  }

  function setStatus(text) {
    if (ui.status) ui.status.textContent = text;
  }

  /* -------------------------------------------------------
     Utilitários
     ------------------------------------------------------- */
  function fmt(ms) {
    var total = Math.max(0, Math.floor((ms || 0) / 1000));
    var m = Math.floor(total / 60);
    var s = total % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
  function now() { return Date.now(); }

  window.APP_PLAYER = { init: init, pause: pause, toggle: togglePlay };
})();
