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
          "Uma <em>character song</em> — música narrada em primeira pessoa por um personagem. " +
          "Quem fala é Arthur Cervero, de Ordem Paranormal (o RPG de terror criado por Cellbit): " +
          "músico de Carpazinha, ex-integrante da gangue “Gaudérios Abutres”, que perde amigos e " +
          "família para o paranormal e acaba à frente da Equipe Abutres. A faixa comprime esse arco " +
          "em quase seis minutos e termina onde o título anuncia: sem nunca mais fechar os olhos."
      },
      {
        icon: "🎧",
        title: "O artista",
        text:
          "Shooter_sz é um artista brasileiro da cena de <strong>rap geek</strong> — hip-hop feito " +
          "sobre anime, games e RPG. Tem mais de 40 faixas catalogadas, quase todas construídas " +
          "em torno de um personagem, com instrumentais que misturam batida de rap e guitarra. " +
          "Não publica biografia oficial: tudo aqui vem das páginas de streaming e de bases públicas de letras."
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

    /* --- Significado --- */
    themesTitle: "O que a música quer dizer",
    themes: [
      {
        icon: "🕯️",
        title: "Luto que não passa",
        text:
          "A perda não é acontecimento encerrado: ela continua presente, ocupando espaço " +
          "em cada decisão que o personagem toma dali em diante."
      },
      {
        icon: "⚖️",
        title: "A culpa de quem ficou",
        text:
          "Existe uma pergunta latente — por que eu e não eles? O peso não é resolvido, " +
          "é convertido em combustível. Sobreviver deixa de ser sorte e vira dívida."
      },
      {
        icon: "🦅",
        title: "O abutre como símbolo",
        text:
          "Os abutres não aparecem como imagem de morte, mas de sobrevivência: os que resistem " +
          "onde nada mais resiste. A dor rebatizada como identidade e brasão de equipe."
      },
      {
        icon: "👁️",
        title: "A vigília do título",
        text:
          "“Olhos sempre abertos” é promessa e sentença. Significa não ser pego de surpresa " +
          "outra vez — e também nunca mais poder descansar. Proteger custa a guarda baixa."
      }
    ],

    feelingsTitle: "Sentimentos que a faixa transmite",
    feelings: ["Luto", "Culpa", "Revolta", "Lealdade", "Determinação", "Esperança teimosa"],

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
        text: "Começa contida e vai ganhando corpo. Quase seis minutos é tempo raro no rap — aqui o tempo é usado para narrar." },
      { icon: "🎸", title: "Guitarra no lugar do sample",
        text: "O instrumental puxa para o rock. Não é acaso: o personagem é músico, e a guitarra é o instrumento dele." },
      { icon: "🖼️", title: "A capa conta a mesma história",
        text: "Mão tatuada, violão e uma foto antiga colada no instrumento: memória grudada naquilo que o personagem usa para seguir." }
    ],

    /* --- Momentos que marcam (sem reproduzir a letra) --- */
    momentsTitle: "Momentos que marcam",
    momentsLede:
      "Em vez de reproduzir a letra, os momentos-chave estão descritos e comentados. " +
      "A letra completa está nos canais oficiais.",

    moments: [
      {
        time: "Início",
        title: "O chão sumindo",
        what: "A canção abre no vazio deixado pela perda: alguém sozinho tentando medir o tamanho do que acabou de acontecer.",
        why: "Antes de qualquer promessa, é preciso mostrar o buraco que ela vai tentar preencher."
      },
      {
        time: "Virada",
        title: "O posto herdado",
        what: "Alguém que ninguém esperava acaba tendo que liderar — não por talento, mas por não haver mais ninguém.",
        why: "É aqui que o luto para de ser destino e passa a ser função."
      },
      {
        time: "Refrão",
        title: "A promessa aos mortos",
        what: "O compromisso central da faixa: proteger quem restou, custe o que custar.",
        why: "É o coração da música e a razão do título — a vigilância como preço da lealdade."
      },
      {
        time: "Encerramento",
        title: "Sem descanso",
        what: "A faixa fecha em determinação, não em alívio. Nada foi curado; algo foi decidido.",
        why: "Justifica os quase seis minutos: a música não busca conforto, busca conclusão."
      }
    ],

    disclaimer:
      "Significado, análise e medidores são leitura interpretativa, construída a partir das imagens " +
      "da letra e do arco do personagem nas fontes oficiais — não são dados divulgados pelo artista. " +
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
