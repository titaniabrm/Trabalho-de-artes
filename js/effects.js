/* =========================================================
   EFFECTS — partículas, parallax, revelações e microinterações
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isCoarse = window.matchMedia("(pointer: coarse)").matches;

  /* -------------------------------------------------------
     Partículas: poeira dourada flutuando ao fundo
     ------------------------------------------------------- */
  function initParticles(canvas) {
    if (!canvas || reduceMotion) return;

    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var w = 0, h = 0, raf = null;

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build() {
      // Densidade proporcional à área, com teto para telas grandes.
      var count = Math.min(70, Math.round((w * h) / 26000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push(spawn(true));
      }
    }

    function spawn(anywhere) {
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 12,
        r: 0.5 + Math.random() * 1.9,
        vy: 0.09 + Math.random() * 0.34,
        vx: (Math.random() - 0.5) * 0.16,
        a: 0.12 + Math.random() * 0.5,
        tw: Math.random() * Math.PI * 2,
        tws: 0.005 + Math.random() * 0.017,
        jade: Math.random() < 0.22
      };
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y -= p.vy;
        p.x += p.vx;
        p.tw += p.tws;

        if (p.y < -12 || p.x < -20 || p.x > w + 20) {
          particles[i] = spawn(false);
          continue;
        }

        var alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw));
        var color = p.jade ? "127,174,141" : "236,196,126";

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + color + "," + alpha.toFixed(3) + ")";
        ctx.shadowBlur = p.r * 5;
        ctx.shadowColor = "rgba(" + color + ",0.55)";
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
    }

    function start() { if (!raf) raf = requestAnimationFrame(frame); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    resize();
    start();

    window.addEventListener("resize", debounce(resize, 180));
    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : start();
    });
  }

  /* -------------------------------------------------------
     Parallax do fundo, seguindo o ponteiro
     ------------------------------------------------------- */
  function initParallax() {
    if (reduceMotion || isCoarse) return;

    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

    window.addEventListener("pointermove", function (e) {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });

    function tick() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      document.documentElement.style.setProperty("--px", cx.toFixed(4));
      document.documentElement.style.setProperty("--py", cy.toFixed(4));

      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }
  }

  /* -------------------------------------------------------
     Texto animado palavra a palavra
     ------------------------------------------------------- */
  function splitText(root) {
    var nodes = root.querySelectorAll("[data-split]");
    Array.prototype.forEach.call(nodes, function (node) {
      if (node.dataset.splitDone) return;
      var words = node.textContent.trim().split(/\s+/);
      node.innerHTML = words
        .map(function (word, i) {
          return '<span class="word" style="--d:' + (0.12 + i * 0.075).toFixed(2) + 's">' + word + "</span>";
        })
        .join(" ");
      node.dataset.splitDone = "1";
    });
  }

  /* -------------------------------------------------------
     Revelação dos elementos ao entrar no slide
     ------------------------------------------------------- */
  function revealSlide(slide) {
    slide.classList.remove("is-revealed");
    // Força um reflow: reinicia as transições de forma síncrona.
    // (rAF/timeout ficam suspensos em abas em segundo plano e deixariam
    //  o conteúdo invisível até a aba voltar ao foco.)
    void slide.offsetWidth;
    slide.classList.add("is-revealed");
  }

  function resetSlide(slide) {
    slide.classList.remove("is-revealed");
    slide.scrollTop = 0;
  }

  /* -------------------------------------------------------
     Microinterações: brilho que segue o mouse + inclinação 3D
     ------------------------------------------------------- */
  function initPointerFx(root) {
    if (isCoarse) return;

    root.addEventListener("pointermove", function (e) {
      var glow = e.target.closest ? e.target.closest("[data-glow]") : null;
      if (glow) {
        var g = glow.getBoundingClientRect();
        glow.style.setProperty("--mx", (((e.clientX - g.left) / g.width) * 100).toFixed(1) + "%");
        glow.style.setProperty("--my", (((e.clientY - g.top) / g.height) * 100).toFixed(1) + "%");
      }

      var tilt = e.target.closest ? e.target.closest("[data-tilt]") : null;
      if (tilt && !reduceMotion) {
        var t = tilt.getBoundingClientRect();
        var rx = ((e.clientY - t.top) / t.height - 0.5) * -11;
        var ry = ((e.clientX - t.left) / t.width - 0.5) * 13;
        tilt.style.setProperty("--rx", rx.toFixed(2) + "deg");
        tilt.style.setProperty("--ry", ry.toFixed(2) + "deg");
      }
    }, { passive: true });

    root.addEventListener("pointerleave", function (e) {
      var tilt = e.target.closest ? e.target.closest("[data-tilt]") : null;
      if (tilt) {
        tilt.style.setProperty("--rx", "0deg");
        tilt.style.setProperty("--ry", "0deg");
      }
    }, true);
  }

  /* -------------------------------------------------------
     Utilitário
     ------------------------------------------------------- */
  function debounce(fn, wait) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, wait);
    };
  }

  window.APP_EFFECTS = {
    initParticles: initParticles,
    initParallax: initParallax,
    initPointerFx: initPointerFx,
    splitText: splitText,
    revealSlide: revealSlide,
    resetSlide: resetSlide,
    reduceMotion: reduceMotion,
    isCoarse: isCoarse
  };
})();
