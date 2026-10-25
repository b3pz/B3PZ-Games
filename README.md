# B3PZ World

Console web e raccolta di 10 giochi indipendenti di B3PZ.

**Sito:** https://b3pz.github.io/B3PZ-Games/

## Esperienza
- Intro animata Welcome to B3PZ World, saltabile e rivedibile dal menu.
- Menu da console blu/viola con copertine scorrevoli e loghi originali.
- Categorie, preferiti locali e memoria dell'ultima selezione e dell'ultimo avvio.
- Pulsanti Gioca, Info gioco e Screenshot con galleria ingrandibile.
- Giochi aperti nella pagina, ritorno alla raccolta con avviso e opzione nuova scheda.
- Suoni sintetizzati del menu disattivati inizialmente, impostazioni CRT e animazioni ridotte.
- Navigazione con tastiera e touch; navigazione della raccolta con controller compatibile.

SerieA 9000 Moments e Mimmo Express sono esclusi dalla raccolta. Le repository dei giochi rimangono indipendenti.

## File
- index.html: console, intro, finestre e player.
- catalog.js: catalogo, percorsi delle copertine, loghi e screenshot.
- app.js: navigazione e interazioni.
- style.css: tema responsive ed effetti.
- assets/world-logo.webp: logo B3PZ World generato per questa console.
- assets/covers, assets/logos, assets/screenshots: risorse dei giochi.

Per provare in locale: `python3 -m http.server 8000`.

## Comandi
Frecce per sfogliare, Invio per giocare dalla selezione, I per le informazioni, S per gli screenshot, Esc per chiudere le finestre. Su controller: direzione sinistra/destra, A per giocare, B per tornare o chiudere, X per Info e Y per Screenshot (mappatura standard browser).

## Aggiungere un video demo
Il pulsante Video demo è nascosto quando il gioco non ha un filmato. Aggiungere una proprietà `video` al gioco in catalog.js con un percorso a un file MP4/WebM reale, per esempio `assets/videos/partition-demo.mp4`. Il player usa controlli nativi, non avvia il video automaticamente e lo ferma alla chiusura. Nessun filmato demo è incluso in questa versione.

I salvataggi dipendono dal singolo gioco e dal browser. Tornare alla raccolta chiude il gioco; la console non simula una pausa o una ripresa non supportata.

Provenienza delle immagini e limiti delle catture: docs/ASSETS.md.
