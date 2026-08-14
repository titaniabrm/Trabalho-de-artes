/* =========================================================
   DATA — todo o conteúdo da apresentação em um só lugar.
   Para editar textos, mexa APENAS neste arquivo.

   A apresentação tem 3 slides:
     1. cover  — capa
     2. story  — a música (ficha, contexto, significado, análise)
     3. finale — ouvir e encerramento
   ========================================================= */

window.APP_DATA = {

  /* -------------------------------------------------------
     Dados da faixa (usados na capa, no player e no rodapé)
     ------------------------------------------------------- */
  track: {
    title: "Olhos Sempre Abertos",
    artist: "Shooter_sz",
    spotifyTrackId: "1yxSZQfNaJv5eUl8xZMVvz",
    spotifyUrl: "https://open.spotify.com/intl-pt/track/1yxSZQfNaJv5eUl8xZMVvz",
    spotifyArtistUrl: "https://open.spotify.com/artist/4NO7fX47IDh3lZxK6ViJKf",
    lyricsUrl: "https://www.letras.mus.br/338658/olhos-sempre-abertos-arthur-cervero-ordem-paranormal/",
    youtubeUrl: "https://www.youtube.com/watch?v=ALDBKpwu7Kc",
    duration: "5:49",
    release: "3 de março de 2025",

    /* Opcional: caminho para um arquivo de áudio próprio (ex.: "assets/audio.mp3").
       Deixe em null para usar somente o player oficial do Spotify.
       Só preencha se você tiver o direito de distribuir o arquivo. */
    localAudio: null,

    /* Capa: por padrão usa a arte oficial servida pelo CDN do Spotify
       (nada de imagem redistribuída no repositório).
       Para usar um arquivo próprio, salve-o em assets/cover.jpg e troque
       o valor de `cover` por "assets/cover.jpg" — o fallback continua valendo. */
    cover: "https://i.scdn.co/image/ab67616d0000b27333d44427d14430f0fa6670c3",
    coverFallback: "assets/cover.jpg"
  },

  /* =======================================================
     SLIDE 1 — CAPA
     ======================================================= */
  cover: {
    eyebrow: "Apresentação musical",
    kicker:
      "Uma character song do universo Ordem Paranormal: quem canta não é o artista, " +
      "é o personagem Arthur Cervero — no pior dia da vida dele.",
    cta: "Começar apresentação",
    tags: ["Single · 2025", "Rap geek", "5:49"]
  },

  /* =======================================================
     SLIDE 2 — A MÚSICA
     ======================================================= */
  story: {
    eyebrow: "Slide 02",
    title: "A música",
    lede:
      "Ficha técnica, contexto e leitura da faixa em uma só página: " +
      "<strong>perda → culpa → responsabilidade → promessa</strong>.",

    /* --- Narração por voz sintetizada (Web Speech API do navegador) ---
       Cada item é lido como uma frase separada e destacado na transcrição.
       Escreva números por extenso: a voz lê melhor "cinco e quarenta e nove"
       do que "5:49". */
    narration: {
      title: "Explicação em áudio",
      badge: "Voz de IA",
      cta: "Ouvir a explicação",
      hint:
        "Narração gerada na hora pela voz sintetizada do seu navegador — " +
        "nenhum áudio é baixado ou hospedado. Acompanhe pela transcrição abaixo.",
      unsupported:
        "Seu navegador não oferece síntese de voz. Use Chrome, Edge ou Safari " +
        "atualizados para ouvir a explicação — o texto continua disponível abaixo.",

      /* --- Como as vozes aparecem no seletor ---
         As vozes vêm do sistema operacional e têm nomes crus ("Daniel",
         "Maria", "Francisca"…). Aqui elas ganham nomes temáticos da faixa:
         Abutre I, Abutre II, e assim por diante.
         `timbres` traduz nomes conhecidos em uma descrição curta; vozes fora
         da lista aparecem só com o numeral. O nome real do sistema continua
         visível ao passar o mouse sobre a opção. */
      voiceNames: {
        base: "Abutre",
        timbres: {
          daniel:    "voz grave",
          antonio:   "voz grave",
          ricardo:   "voz grave",
          felipe:    "voz grave",
          duarte:    "voz grave",
          maria:     "voz clara",
          francisca: "voz clara",
          luciana:   "voz clara",
          helena:    "voz clara",
          joana:     "voz clara",
          catarina:  "voz clara"
        }
      },

      script: [
        "Olhos Sempre Abertos foi lançada por Shooter ésse zê em três de março de dois mil e vinte e cinco, num single de cinco minutos e quarenta e nove segundos.",
        "Ela não é uma música sobre o artista. É uma character song: quem canta é um personagem, Arthur Cervero, do universo Ordem Paranormal.",
        "Arthur é músico, vem de Carpazinha, no Rio Grande do Sul, e fazia parte de uma gangue de motoqueiros chamada Gaudérios Abutres.",
        "Depois de perder amigos e família para o paranormal, ele entra para a Ordo Realitas e acaba na liderança de uma equipe que nunca pediu para liderar.",
        "A faixa percorre esse caminho em quatro etapas: a perda, a culpa de ter sobrevivido, a responsabilidade que cai no colo dele, e por fim a promessa.",
        "O símbolo central é o abutre. Aqui ele não representa a morte, e sim quem resiste onde nada mais resistiu. É a dor virando identidade.",
        "O instrumental puxa para o rock, com guitarra no lugar do sample. Faz sentido: o personagem é músico, e a guitarra é o instrumento dele.",
        "E o título é a tese da canção. Manter os olhos sempre abertos é a promessa de proteger quem restou, mas também é uma sentença: nunca mais poder descansar.",
        "Uma ressalva: os dados de lançamento, duração e composição vêm de fontes oficiais, mas a leitura de significado apresentada aqui é interpretativa."
      ]
    },

    /* --- Ficha técnica --- */
    facts: [
      { icon: "📅", label: "Lançamento", value: "3 de março de 2025" },
      { icon: "⏱️", label: "Duração",    value: "5:49 · single" },
      { icon: "🎸", label: "Gênero",     value: "Rap nacional / rap geek" },
      { icon: "✍️", label: "Composição", value: "Calebe e Shooter_sz" },
      { icon: "👁️", label: "Universo",   value: "Ordem Paranormal" },
      { icon: "🎤", label: "Artista",    value: "Shooter_sz" }
    ],

    /* --- Contexto: a faixa e o artista --- */
    context: [
      {
        icon: "🎵",
        title: "A música",
        text:
          "Uma <em>character song</em> — narrada em primeira pessoa por um personagem. Quem fala é " +
          "Arthur Cervero, de Ordem Paranormal (o RPG de terror criado por Cellbit): músico de " +
          "Carpazinha, ex-integrante da gangue “Gaudérios Abutres”, que perde amigos e família para " +
          "o paranormal e acaba à frente da Equipe Abutres."
      },
      {
        icon: "🎧",
        title: "O artista",
        text:
          "Shooter_sz é da cena do <strong>rap geek</strong> brasileiro — hip-hop feito sobre anime, " +
          "games e RPG. Mais de 40 faixas catalogadas, quase todas em torno de um personagem. " +
          "Não publica biografia oficial: tudo aqui vem das páginas de streaming."
      }
    ],

    works: [
      { song: "Abismo",           char: "Subaru" },
      { song: "Lágrimas de Ódio", char: "Guts (Berserk)" },
      { song: "Refém",            char: "Itadori" },
      { song: "Doente",           char: "Shinji Ikari" },
      { song: "Artista Viajante", char: "Spike (Cowboy Bebop)" },
      { song: "Cinzas do Passado",char: "Aki" }
    ],

    /* --- Análise visual --- */
    analysisTitle: "Análise",

    pillars: [
      { icon: "🎯", label: "Tema principal", value: "Transformar perda em propósito" },
      { icon: "🌫️", label: "Clima",          value: "Épico melancólico" },
      { icon: "📣", label: "Mensagem",       value: "Ninguém mais morre sob a minha guarda" }
    ],

    emotions: [
      { label: "Determinação", value: 95 },
      { label: "Luto",         value: 88 },
      { label: "Melancolia",   value: 80 },
      { label: "Revolta",      value: 72 },
      { label: "Esperança",    value: 52 }
    ],

    arc: {
      caption: "Arco emocional ao longo dos 5:49",
      points: [
        { label: "Abertura",  value: 30, note: "Silêncio e perda" },
        { label: "Choque",    value: 52, note: "A ficha caindo" },
        { label: "Culpa",     value: 46, note: "Por que eu?" },
        { label: "Virada",    value: 74, note: "Aceitar o posto" },
        { label: "Refrão",    value: 92, note: "A promessa" },
        { label: "Desfecho",  value: 96, note: "Olhos abertos" }
      ]
    },

    highlights: [
      { icon: "📈", title: "Construção em crescendo",
        text: "Começa contida e ganha corpo. Quase seis minutos é tempo raro no rap — aqui, tempo usado para narrar." },
      { icon: "🎸", title: "Guitarra no lugar do sample",
        text: "O instrumental puxa para o rock. Não é acaso: o personagem é músico, e a guitarra é o instrumento dele." },
      { icon: "🖼️", title: "A capa conta a mesma história",
        text: "Mão tatuada, violão e uma foto antiga colada no instrumento: memória grudada no que ele usa para seguir." }
    ],

    disclaimer:
      "Significado, análise e medidores são leitura interpretativa, não dados divulgados pelo artista. " +
      "Nenhum verso é reproduzido: os textos são descrições e comentários originais.",

    sources: [
      { label: "Spotify",       url: "https://open.spotify.com/intl-pt/track/1yxSZQfNaJv5eUl8xZMVvz" },
      { label: "Apple Music",   url: "https://music.apple.com/us/album/olhos-sempre-abertos-single/1800553716" },
      { label: "Cifra Club",    url: "https://www.cifraclub.com.br/338658/olhos-sempre-abertos-arthur-cervero-ordem-paranormal/letra/" },
      { label: "Letras.mus.br", url: "https://www.letras.mus.br/338658/" },
      { label: "Ordem Paranormal Wiki", url: "https://ordemparanormal.fandom.com/wiki/Arthur_Cervero" }
    ]
  },

  /* =======================================================
     SLIDE 3 — OUVIR E ENCERRAMENTO
     ======================================================= */
  finale: {
    eyebrow: "Slide 03",
    title: "Ouça a música",
    lede:
      "Reprodução pelo player oficial do Spotify. Os controles abaixo comandam a própria " +
      "faixa — nada de áudio hospedado por fora.",

    tips: [
      "Com uma conta Spotify conectada no navegador, a faixa toca por inteiro.",
      "Sem login, o Spotify libera apenas uma prévia da música.",
      "O botão verde abre a faixa no aplicativo oficial."
    ],

    outroTitle: "Para fechar",
    message:
      "Nem toda música sobre dor termina em conforto. Esta termina em decisão. " +
      "“Olhos Sempre Abertos” pega um personagem no pior dia da vida dele e o devolve " +
      "de pé — não porque a ferida fechou, mas porque ele encontrou um motivo maior " +
      "que ela para continuar em pé.",
    signature: "Uma apresentação sobre a faixa de Shooter_sz",
    credits:
      "Projeto independente feito por fãs, sem vínculo com Shooter_sz, com o Spotify ou " +
      "com Ordem Paranormal. Todos os direitos da música pertencem aos seus autores."
  }
};
