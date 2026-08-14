/* =========================================================
   SLIDES — cada slide é uma função que devolve o seu HTML.
   O conteúdo vem sempre de js/data.js.

   1. capa    — arte, título e chamada
   2. musica  — ficha, contexto, significado, análise e momentos
   3. ouvir   — player oficial e encerramento
   ========================================================= */

(function () {
  "use strict";

  var D = window.APP_DATA;
  var T = D.track;

  /* ---------- Utilitários de template ---------- */

  /** Atraso escalonado para a animação de entrada. */
  function d(i, step, base) {
    var delay = (base || 0) + i * (step || 0.08);
    return ' style="--d:' + delay.toFixed(2) + 's"';
  }

  /**
   * Capa da faixa, com troca automática para a fonte alternativa se a
   * principal falhar. Carrega sempre (não é lazy): são três usos da mesma
   * URL, ou seja, uma única requisição — e uma delas é a imagem de destaque.
   */
  function coverImg(cls, alt) {
    return (
      '<img class="' + cls + '" src="' + T.cover + '" alt="' + alt + '" ' +
      'width="640" height="640" loading="eager" fetchpriority="high" decoding="async" ' +
      "onerror=\"this.onerror=null;this.src='" + T.coverFallback + "'\">"
    );
  }

  /** Cabeçalho padrão dos slides internos. */
  function header(cfg) {
    return (
      '<header class="slide-head">' +
      '<span class="eyebrow" data-reveal="fade">' + cfg.eyebrow + "</span>" +
      '<h2 class="slide-title" data-reveal data-split>' + cfg.title + "</h2>" +
      (cfg.lede ? '<p class="slide-lede" data-reveal' + d(1) + ">" + cfg.lede + "</p>" : "") +
      "</header>"
    );
  }

  /** Subtítulo de bloco dentro de um slide longo. */
  function subhead(text, delay) {
    return '<h3 class="subhead" data-reveal="fade"' + d(delay || 0) + ">" + text + "</h3>";
  }

  /* =========================================================
     SLIDE 1 — CAPA
     ========================================================= */
  function renderCover() {
    var c = D.cover;
    var tags = c.tags
      .map(function (t, i) {
        return '<li class="tag" data-reveal="zoom"' + d(i, 0.09, 0.85) + ">" + t + "</li>";
      })
      .join("");

    return (
      '<div class="slide__inner cover">' +
        '<div class="cover__art" data-reveal="zoom" data-tilt>' +
          '<div class="cover__frame">' +
            coverImg("cover__img", "Capa de " + T.title + ", de " + T.artist) +
            '<span class="cover__shine" aria-hidden="true"></span>' +
          "</div>" +
          '<span class="cover__halo" aria-hidden="true"></span>' +
          '<span class="cover__disc" aria-hidden="true"></span>' +
        "</div>" +

        '<div class="cover__text">' +
          '<span class="eyebrow" data-reveal="fade">' + c.eyebrow + "</span>" +
          '<h1 class="cover__title" data-reveal data-split>' + T.title + "</h1>" +
          '<p class="cover__artist" data-reveal' + d(1, 0.1, 0.35) + ">" +
            '<span class="cover__by">por</span> ' + T.artist +
          "</p>" +
          '<p class="cover__kicker" data-reveal' + d(2, 0.1, 0.35) + ">" + c.kicker + "</p>" +
          '<ul class="cover__tags">' + tags + "</ul>" +
          '<div class="cover__actions" data-reveal' + d(4, 0.1, 0.5) + ">" +
            '<button class="btn btn--primary btn--lg" data-action="start" type="button">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-14 9V3z"/></svg>' +
              c.cta +
            "</button>" +
            '<a class="btn btn--spotify" href="' + T.spotifyUrl + '" target="_blank" rel="noopener noreferrer">' +
              spotifyIcon() + "Abrir no Spotify" +
            "</a>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  /* =========================================================
     SLIDE 2 — A MÚSICA
     ========================================================= */
  function renderStory() {
    var s = D.story;

    /* --- Ficha técnica --- */
    var facts = s.facts
      .map(function (f, i) {
        return (
          '<li class="fact" data-reveal="zoom"' + d(i, 0.06, 0.2) + ">" +
            '<span class="fact__icon" aria-hidden="true">' + f.icon + "</span>" +
            '<span class="fact__label">' + f.label + "</span>" +
            '<strong class="fact__value">' + f.value + "</strong>" +
          "</li>"
        );
      })
      .join("");

    /* --- Contexto: música e artista --- */
    var context = s.context
      .map(function (b, i) {
        return (
          '<article class="card" data-reveal' + d(i, 0.1, 0.3) + " data-glow>" +
            '<span class="icon-badge" aria-hidden="true">' + b.icon + "</span>" +
            '<h4 class="card__title">' + b.title + "</h4>" +
            '<p class="card__text">' + b.text + "</p>" +
          "</article>"
        );
      })
      .join("");

    var works = s.works
      .map(function (w, i) {
        return (
          '<li class="work" data-reveal="zoom"' + d(i, 0.05, 0.45) + ">" +
            '<span class="work__song">' + w.song + "</span>" +
            '<span class="work__char">' + w.char + "</span>" +
          "</li>"
        );
      })
      .join("");

    /* --- Significado --- */
    var themes = s.themes
      .map(function (t, i) {
        return (
          '<article class="card theme" data-reveal' + d(i, 0.07, 0.25) + " data-glow>" +
            '<span class="icon-badge" aria-hidden="true">' + t.icon + "</span>" +
            '<h4 class="card__title">' + t.title + "</h4>" +
            '<p class="card__text">' + t.text + "</p>" +
          "</article>"
        );
      })
      .join("");

    var feelings = s.feelings
      .map(function (f, i) {
        return '<li class="chip" data-reveal="zoom"' + d(i, 0.06, 0.4) + ">" + f + "</li>";
      })
      .join("");

    /* --- Análise --- */
    var pillars = s.pillars
      .map(function (p, i) {
        return (
          '<article class="card pillar" data-reveal' + d(i, 0.08, 0.2) + " data-glow>" +
            '<span class="icon-badge" aria-hidden="true">' + p.icon + "</span>" +
            '<span class="pillar__label">' + p.label + "</span>" +
            '<h4 class="pillar__value">' + p.value + "</h4>" +
          "</article>"
        );
      })
      .join("");

    var bars = s.emotions
      .map(function (e, i) {
        return (
          '<li class="meter" data-reveal="left"' + d(i, 0.08, 0.3) + ">" +
            '<span class="meter__label">' + e.label + "</span>" +
            '<span class="meter__track">' +
              '<span class="meter__fill" style="--val:' + e.value + '%;--i:' + i + '"></span>' +
            "</span>" +
            '<span class="meter__value">' + e.value + "</span>" +
          "</li>"
        );
      })
      .join("");

    var highlights = s.highlights
      .map(function (h, i) {
        return (
          '<article class="card" data-reveal' + d(i, 0.08, 0.35) + " data-glow>" +
            '<span class="icon-badge" aria-hidden="true">' + h.icon + "</span>" +
            '<h4 class="card__title">' + h.title + "</h4>" +
            '<p class="card__text">' + h.text + "</p>" +
          "</article>"
        );
      })
      .join("");

    /* --- Momentos --- */
    var moments = s.moments
      .map(function (it, i) {
        return (
          '<li class="moment" data-reveal="left"' + d(i, 0.09, 0.25) + ">" +
            '<span class="moment__time">' + it.time + "</span>" +
            '<div class="moment__body card" data-glow>' +
              '<h4 class="moment__title">' + it.title + "</h4>" +
              '<p class="moment__what">' + it.what + "</p>" +
              '<p class="moment__why"><span>Por que importa</span>' + it.why + "</p>" +
            "</div>" +
          "</li>"
        );
      })
      .join("");

    return (
      '<div class="slide__inner stack-lg">' +
        header(s) +

        narrator(s.narration) +

        '<ul class="facts">' + facts + "</ul>" +

        '<section class="block">' +
          '<div class="grid grid--2">' + context + "</div>" +
          '<section class="works" data-reveal' + d(4) + ">" +
            '<h4 class="works__title">Outras faixas do artista</h4>' +
            '<ul class="works__list">' + works + "</ul>" +
          "</section>" +
        "</section>" +

        '<section class="block">' +
          subhead(s.themesTitle, 0) +
          '<div class="grid grid--4">' + themes + "</div>" +
          '<section class="feelings" data-reveal' + d(5) + ">" +
            '<h4 class="feelings__title">' + s.feelingsTitle + "</h4>" +
            '<ul class="chips">' + feelings + "</ul>" +
          "</section>" +
        "</section>" +

        '<section class="block">' +
          subhead(s.analysisTitle, 0) +
          '<div class="grid grid--3">' + pillars + "</div>" +
          '<div class="charts">' +
            '<section class="card chart" data-reveal="left"' + d(2) + ">" +
              '<h4 class="chart__title">Intensidade das emoções</h4>' +
              '<ul class="meters">' + bars + "</ul>" +
            "</section>" +
            '<section class="card chart" data-reveal="right"' + d(3) + ">" +
              '<h4 class="chart__title">' + s.arc.caption + "</h4>" +
              arcChart(s.arc) +
            "</section>" +
          "</div>" +
          '<div class="grid grid--3">' + highlights + "</div>" +
        "</section>" +

        '<section class="block">' +
          subhead(s.momentsTitle, 0) +
          '<p class="block__lede" data-reveal="fade"' + d(1) + ">" + s.momentsLede + "</p>" +
          '<ol class="moments">' + moments + "</ol>" +
          '<div class="moments__foot" data-reveal="fade"' + d(6) + ">" +
            '<p class="note">' + s.disclaimer + "</p>" +
            '<a class="btn btn--ghost" href="' + T.lyricsUrl + '" target="_blank" rel="noopener noreferrer">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 10h16M4 15h10M4 20h7"/></svg>' +
              "Ver a letra oficial" +
            "</a>" +
          "</div>" +
        "</section>" +

        sources(s.sources) +
      "</div>"
    );
  }

  /**
   * Narração por voz sintetizada do navegador (Web Speech API).
   * A transcrição fica visível e destaca a frase que está sendo lida —
   * serve de legenda e mantém o conteúdo acessível sem áudio.
   */
  function narrator(n) {
    var wave = "";
    for (var i = 0; i < 7; i++) wave += '<i style="--i:' + i + '"></i>';

    var lines = n.script
      .map(function (line, i) {
        return (
          '<li class="narrator__line" role="button" tabindex="0" ' +
          'title="Ouvir a partir daqui">' + line + "</li>"
        );
      })
      .join("");

    var rates = [
      { v: "0.9", t: "0,9×" },
      { v: "1",   t: "1×" },
      { v: "1.15",t: "1,15×" },
      { v: "1.3", t: "1,3×" }
    ]
      .map(function (r) {
        return '<option value="' + r.v + '"' + (r.v === "1" ? " selected" : "") + ">" + r.t + "</option>";
      })
      .join("");

    return (
      '<section class="narrator card" id="narrator" data-reveal="zoom"' + d(2) + " data-glow>" +
        '<div class="narrator__head">' +
          '<span class="narrator__badge"><span class="narrator__dot" aria-hidden="true"></span>' + n.badge + "</span>" +
          '<h3 class="narrator__title">' + n.title + "</h3>" +
          '<div class="narrator__settings">' +
            '<label class="narrator__field">' +
              '<span class="sr-only">Voz</span>' +
              '<select id="narratorVoice" class="narrator__select" aria-label="Voz da narração"></select>' +
            "</label>" +
            '<label class="narrator__field">' +
              '<span class="sr-only">Velocidade</span>' +
              '<select id="narratorRate" class="narrator__select narrator__select--rate" aria-label="Velocidade da narração">' +
                rates +
              "</select>" +
            "</label>" +
          "</div>" +
        "</div>" +

        '<div class="narrator__deck">' +
          '<button class="narrator__play" id="narratorPlay" type="button" ' +
                  'data-state="idle" aria-label="Reproduzir narração">' +
            '<svg class="narrator__iconPlay"  viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8V4z"/></svg>' +
            '<svg class="narrator__iconPause" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4h4v16H7zM13 4h4v16h-4z"/></svg>' +
          "</button>" +
          '<div class="narrator__meta">' +
            '<span class="narrator__cta">' + n.cta + "</span>" +
            '<span class="narrator__wave" id="narratorWave" aria-hidden="true">' + wave + "</span>" +
          "</div>" +
          '<button class="narrator__stop" id="narratorStop" type="button" disabled aria-label="Parar narração">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>' +
          "</button>" +
        "</div>" +

        '<ol class="narrator__script" id="narratorScript">' + lines + "</ol>" +
        '<p class="narrator__status" id="narratorStatus">' + n.hint + "</p>" +
      "</section>"
    );
  }

  /** Lista de fontes consultadas. */
  function sources(list) {
    if (!list || !list.length) return "";
    var links = list
      .map(function (s) {
        return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + s.label + "</a>";
      })
      .join(" · ");
    return '<p class="note" data-reveal="fade"' + d(8) + ">Fontes: " + links + "</p>";
  }

  /** Gráfico de linha (SVG puro) do arco emocional. */
  function arcChart(arc) {
    var points = arc.points;
    var W = 720, H = 260, padX = 34, padTop = 26, padBottom = 52;
    var n = points.length;
    var stepX = (W - padX * 2) / (n - 1);
    var usableH = H - padTop - padBottom;

    var coords = points.map(function (p, i) {
      return {
        x: padX + i * stepX,
        y: padTop + usableH * (1 - p.value / 100),
        p: p
      };
    });

    var line = coords.map(function (c) { return c.x.toFixed(1) + "," + c.y.toFixed(1); }).join(" ");
    var area =
      "M" + coords[0].x.toFixed(1) + "," + (H - padBottom) +
      " L" + line.split(" ").join(" L") +
      " L" + coords[n - 1].x.toFixed(1) + "," + (H - padBottom) + " Z";

    var grid = [0, 25, 50, 75, 100]
      .map(function (v) {
        var y = padTop + usableH * (1 - v / 100);
        return '<line class="chart__grid" x1="' + padX + '" y1="' + y.toFixed(1) +
               '" x2="' + (W - padX) + '" y2="' + y.toFixed(1) + '"/>';
      })
      .join("");

    var dots = coords
      .map(function (c, i) {
        return (
          '<g class="chart__point" style="--d:' + (0.9 + i * 0.09).toFixed(2) + 's">' +
            '<circle class="chart__halo" cx="' + c.x.toFixed(1) + '" cy="' + c.y.toFixed(1) + '" r="11"/>' +
            '<circle class="chart__dot"  cx="' + c.x.toFixed(1) + '" cy="' + c.y.toFixed(1) + '" r="4.5"/>' +
            "<title>" + c.p.label + " — " + c.p.note + "</title>" +
          "</g>"
        );
      })
      .join("");

    var labels = coords
      .map(function (c, i) {
        var anchor = i === 0 ? "start" : i === n - 1 ? "end" : "middle";
        var x = i === 0 ? c.x - 4 : i === n - 1 ? c.x + 4 : c.x;
        return (
          '<text class="chart__label" x="' + x.toFixed(1) + '" y="' + (H - padBottom + 22) +
          '" text-anchor="' + anchor + '">' + c.p.label + "</text>"
        );
      })
      .join("");

    return (
      '<div class="chart__wrap">' +
        '<svg class="chart__svg" viewBox="0 0 ' + W + " " + H + '" role="img" ' +
             'aria-label="' + arc.caption + '" preserveAspectRatio="xMidYMid meet">' +
          "<defs>" +
            '<linearGradient id="arcFill" x1="0" y1="0" x2="0" y2="1">' +
              '<stop offset="0%" stop-color="rgba(224,169,85,.42)"/>' +
              '<stop offset="100%" stop-color="rgba(224,169,85,0)"/>' +
            "</linearGradient>" +
            '<linearGradient id="arcLine" x1="0" y1="0" x2="1" y2="0">' +
              '<stop offset="0%" stop-color="#7fae8d"/>' +
              '<stop offset="55%" stop-color="#e0a955"/>' +
              '<stop offset="100%" stop-color="#f7dca6"/>' +
            "</linearGradient>" +
          "</defs>" +
          grid +
          '<path class="chart__area" d="' + area + '" fill="url(#arcFill)"/>' +
          '<polyline class="chart__line" points="' + line + '"/>' +
          dots +
          labels +
        "</svg>" +
      "</div>"
    );
  }

  /* =========================================================
     SLIDE 3 — OUVIR E ENCERRAMENTO
     ========================================================= */
  function renderFinale() {
    var f = D.finale;

    var eq = "";
    for (var i = 0; i < 5; i++) {
      eq += '<i style="--i:' + i + '"></i>';
    }

    var tips = f.tips
      .map(function (t, i) {
        return '<li data-reveal="fade"' + d(i, 0.07, 0.5) + ">" + t + "</li>";
      })
      .join("");

    return (
      '<div class="slide__inner stack-lg">' +
        header(f) +

        '<section class="player card" id="playerCard" data-reveal="zoom"' + d(2) + " data-glow>" +
          '<div class="player__art">' +
            coverImg("player__cover", "Capa de " + T.title) +
            '<span class="player__eq" id="playerEq" aria-hidden="true">' + eq + "</span>" +
          "</div>" +

          '<div class="player__body">' +
            '<span class="player__badge">Tocando agora</span>' +
            '<h3 class="player__track">' + T.title + "</h3>" +
            '<p class="player__artist">' + T.artist + " · Single, 2025</p>" +

            '<div class="player__bar" id="playerBar" role="slider" tabindex="0" ' +
                 'aria-label="Progresso da faixa" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
              '<span class="player__barFill" id="playerFill"><i class="player__knob"></i></span>' +
            "</div>" +
            '<div class="player__times">' +
              '<span id="playerCurrent">0:00</span>' +
              '<span id="playerDuration">' + T.duration + "</span>" +
            "</div>" +

            '<div class="player__controls">' +
              '<button class="player__ctrl" id="playerBack" type="button" aria-label="Voltar 15 segundos">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L4 12l7 7"/><path d="M20 5l-7 7 7 7"/></svg>' +
              "</button>" +
              '<button class="player__play" id="playerPlay" type="button" aria-label="Reproduzir">' +
                '<svg class="player__iconPlay"  viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8V4z"/></svg>' +
                '<svg class="player__iconPause" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4h4v16H7zM13 4h4v16h-4z"/></svg>' +
              "</button>" +
              '<button class="player__ctrl" id="playerFwd" type="button" aria-label="Avançar 15 segundos">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 5l7 7-7 7"/><path d="M4 5l7 7-7 7"/></svg>' +
              "</button>" +

              '<div class="player__volume" id="playerVolumeWrap">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 8.5a5 5 0 010 7"/></svg>' +
                '<input class="player__range" id="playerVolume" type="range" min="0" max="100" value="80" aria-label="Volume">' +
              "</div>" +
            "</div>" +

            '<p class="player__status" id="playerStatus">Conectando ao player oficial do Spotify…</p>' +
          "</div>" +
        "</section>" +

        '<div class="player__embedWrap" data-reveal' + d(4) + ">" +
          '<span class="player__embedLabel">Reprodução oficial</span>' +
          '<div id="spotify-embed" class="player__embed"></div>' +
        "</div>" +

        '<div class="player__extra">' +
          '<ul class="player__tips">' + tips + "</ul>" +
          '<div class="player__cta" data-reveal' + d(6) + ">" +
            '<a class="btn btn--spotify btn--lg" href="' + T.spotifyUrl + '" target="_blank" rel="noopener noreferrer">' +
              spotifyIcon() + "Ouvir no Spotify" +
            "</a>" +
            '<a class="btn btn--ghost" href="' + T.youtubeUrl + '" target="_blank" rel="noopener noreferrer">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3V9z"/></svg>' +
              "Ver no YouTube" +
            "</a>" +
          "</div>" +
        "</div>" +

        '<section class="outro block">' +
          subhead(f.outroTitle, 0) +
          '<p class="outro__message" data-reveal' + d(1) + ">" + f.message + "</p>" +
          '<div class="outro__actions" data-reveal' + d(2) + ">" +
            '<button class="btn btn--primary" data-action="goto-player" type="button">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-14 9V3z"/></svg>' +
              "Ouvir novamente" +
            "</button>" +
            '<button class="btn" data-action="restart" type="button">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8"/><path d="M3 3v5h5"/></svg>' +
              "Voltar ao início" +
            "</button>" +
          "</div>" +
          '<div class="rule" data-reveal="fade"' + d(3) + "></div>" +
          '<p class="outro__signature" data-reveal="fade"' + d(4) + ">" + f.signature + "</p>" +
          '<p class="note" data-reveal="fade"' + d(5) + ">" + f.credits + "</p>" +
        "</section>" +
      "</div>"
    );
  }

  /* ---------- Ícone do Spotify ---------- */
  function spotifyIcon() {
    return (
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.59 14.42a.75.75 0 01-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.15a.75.75 0 11-.33-1.46c4.57-1.05 8.5-.6 11.66 1.33a.75.75 0 01.25 1.03zm1.22-2.77a.94.94 0 01-1.29.31c-3.23-1.99-8.15-2.56-11.96-1.4a.94.94 0 11-.55-1.79c4.36-1.33 9.78-.69 13.49 1.59a.94.94 0 01.31 1.29zm.11-2.88C14.05 8.48 7.9 8.27 4.2 9.4a1.12 1.12 0 11-.65-2.15c4.25-1.29 11.04-1.04 15.39 1.54a1.12 1.12 0 11-1.15 1.92z"/>' +
      "</svg>"
    );
  }

  /* ---------- Registro dos slides ---------- */
  window.APP_SLIDES = [
    { id: "capa",   label: "Capa",              render: renderCover },
    { id: "musica", label: "A música",          render: renderStory },
    { id: "ouvir",  label: "Ouvir e encerrar",  render: renderFinale }
  ];
})();
