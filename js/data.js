/* =========================================================
   DATA — todo o conteúdo da apresentação em um só lugar.
   Para editar textos, mexa APENAS neste arquivo.
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

  /* -------------------------------------------------------
     SLIDE 1 — Capa
     ------------------------------------------------------- */
  cover: {
    eyebrow: "Apresentação musical",
    kicker: "Uma character song do universo Ordem Paranormal",
    cta: "Começar apresentação",
    tags: ["Single · 2025", "Rap geek", "5:49"]
  },

  /* -------------------------------------------------------
     SLIDE 2 — Sobre a música
     ------------------------------------------------------- */
  about: {
    eyebrow: "Slide 02",
    title: "Sobre a música",
    lede:
      "“Olhos Sempre Abertos” é uma <em>character song</em>: uma música escrita na " +
      "pele de um personagem. Aqui, quem canta é Arthur Cervero — o músico e motoqueiro " +
      "de Carpazinha que perde tudo e acaba virando líder de uma equipe que nunca pediu para liderar.",

    facts: [
      { icon: "🎵", label: "Faixa",       value: "Olhos Sempre Abertos" },
      { icon: "🎤", label: "Artista",     value: "Shooter_sz" },
      { icon: "📅", label: "Lançamento",  value: "3 de março de 2025" },
      { icon: "💿", label: "Formato",     value: "Single (1 faixa)" },
      { icon: "⏱️", label: "Duração",     value: "5:49" },
      { icon: "🎸", label: "Gênero",      value: "Rap nacional / rap geek" },
      { icon: "✍️", label: "Composição",  value: "Calebe e Shooter_sz" },
      { icon: "👁️", label: "Universo",    value: "Ordem Paranormal" }
    ],

    blocks: [
      {
        title: "O que é uma character song?",
        text:
          "É uma música narrada em primeira pessoa por um personagem de ficção. Não é " +
          "trilha sonora nem paródia: a letra funciona como um monólogo interno, contando " +
          "a história pelo ponto de vista de quem a viveu. É um formato muito forte na cena " +
          "do rap geek brasileiro."
      },
      {
        title: "Quem é Arthur Cervero?",
        text:
          "Personagem de Ordem Paranormal, o RPG de terror brasileiro criado por Cellbit. " +
          "Arthur é músico e estudante de psicologia, natural de Carpazinha (RS), e integrava a " +
          "gangue de motoqueiros “Gaudérios Abutres”. Depois de perder amigos e família para o " +
          "paranormal, entra para a Ordo Realitas e é colocado à frente da Equipe Abutres."
      },
      {
        title: "A proposta da faixa",
        text:
          "A música pega esse arco inteiro e comprime em quase seis minutos: começa no luto, " +
          "atravessa a culpa e termina em promessa. O título é a tese da canção — depois de " +
          "perder gente demais por não ter visto o perigo chegar, o personagem decide nunca " +
          "mais fechar os olhos."
      }
    ],

    sources: [
      { label: "Apple Music (data, formato e duração)", url: "https://music.apple.com/us/album/olhos-sempre-abertos-single/1800553716" },
      { label: "Cifra Club (créditos de composição)",   url: "https://www.cifraclub.com.br/338658/olhos-sempre-abertos-arthur-cervero-ordem-paranormal/letra/" },
      { label: "Ordem Paranormal Wiki (personagem)",    url: "https://ordemparanormal.fandom.com/wiki/Arthur_Cervero" }
    ]
  },

  /* -------------------------------------------------------
     SLIDE 3 — Sobre o artista
     ------------------------------------------------------- */
  artist: {
    eyebrow: "Slide 03",
    title: "Sobre o artista",
    lede:
      "Shooter_sz é um artista brasileiro da cena de <strong>rap geek</strong> — o subgênero do " +
      "hip-hop nacional que transforma anime, games, quadrinhos e RPG em música.",

    stats: [
      { value: "40+",  label: "Músicas catalogadas" },
      { value: "2025", label: "Ano do single" },
      { value: "BR",   label: "Cena rap geek" }
    ],

    blocks: [
      {
        icon: "🎧",
        title: "O estilo",
        text:
          "Faixas construídas em torno de um personagem: cada música adota uma voz, um " +
          "trauma e um arco narrativo específicos. O instrumental costuma misturar batida de " +
          "rap com guitarras e climas de trilha — por isso a faixa aparece catalogada ora como " +
          "rap/hip-hop, ora como rock."
      },
      {
        icon: "🤝",
        title: "Colaborações",
        text:
          "Aparece em faixas conjuntas com outros nomes da cena, como ArkKing5, Shaman, " +
          "Seven_sz e OShadowOficial — formato comum no rap geek, em que cada convidado " +
          "assume um personagem diferente na mesma música."
      },
      {
        icon: "📡",
        title: "Onde ouvir",
        text:
          "A discografia está distribuída oficialmente no Spotify, Apple Music, Deezer, " +
          "Amazon Music e YouTube. O canal do artista no YouTube reúne os lançamentos com arte e vídeo."
      }
    ],

    works: [
      { song: "Abismo",              char: "Subaru" },
      { song: "Lágrimas de Ódio",    char: "Guts (Berserk)" },
      { song: "Refém",               char: "Itadori" },
      { song: "Artista Viajante",    char: "Spike (Cowboy Bebop)" },
      { song: "Doente",              char: "Shinji Ikari (Evangelion)" },
      { song: "Cinzas do Passado",   char: "Aki" },
      { song: "Cercado por Almas",   char: "Noah (Sense Life)" },
      { song: "DEATH SQUAD",         char: "Soul Eater" },
      { song: "Pétalas e Cicatrizes",char: "Ordem Paranormal" },
      { song: "Lapso Temporal",      char: "—" }
    ],

    disclaimer:
      "O artista não publica uma biografia oficial detalhada. As informações acima vêm das " +
      "páginas oficiais de streaming e de bases públicas de letras — nada aqui foi presumido.",

    sources: [
      { label: "Perfil no Spotify",   url: "https://open.spotify.com/artist/4NO7fX47IDh3lZxK6ViJKf" },
      { label: "Canal no YouTube",    url: "https://www.youtube.com/@Shooter_sz" },
      { label: "Discografia (Letras)",url: "https://www.letras.mus.br/338658/" }
    ]
  },

  /* -------------------------------------------------------
     SLIDE 4 — Significado
     ------------------------------------------------------- */
  meaning: {
    eyebrow: "Slide 04",
    title: "O significado da música",
    lede:
      "A faixa percorre um caminho muito claro: <strong>perda → culpa → responsabilidade → promessa</strong>. " +
      "É uma música sobre o que sobra de uma pessoa quando tudo que ela amava foi levado — e sobre " +
      "o que ela decide fazer com o que sobrou.",

    themes: [
      {
        icon: "🕯️",
        title: "Luto e ausência",
        text:
          "O ponto de partida é a perda. A canção não trata a morte dos próximos como " +
          "acontecimento passado e resolvido: ela permanece presente, ocupando espaço em " +
          "cada decisão que o personagem toma dali em diante."
      },
      {
        icon: "⚖️",
        title: "A culpa de quem ficou",
        text:
          "Existe uma pergunta latente na música — por que eu e não eles? Esse peso não é " +
          "resolvido; é convertido em combustível. Sobreviver deixa de ser sorte e vira dívida."
      },
      {
        icon: "🦅",
        title: "O abutre como símbolo",
        text:
          "Os abutres não aparecem como imagem de morte, mas de sobrevivência: são os que " +
          "resistem onde nada mais resiste. O nome carregado da antiga gangue vira brasão " +
          "de uma nova equipe — a dor rebatizada como identidade."
      },
      {
        icon: "🩹",
        title: "Cicatrizes que não somem",
        text:
          "A música rejeita a ideia de que o tempo cura. As marcas continuam ali; a mudança " +
          "não é a ferida fechar, e sim o personagem aprender a carregá-la sem se ajoelhar."
      },
      {
        icon: "👑",
        title: "Liderança que ninguém pediu",
        text:
          "Alguém subestimado se descobre responsável por manter os outros vivos. A liderança " +
          "aqui não é conquista nem glória: é um posto herdado à força, aceito por não haver " +
          "mais ninguém para assumi-lo."
      },
      {
        icon: "👁️",
        title: "A vigília do título",
        text:
          "“Olhos sempre abertos” é promessa e sentença ao mesmo tempo. Significa não ser " +
          "pego de surpresa outra vez — mas também significa nunca mais poder descansar. " +
          "Proteger alguém custa o direito de baixar a guarda."
      }
    ],

    feelings: ["Luto", "Culpa", "Revolta", "Lealdade", "Determinação", "Esperança teimosa"],

    disclaimer:
      "Esta é uma leitura interpretativa, construída a partir dos temas e das imagens da letra " +
      "e do arco do personagem nas fontes oficiais. Interpretações de arte são discutíveis por natureza."
  },

  /* -------------------------------------------------------
     SLIDE 5 — Análise
     ------------------------------------------------------- */
  analysis: {
    eyebrow: "Slide 05",
    title: "Análise da faixa",
    lede: "Uma leitura visual da música: do que ela fala, como ela soa e o que ela deixa.",

    pillars: [
      { icon: "🎯", label: "Tema principal", value: "Transformar perda em propósito",
        text: "A dor não é o destino da música — é o ponto de partida dela." },
      { icon: "🌫️", label: "Clima", value: "Épico melancólico",
        text: "Peso de trilha sonora com sujeira de rap: grave, tenso e crescente." },
      { icon: "📣", label: "Mensagem", value: "Ninguém mais morre sob a minha guarda",
        text: "Uma promessa feita para os mortos e cobrada dos vivos." },
      { icon: "🧭", label: "Ponto de vista", value: "Primeira pessoa",
        text: "Monólogo interno do personagem: você ouve por dentro da cabeça dele." }
    ],

    emotions: [
      { label: "Determinação", value: 95 },
      { label: "Luto",         value: 88 },
      { label: "Melancolia",   value: 80 },
      { label: "Revolta",      value: 72 },
      { label: "Solidão",      value: 70 },
      { label: "Esperança",    value: 52 }
    ],

    arc: {
      caption: "Arco emocional ao longo dos 5:49",
      points: [
        { label: "Abertura",   value: 30, note: "Silêncio e perda" },
        { label: "Choque",     value: 52, note: "A ficha caindo" },
        { label: "Culpa",      value: 46, note: "Por que eu?" },
        { label: "Virada",     value: 74, note: "Aceitar o posto" },
        { label: "Refrão",     value: 92, note: "A promessa" },
        { label: "Confronto",  value: 84, note: "Enfrentar o que vem" },
        { label: "Desfecho",   value: 96, note: "Olhos abertos" }
      ]
    },

    highlights: [
      { icon: "📈", title: "Construção em crescendo",
        text: "A faixa começa contida e vai ganhando corpo. Quase seis minutos é tempo raro no rap — e aqui o tempo é usado para narrar, não para encher." },
      { icon: "🎸", title: "Guitarra no lugar do sample",
        text: "O instrumental puxa para o rock. Não é acaso: o personagem é músico, e a guitarra é literalmente o instrumento dele." },
      { icon: "🗣️", title: "Narrativa acima da rima",
        text: "As escolhas de escrita servem à história. A música tem começo, meio e virada, como um capítulo — não como uma sequência de punchlines." },
      { icon: "🖼️", title: "A capa conta a mesma história",
        text: "Mão tatuada, violão e uma foto antiga colada no corpo do instrumento: memória grudada naquilo que o personagem usa para seguir em frente." }
    ],

    disclaimer:
      "Os medidores acima representam uma leitura qualitativa da faixa — não são dados " +
      "medidos por software nem informação divulgada pelo artista."
  },

  /* -------------------------------------------------------
     SLIDE 6 — Trechos / destaques
     ------------------------------------------------------- */
  moments: {
    eyebrow: "Slide 06",
    title: "Momentos que marcam",
    lede:
      "Em vez de reproduzir a letra, os momentos-chave da música estão descritos e comentados abaixo. " +
      "A letra completa está disponível nos canais oficiais.",

    items: [
      {
        time: "Início",
        title: "O chão sumindo",
        what: "A canção abre no vazio deixado pela perda: um personagem sozinho, tentando entender o tamanho do que acabou de acontecer.",
        why: "Estabelece o tom da faixa. Antes de qualquer promessa, é preciso mostrar o buraco que ela vai tentar preencher."
      },
      {
        time: "1º bloco",
        title: "A pergunta sem resposta",
        what: "O foco vira para dentro: a culpa de continuar respirando enquanto os outros não continuaram.",
        why: "É o momento mais humano da música — e o que impede o personagem de virar herói de papelão."
      },
      {
        time: "Virada",
        title: "O posto herdado",
        what: "Alguém que ninguém esperava acaba tendo que liderar. Não por talento, mas por não haver mais ninguém.",
        why: "Aqui a música muda de direção: o luto para de ser destino e passa a ser função."
      },
      {
        time: "Refrão",
        title: "A promessa aos mortos",
        what: "O compromisso central da faixa — proteger quem restou, custe o que custar.",
        why: "É o coração da música e a razão do título: a vigilância vira preço a pagar pela lealdade."
      },
      {
        time: "Imagem central",
        title: "Os abutres",
        what: "A imagem dos abutres percorre a canção como emblema de quem sobrevive no lugar onde tudo morreu.",
        why: "Ressignifica um símbolo negativo. O que era carniça vira bandeira de resistência."
      },
      {
        time: "Encerramento",
        title: "Sem descanso",
        what: "A faixa fecha em determinação, não em alívio. Nada foi curado — algo foi decidido.",
        why: "Justifica os quase seis minutos: a música não busca conforto, busca conclusão."
      }
    ],

    copyright:
      "Por respeito aos direitos autorais, nenhum verso é reproduzido aqui. Os textos acima são " +
      "descrições e comentários originais sobre a obra."
  },

  /* -------------------------------------------------------
     SLIDE 7 — Player
     ------------------------------------------------------- */
  player: {
    eyebrow: "Slide 07",
    title: "Ouça a música",
    lede:
      "Reprodução pelo player oficial do Spotify. Os controles abaixo comandam a própria " +
      "faixa — nada de áudio hospedado por fora.",

    tips: [
      "Com uma conta Spotify conectada no navegador, a faixa toca por inteiro.",
      "Sem login, o Spotify libera apenas uma prévia da música.",
      "O botão verde abre a faixa no aplicativo oficial."
    ]
  },

  /* -------------------------------------------------------
     SLIDE 8 — Encerramento
     ------------------------------------------------------- */
  outro: {
    eyebrow: "Slide 08",
    title: "Olhos Sempre Abertos",
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
