/* =========================================================
   NARRATOR — explicação falada por voz sintetizada.

   Usa a Web Speech API (speechSynthesis), nativa do navegador:
   nenhum arquivo de áudio é hospedado e nenhuma chave de API é usada.
   O texto lido fica em js/data.js → story.narration.script.
   ========================================================= */

(function () {
  "use strict";

  var N = window.APP_DATA.story.narration;
  var synth = window.speechSynthesis;
  var supported = !!synth && typeof window.SpeechSynthesisUtterance === "function";

  var ui = {};
  var voices = [];
  var index = 0;          // frase atual do roteiro
  var speaking = false;
  var paused = false;
  var watchdog = null;
  var bound = false;

  /* -------------------------------------------------------
     Inicialização (chamada por main.js após montar os slides)
     ------------------------------------------------------- */
  function init() {
    cacheUI();
    if (!ui.play) return;

    if (!supported) {
      ui.root.classList.add("is-unsupported");
      ui.play.disabled = true;
      setStatus(N.unsupported);
      return;
    }

    bindUI();
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.addEventListener("voiceschanged", loadVoices);
    }
  }

  function cacheUI() {
    ui.root = document.getElementById("narrator");
    ui.play = document.getElementById("narratorPlay");
    ui.stop = document.getElementById("narratorStop");
    ui.voice = document.getElementById("narratorVoice");
    ui.rate = document.getElementById("narratorRate");
    ui.status = document.getElementById("narratorStatus");
    ui.wave = document.getElementById("narratorWave");
    ui.lines = ui.root ? ui.root.querySelectorAll(".narrator__line") : [];
    ui.script = document.getElementById("narratorScript");
  }

  function bindUI() {
    if (bound) return;
    bound = true;

    ui.play.addEventListener("click", toggle);
    ui.stop.addEventListener("click", function () { stop(true); });

    // Trocar de voz ou de velocidade recomeça a frase atual.
    ui.voice.addEventListener("change", restartCurrent);
    ui.rate.addEventListener("change", restartCurrent);

    // Clicar (ou dar Enter) numa frase começa a leitura dali.
    Array.prototype.forEach.call(ui.lines, function (line, i) {
      line.addEventListener("click", function () {
        index = i;
        start();
      });
      line.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        e.stopPropagation();
        index = i;
        start();
      });
    });

    // A voz não pode continuar falando depois que a página sai do ar.
    window.addEventListener("beforeunload", function () { synth.cancel(); });
  }

  /* -------------------------------------------------------
     Vozes disponíveis
     ------------------------------------------------------- */
  function loadVoices() {
    var all = synth.getVoices() || [];
    if (!all.length) return;

    // Prioriza português; se não houver, oferece todas.
    var pt = all.filter(function (v) { return /^pt/i.test(v.lang); });
    voices = pt.length ? pt : all;

    // pt-BR primeiro, depois o resto
    voices.sort(function (a, b) {
      return (/pt.BR/i.test(b.lang) ? 1 : 0) - (/pt.BR/i.test(a.lang) ? 1 : 0);
    });

    var current = ui.voice.value;
    ui.voice.innerHTML = voices
      .map(function (v, i) {
        return '<option value="' + i + '" title="Voz do sistema: ' + v.name + '">' +
               voiceLabel(v, i) + "</option>";
      })
      .join("");
    if (current && voices[current]) ui.voice.value = current;

    if (!pt.length) {
      setStatus("Nenhuma voz em português encontrada neste navegador. Escolha uma voz na lista.");
    } else if (!speaking) {
      setStatus(N.hint);
    }
  }

  function currentVoice() { return voices[Number(ui.voice.value)] || voices[0] || null; }

  /**
   * Nome de exibição da voz: "Abutre I — voz grave".
   * As vozes do sistema têm nomes crus e variam por sistema operacional;
   * aqui elas recebem a identidade da apresentação.
   */
  function voiceLabel(voice, i) {
    var cfg = N.voiceNames;
    var label = cfg.base + " " + roman(i);

    var timbre = timbreOf(voice.name, cfg.timbres);
    if (timbre) label += " — " + timbre;

    // Se não for pt-BR, avisa: pode ler o texto com sotaque estranho.
    if (!/pt.BR/i.test(voice.lang)) label += " (" + voice.lang + ")";

    return label;
  }

  function timbreOf(voiceName, timbres) {
    var lower = voiceName.toLowerCase();
    var keys = Object.keys(timbres);
    for (var i = 0; i < keys.length; i++) {
      if (lower.indexOf(keys[i]) !== -1) return timbres[keys[i]];
    }
    return "";
  }

  function roman(i) {
    return ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][i] || String(i + 1);
  }

  /* -------------------------------------------------------
     Reprodução
     ------------------------------------------------------- */
  function toggle() {
    if (!speaking) { start(); return; }
    if (paused) { resume(); } else { pause(); }
  }

  function start() {
    // A música e a narração não podem tocar juntas.
    if (window.APP_PLAYER && window.APP_PLAYER.pause) window.APP_PLAYER.pause();

    synth.cancel();
    // No Safari/iOS as vozes só chegam depois de uma interação do usuário.
    if (!voices.length) loadVoices();

    speaking = true;
    paused = false;
    syncUI();
    speakFrom(index);
    startWatchdog();
  }

  function speakFrom(i) {
    if (i >= N.script.length) { finish(); return; }

    index = i;
    highlight(i);

    var utter = new SpeechSynthesisUtterance(N.script[i]);
    var voice = currentVoice();
    if (voice) { utter.voice = voice; utter.lang = voice.lang; }
    else { utter.lang = "pt-BR"; }
    utter.rate = Number(ui.rate.value) || 1;
    utter.pitch = 1;

    utter.onend = function () {
      if (!speaking) return;         // parada manual
      speakFrom(index + 1);
    };
    utter.onerror = function (e) {
      if (e && e.error === "interrupted") return;   // troca de voz / parada
      setStatus("Não foi possível reproduzir a narração neste navegador.");
      stop(true);
    };

    synth.speak(utter);
    setStatus("Narrando… frase " + (i + 1) + " de " + N.script.length + ".");
  }

  function pause() {
    synth.pause();
    paused = true;
    syncUI();
    setStatus("Narração pausada.");
  }

  function resume() {
    synth.resume();
    paused = false;
    syncUI();
    setStatus("Narrando… frase " + (index + 1) + " de " + N.script.length + ".");
  }

  /** Para a narração. `reset` volta para a primeira frase. */
  function stop(reset) {
    if (!supported) return;
    speaking = false;
    paused = false;
    synth.cancel();
    stopWatchdog();
    if (reset !== false) index = 0;
    highlight(-1);
    syncUI();
    setStatus(N.hint);
  }

  function finish() {
    speaking = false;
    paused = false;
    index = 0;
    stopWatchdog();
    highlight(-1);
    syncUI();
    setStatus("Explicação concluída. Toque no botão para ouvir de novo.");
  }

  function restartCurrent() {
    if (!speaking) return;
    var at = index;
    synth.cancel();
    setTimeout(function () { if (speaking) speakFrom(at); }, 60);
  }

  /* O Chrome interrompe falas longas sozinho; um resume() periódico
     mantém a fila viva sem efeito colateral quando não há pausa. */
  function startWatchdog() {
    stopWatchdog();
    watchdog = setInterval(function () {
      if (speaking && !paused && synth.speaking) synth.resume();
    }, 8000);
  }
  function stopWatchdog() {
    if (watchdog) { clearInterval(watchdog); watchdog = null; }
  }

  /* -------------------------------------------------------
     Interface
     ------------------------------------------------------- */
  function highlight(i) {
    Array.prototype.forEach.call(ui.lines, function (line, k) {
      line.classList.toggle("is-active", k === i);
    });
    if (i >= 0 && ui.lines[i] && ui.script) {
      var line = ui.lines[i];
      var top = line.offsetTop - ui.script.clientHeight / 2 + line.offsetHeight / 2;
      ui.script.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  function syncUI() {
    var active = speaking && !paused;
    ui.root.classList.toggle("is-speaking", active);
    ui.wave.classList.toggle("is-active", active);
    ui.stop.disabled = !speaking;
    ui.play.setAttribute("aria-label", active ? "Pausar narração" : "Reproduzir narração");
    ui.play.dataset.state = active ? "playing" : paused ? "paused" : "idle";
  }

  function setStatus(text) {
    if (ui.status) ui.status.textContent = text;
  }

  window.APP_NARRATOR = {
    init: init,
    stop: stop,
    isSupported: function () { return supported; }
  };
})();
