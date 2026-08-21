# 👁️ Olhos Sempre Abertos — Apresentação Interativa

Site-apresentação sobre a música **“Olhos Sempre Abertos”**, de **Shooter_sz** — uma
*character song* narrada pelo personagem Arthur Cervero, do universo **Ordem Paranormal**.

O projeto é um slideshow cinematográfico de 3 slides, com transições, animações,
gráficos, microinterações e um player ligado ao embed oficial do Spotify.

---

## ✨ O que tem dentro

| Slide | Conteúdo |
|-------|----------|
| 1 · Capa | Arte da faixa, título animado e botão “Começar apresentação” |
| 2 · A música | **Explicação narrada por voz de IA**, ficha técnica, contexto da faixa e do artista e análise visual (pilares, medidores de emoção e gráfico do arco narrativo) |
| 3 · Ouvir e encerrar | Player com controles próprios ligados ao Spotify oficial, mensagem final e atalhos |

**Recursos**

- Navegação por botões, teclado (`←` `→` `Home` `End` `Espaço`), roda do mouse,
  clique no fundo e *swipe* no celular
- Barra de progresso da apresentação, contador, indicadores clicáveis e aviso
  de rolagem quando o slide continua abaixo
- Fundo cinematográfico com parallax, partículas em `<canvas>`, raios de luz e grão de filme
- Glassmorphism, gradientes, blur, *tilt* 3D nas artes e brilho que segue o cursor
- Endereço sincronizado com o slide (`#capa`, `#musica`, `#ouvir`) para link direto
- Respeita `prefers-reduced-motion` e funciona de 320 px a telas ultrawide

---

## 🗣️ Narração por voz de IA

O slide 2 tem um bloco de **explicação falada**. A voz é sintetizada na hora pela
[Web Speech API](https://developer.mozilla.org/docs/Web/API/Web_Speech_API) do
próprio navegador:

- **Sem chave de API e sem custo** — nada é enviado para fora do navegador.
- **Sem áudio hospedado** — não existe arquivo de voz no repositório.
- Controles de **play / pausa / parar**, escolha de **voz** e de **velocidade**.
- A **transcrição fica visível** e destaca a frase que está sendo lida; clicar
  numa frase começa a leitura dali.
- A narração **para sozinha** ao sair do slide ou ao dar play na música — as duas
  nunca tocam ao mesmo tempo.
- Se o navegador não tiver síntese de voz, o bloco avisa e o texto continua legível.

O roteiro fica em `js/data.js → story.narration.script`, uma frase por item.
Escreva números por extenso (“cinco e quarenta e nove” em vez de “5:49”): a voz
lê muito melhor assim.

As vozes vêm do sistema operacional e têm nomes crus (*Daniel*, *Maria*,
*Francisca*…). No seletor elas aparecem numeradas — **Narrador 1 — voz grave**,
**Narrador 2 — voz clara**, **Narrador 3 — voz neutra** — e o nome real do
sistema continua visível ao passar o mouse sobre a opção.

Para mudar isso, edite `js/data.js → story.narration.voiceNames`: `base` é o
nome (numerado automaticamente conforme a quantidade de vozes), `timbres`
traduz nomes conhecidos do sistema numa descrição curta e `padrao` cobre as
vozes que não estiverem na lista. Voz fora de pt-BR ganha o código do idioma
no fim, como aviso de que pode sair com sotaque.

> As vozes disponíveis dependem do sistema operacional — no Windows com Chrome
> costumam ser duas em pt-BR.

---

## 🚀 Rodando localmente

O projeto é **HTML, CSS e JavaScript puros** — não precisa de build nem de dependências.

**Opção 1 — abrir direto**

Dê dois cliques em `index.html`. Funciona, inclusive offline (a capa cai para a
arte do Spotify quando há internet).

**Opção 2 — servidor local** (recomendado, o embed do Spotify se comporta melhor)

```bash
npm run dev
```

Depois acesse <http://localhost:3000>.

> Alternativas equivalentes: `npx serve .`, `python -m http.server 3000`
> ou a extensão **Live Server** do VS Code.

---

## 📂 Estrutura

```
.
├── index.html            # Casca da página: HUD, deck, navegação
├── css/
│   ├── base.css          # Tokens de design, reset, botões e cards
│   ├── animations.css    # Keyframes, revelações e transição entre slides
│   ├── layout.css        # Cenário de fundo, HUD, deck e navegação
│   └── slides.css        # Estilos específicos de cada slide
├── js/
│   ├── data.js           # ← TODO O CONTEÚDO fica aqui (track, cover, story, finale)
│   ├── slides.js         # Um render por slide (a “camada de componentes”)
│   ├── effects.js        # Partículas, parallax, reveal e microinterações
│   ├── player.js         # Integração com a IFrame API do Spotify
│   ├── narrator.js       # Narração por voz sintetizada (Web Speech API)
│   ├── deck.js           # Motor de navegação da apresentação
│   └── main.js           # Inicialização
├── assets/               # Capa opcional (veja assets/README.md)
├── package.json
├── vercel.json
└── README.md
```

---

## ✏️ Como editar

**Textos, dados e links:** só `js/data.js`. São quatro blocos comentados —
`track` (dados da faixa), `cover` (slide 1), `story` (slide 2) e `finale`
(slide 3). Troque as strings e recarregue; nenhum outro arquivo precisa ser tocado.

**Cores e tipografia:** as variáveis no topo de `css/base.css` (`:root`).
Trocar `--gold`, `--jade` e `--bg` muda a atmosfera do site inteiro.

**Ordem ou quantidade de slides:** o array `window.APP_SLIDES`, no fim de
`js/slides.js`. Adicionar um slide = escrever uma função `render()` e registrá-la ali.

**Capa da música:** salve sua imagem em `assets/cover.jpg`. Sem esse arquivo, o
site usa automaticamente a arte oficial do Spotify.

---

## 🔊 Sobre a reprodução

Nenhum áudio é hospedado neste projeto. O slide 3 usa a
**IFrame API oficial do Spotify**: os controles personalizados (play, pause,
avançar, retroceder e barra de progresso) comandam o player oficial incorporado.

- Com uma conta Spotify conectada no navegador, a faixa toca por inteiro.
- Sem login, o Spotify libera apenas a prévia — é uma regra da plataforma.
- O **volume** é gerenciado pelo próprio Spotify: a API de embed não expõe esse
  controle, então o slider aparece desativado nesse modo.
- Se o embed não carregar, o site degrada sozinho para o botão “Ouvir no Spotify”.

Quem tiver direito sobre um arquivo de áudio pode apontá-lo em
`js/data.js → track.localAudio`; nesse modo todos os controles funcionam,
inclusive o volume. **Não** faça isso com material protegido.

---

## ▲ Publicando na Vercel

O `vercel.json` já deixa tudo configurado (site estático, sem build).

**Pelo painel (mais simples)**

1. Suba o projeto para um repositório no GitHub.
2. Em <https://vercel.com/new>, escolha **Import Git Repository**.
3. Selecione o repositório e clique em **Deploy** — não altere nenhuma configuração:
   framework `Other`, sem build command, output `.`.

**Pela CLI**

```bash
npx vercel
```

Para publicar em produção:

```bash
npx vercel --prod
```

---

## 🐙 Enviando para o GitHub

```bash
git init
git add .
git commit -m "Apresentação interativa: Olhos Sempre Abertos"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/olhos-sempre-abertos.git
git push -u origin main
```

> Nenhum token, senha ou chave de API é usado neste projeto — não há nada
> sensível para proteger no código.

---

## 📚 Fontes consultadas

As informações factuais do site vêm de:

- [Spotify — faixa oficial](https://open.spotify.com/intl-pt/track/1yxSZQfNaJv5eUl8xZMVvz)
- [Apple Music — single (data, formato, duração)](https://music.apple.com/us/album/olhos-sempre-abertos-single/1800553716)
- [Cifra Club — créditos de composição](https://www.cifraclub.com.br/338658/olhos-sempre-abertos-arthur-cervero-ordem-paranormal/letra/)
- [Letras.mus.br — discografia do artista](https://www.letras.mus.br/338658/)
- [YouTube — canal oficial](https://www.youtube.com/@Shooter_sz)
- [Ordem Paranormal Wiki — Arthur Cervero](https://ordemparanormal.fandom.com/wiki/Arthur_Cervero)

O bloco de **análise** e a narração são leituras interpretativas e estão
sinalizados como tal dentro do próprio site.

---

## ⚖️ Direitos

Projeto independente, feito por fãs, **sem vínculo** com Shooter_sz, com o Spotify
ou com Ordem Paranormal.

- A letra **não** é reproduzida — os textos são descrições e comentários originais,
  com link para a letra oficial no rodapé do slide 2.
- O áudio **não** é hospedado — a reprodução é sempre pelo player oficial.
- Todos os direitos da música pertencem aos seus autores.

O código deste repositório está sob licença MIT. O conteúdo referente à obra
musical pertence aos respectivos detentores.
