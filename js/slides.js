/* =========================================================
   SLIDES — cada slide é uma função que devolve o seu HTML.
   O conteúdo vem sempre de js/data.js.
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

  /** Lista de fontes consultadas. */
  function sources(list) {
    if (!list || !list.length) return "";
    var links = list
      .map(function (s) {
        return '<a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + s.label + "</a>";
      })
      .join(" · ");
    return '<p class="note" data-reveal="fade"' + d(9) + ">Fontes: " + links + "</p>";
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

        '<div class="cover__scroll" aria-hidden="true"><span></span></div>' +
      "</div>"
    );
  }

  /* =========================================================
     SLIDE 2 — SOBRE A MÚSICA
     ========================================================= */
  function renderAbout() {
    var a = D.about;

    var facts = a.facts
      .map(function (f, i) {
        return (
          '<li class="fact" data-reveal="zoom"' + d(i, 0.06, 0.25) + ">" +
            '<span class="fact__icon" aria-hidden="true">' + f.icon + "</span>" +
            '<span class="fact__label">' + f.label + "</span>" +
            '<strong class="fact__value">' + f.value + "</strong>" +
          "</li>"
        );
      })
      .join("");

    var blocks = a.blocks
      .map(function (b, i) {
        return (
          '<article class="card" data-reveal' + d(i, 0.1, 0.4) + " data-glow>" +
            '<h3 class="card__title">' + b.title + "</h3>" +
            '<p class="card__text">' + b.text + "</p>" +
          "</article>"
        );
      })
      .join("");

    return (
      '<div class="slide__inner stack-lg">' +
        header(a) +
        '<ul class="facts">' + facts + "</ul>" +
        '<div class="grid grid--3">' + blocks + "</div>" +
        sources(a.sources) +
      "</div>"
    );
  }

  /* =========================================================
     SLIDE 3 — SOBRE O ARTISTA
     ========================================================= */
  function renderArtist() {
    var a = D.artist;

    var stats = a.stats
      .map(function (s, i) {
        return (
          '<li class="stat" data-reveal="zoom"' + d(i, 0.09, 0.25) + ">" +
            '<b class="stat__value">' + s.value + "</b>" +
            '<span class="stat__label">' + s.label + "</span>" +
          "</li>"
        );
      })
      .join("");

    var blocks = a.blocks
      .map(function (b, i) {
        return (
          '<article class="card" data-reveal' + d(i, 0.1, 0.35) + " data-glow>" +
            '<span class="icon-badge" aria-hidden="true">' + b.icon + "</span>" +
            '<h3 class="card__title">' + b.title + "</h3>" +
            '<p class="card__text">' + b.text + "</p>" +
          "</article>"
        );
      })
      .join("");

    var works = a.works
      .map(function (w, i) {
        return (
          '<li class="work" data-reveal="zoom"' + d(i, 0.045, 0.5) + ">" +
            '<span class="work__song">' + w.song + "</span>" +
            '<span class="work__char">' + w.char + "</span>" +
          "</li>"
        );
      })
      .join("");

    return (
      '<div class="slide__inner stack-lg">' +
        header(a) +
        '<ul class="stats">' + stats + "</ul>" +
        '<div class="grid grid--3">' + blocks + "</div>" +
        '<section class="works" data-reveal' + d(5) + ">" +
          '<h3 class="works__title">Outros trabalhos</h3>' +
          '<ul class="works__list">' + works + "</ul>" +
        "</section>" +
        '<p class="note" data-reveal="fade"' + d(8) + ">" + a.disclaimer + "</p>" +
        sources(a.sources) +
      "</div>"
    );
  }

  /* =========================================================
     SLIDE 4 — SIGNIFICADO
     ========================================================= */
  function renderMeaning() {
    var m = D.meaning;

    var themes = m.themes
      .map(function (t, i) {
        return (
          '<article class="card theme" data-reveal' + d(i, 0.07, 0.3) + " data-glow>" +
            '<span class="icon-badge" aria-hidden="true">' + t.icon + "</span>" +
            '<h3 class="card__title">' + t.title + "</h3>" +
            '<p class="card__text">' + t.text + "</p>" +
          "</article>"
        );
      })
      .join("");

    var feelings = m.feelings
      .map(function (f, i) {
        return '<li class="chip" data-reveal="zoom"' + d(i, 0.06, 0.7) + ">" + f + "</li>";
      })
      .join("");

    return (
      '<div class="slide__inner stack-lg">' +
        header(m) +
        '<div class="grid grid--3">' + themes + "</div>" +
        '<section class="feelings" data-reveal' + d(7) + ">" +
          '<h3 class="feelings__title">Sentimentos que a música transmite</h3>' +
          '<ul class="chips">' + feelings + "</ul>" +
        "</section>" +
        '<p class="note" data-reveal="fade"' + d(9) + ">" + m.disclaimer + "</p>" +
      "</div>"
    );
  }

  /* =========================================================
     SLIDE 5 — ANÁLISE
     ========================================================= */
  function renderAnalysis() {
    var an = D.analysis;

    var pillars = an.pillars
      .map(function (p, i) {
        return (
          '<article class="card pillar" data-reveal' + d(i, 0.08, 0.25) + " data-glow>" +
            '<span class="icon-badge" aria-hidden="true">' + p.icon + "</span>" +
            '<span class="pillar__label">' + p.label + "</span>" +
            '<h3 class="pillar__value">' + p.value + "</h3>" +
            '<p class="card__text">' + p.text + "</p>" +
          "</article>"
        );
      })
      .join("");

    var bars = an.emotions
      .map(function (e, i) {
        return (
          '<li class="meter" data-reveal="left"' + d(i, 0.08, 0.35) + ">" +
            '<span class="meter__label">' + e.label + "</span>" +
            '<span class="meter__track">' +
              '<span class="meter__fill" style="--val:' + e.value + '%;--i:' + i + '"></span>' +
            "</span>" +
            '<span class="meter__value">' + e.value + "</span>" +
          "</li>"
        );
      })
      .join("");

    var cards = an.highlights
      .map(function (h, i) {
        return (
          '<article class="card" data-reveal' + d(i, 0.08, 0.45) + " data-glow>" +
            '<span class="icon-badge" aria-hidden="true">' + h.icon + "</span>" +
            '<h3 class="card__title">' + h.title + "</h3>" +
            '<p class="card__text">' + h.text + "</p>" +
          "</article>"
        );
      })
      .join("");

    return (
      '<div class="slide__inner stack-lg">' +
        header(an) +
        '<div class="grid grid--4">' + pillars + "</div>" +
        '<div class="charts">' +
          '<section class="card chart" data-reveal="left"' + d(3) + ">" +
            '<h3 class="chart__title">Intensidade das emoções</h3>' +
            '<ul class="meters">' + bars + "</ul>" +
          "</section>" +
          '<section class="card chart" data-reveal="right"' + d(4) + ">" +
            '<h3 class="chart__title">' + an.arc.caption + "</h3>" +
            arcChart(an.arc.points) +
          "</section>" +
        "</div>" +
        '<div class="grid grid--4">' + cards + "</div>" +
        '<p class="note" data-reveal="fade"' + d(9) + ">" + an.disclaimer + "</p>" +
      "</div>"
    );
  }

  /** Gráfico de linha (SVG puro) do arco emocional. */
  function arcChart(points) {
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
             'aria-label="' + D.analysis.arc.caption + '" preserveAspectRatio="xMidYMid meet">' +
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
     SLIDE 6 — MOMENTOS
     ========================================================= */
  function renderMoments() {
    var m = D.moments;

    var items = m.items
      .map(function (it, i) {
        return (
          '<li class="moment" data-reveal="left"' + d(i, 0.09, 0.3) + ">" +
            '<span class="moment__time">' + it.time + "</span>" +
            '<div class="moment__body card" data-glow>' +
              '<h3 class="moment__title">' + it.title + "</h3>" +
              '<p class="moment__what">' + it.what + "</p>" +
              '<p class="moment__why"><span>Por que importa</span>' + it.why + "</p>" +
            "</div>" +
          "</li>"
        );
      })
      .join("");

    return (
      '<div class="slide__inner stack-lg">' +
        header(m) +
        '<ol class="moments">' + items + "</ol>" +
        '<div class="moments__foot" data-reveal="fade"' + d(8) + ">" +
          '<p class="note">' + m.copyright + "</p>" +
          '<a class="btn btn--ghost" href="' + T.lyricsUrl + '" target="_blank" rel="noopener noreferrer">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 10h16M4 15h10M4 20h7"/></svg>' +
            "Ver a letra oficial" +
          "</a>" +
        "</div>" +
      "</div>"
    );
  }

  /* =========================================================
     SLIDE 7 — PLAYER
     ========================================================= */
  function renderPlayer() {
    var p = D.player;

    var eq = "";
    for (var i = 0; i < 5; i++) {
      eq += '<i style="--i:' + i + '"></i>';
    }

    var tips = p.tips
      .map(function (t, i) {
        return '<li data-reveal="fade"' + d(i, 0.07, 0.6) + ">" + t + "</li>";
      })
      .join("");

    return (
      '<div class="slide__inner stack-lg">' +
        header(p) +

        '<section class="player card" data-reveal="zoom"' + d(2) + " data-glow>" +
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
      "</div>"
    );
  }

  /* =========================================================
     SLIDE 8 — ENCERRAMENTO
     ========================================================= */
  function renderOutro() {
    var o = D.outro;

    return (
      '<div class="slide__inner outro">' +
        '<div class="outro__art" data-reveal="zoom" data-tilt>' +
          coverImg("outro__cover", "Capa de " + T.title) +
          '<span class="cover__halo" aria-hidden="true"></span>' +
        "</div>" +

        '<div class="outro__text">' +
          '<span class="eyebrow" data-reveal="fade">' + o.eyebrow + "</span>" +
          '<h2 class="outro__title" data-reveal data-split>' + o.title + "</h2>" +
          '<p class="outro__artist" data-reveal' + d(1, 0.1, 0.3) + ">" + T.artist + "</p>" +
          '<p class="outro__message" data-reveal' + d(2, 0.1, 0.3) + ">" + o.message + "</p>" +

          '<div class="outro__actions" data-reveal' + d(4, 0.1, 0.4) + ">" +
            '<button class="btn btn--primary" data-action="goto-player" type="button">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-14 9V3z"/></svg>' +
              "Ouvir novamente" +
            "</button>" +
            '<button class="btn" data-action="restart" type="button">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8"/><path d="M3 3v5h5"/></svg>' +
              "Voltar ao início" +
            "</button>" +
            '<a class="btn btn--spotify" href="' + T.spotifyUrl + '" target="_blank" rel="noopener noreferrer">' +
              spotifyIcon() + "Spotify" +
            "</a>" +
          "</div>" +

          '<div class="rule" data-reveal="fade"' + d(6) + "></div>" +
          '<p class="outro__signature" data-reveal="fade"' + d(7) + ">" + o.signature + "</p>" +
          '<p class="note" data-reveal="fade"' + d(8) + ">" + o.credits + "</p>" +
        "</div>" +
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
    { id: "capa",       label: "Capa",             render: renderCover },
    { id: "musica",     label: "Sobre a música",   render: renderAbout },
    { id: "artista",    label: "Sobre o artista",  render: renderArtist },
    { id: "significado",label: "Significado",      render: renderMeaning },
    { id: "analise",    label: "Análise",          render: renderAnalysis },
    { id: "momentos",   label: "Momentos",         render: renderMoments },
    { id: "player",     label: "Player",           render: renderPlayer },
    { id: "final",      label: "Encerramento",     render: renderOutro }
  ];
})();
