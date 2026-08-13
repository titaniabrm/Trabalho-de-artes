# Pasta de assets

## Capa da música (`cover.jpg`)

Por padrão o site usa a **arte oficial servida pelo CDN do Spotify** — nenhuma
imagem é redistribuída neste repositório e a pasta pode ficar vazia.

Para usar uma imagem local (funciona offline e carrega mais rápido):

1. Salve a arte da faixa como `cover.jpg` dentro desta pasta.
   Ideal: imagem quadrada, 640×640 px ou maior.
2. Em `js/data.js`, troque o valor de `cover`:

   ```js
   cover: "assets/cover.jpg",
   coverFallback: "https://i.scdn.co/image/ab67616d0000b27333d44427d14430f0fa6670c3"
   ```

3. Recarregue a página.

## Áudio local (opcional)

O projeto **não** hospeda o áudio da música. A reprodução acontece pelo player
oficial do Spotify.

Se você tiver o direito de distribuir um arquivo de áudio, coloque-o aqui e
aponte o caminho em `js/data.js`:

```js
localAudio: "assets/audio.mp3",
```

Nesse modo, todos os controles do player passam a funcionar, inclusive o volume.
Arquivos `.mp3` e `.wav` já estão no `.gitignore` para evitar envio acidental ao
repositório.
