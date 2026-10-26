# B3PZ World — prompt audio per Gemini

Genera un file per volta. Musica strumentale originale, senza citare o imitare melodie di console o giochi esistenti. Niente voce, parlato, watermark sonoro o finali bruschi. Esporta WAV se possibile; per il sito useremo MP3 o OGG. Tieni i volumi omogenei e lascia margine sul master (niente clipping).

## 01 — Console: musica del menu
Nome: console-menu.mp3

Crea un brano strumentale originale per il menu di B3PZ World, una console virtuale indipendente. Atmosfera blu notte e viola, spazio, meraviglia, nostalgia dei menu di fine anni Novanta. Ambient elettronica a 78 BPM, pad caldi e ariosi, piccoli arpeggi cristallini e un basso morbido. Melodia minimale, accogliente e riconoscibile, nessuna batteria aggressiva. Deve poter restare in sottofondo a lungo senza stancare. Durata 90–120 secondi. Loop senza interruzioni: stessa armonia, ambiente e livello all’inizio e alla fine; niente intro o dissolvenza finale. Niente voci. Non imitare temi esistenti.

## 02 — Logo di avvio
Nome: console-boot.mp3

Crea un logo sonoro originale di 4 secondi: un soffio sintetico spaziale, tre note cristalline ascendenti e un accordo caldo luminoso con coda breve. Sensazione: una piccola console si accende e apre un universo di giochi. Nostalgia tecnologica, meraviglia, nessuna voce, nessun impatto forte, nessuna citazione di loghi sonori esistenti. Attacco immediato, coda completamente conclusa entro 4 secondi.

## 03 — Scorrimento copertine
Nome: console-select.mp3

Crea un singolo effetto UI originale di 0,12–0,2 secondi per scorrere copertine in un menu console. Un piccolo blip sintetico morbido e cristallino, rapido, delicato, appena intonato. Nessun riverbero lungo, nessuna voce, nessun fruscio. Deve essere gradevole anche ripetuto molte volte.

## 04 — Conferma
Nome: console-confirm.mp3

Crea un singolo effetto UI originale di 0,3–0,5 secondi: due piccole note sintetiche ascendenti, morbide e luminose, che confermano la selezione di un gioco. Stesso timbro cristallino dell’effetto di scorrimento. Nessuna voce, niente bassi esplosivi o riverbero lungo.

## 05 — PARTITION_99: 22:43
Nome: partition-2243.mp3

Crea un brano strumentale originale per PARTITION_99. Dicembre 1999, Valdarno, ore 22:43: una stanza illuminata dal monitor, un vecchio computer appena acceso, ricordi e un mistero ancora nascosto. Ambient elettronica intima, circa 65 BPM, pad analogici soffusi, una semplice frase di piano elettrico, piccoli impulsi digitali distanti. All’inizio curiosità e calore domestico, sotto una lieve ambiguità inquietante. Niente jumpscare, niente horror dichiarato, niente modem invadente o voce. 90 secondi, loop morbido senza dissolvenza finale. Non anticipare la trama.

## Temi degli altri mondi
Usa ciascuna riga come prompt autonomo aggiungendo: “Brano strumentale originale, 90 secondi, loop continuo senza intro né fade finale, niente voci, nessuna imitazione di musiche esistenti.”

- **Orfeo — orfeo-theme.mp3:** Avventura investigativa tra città e archivi. Piano feltro, archi da camera e discreta elettronica, 76 BPM. Curiosità, tracce da ricostruire e malinconia luminosa. Nessun tono epico invadente.
- **Project Ranger Zero — ranger-theme.mp3:** Squadra di eroi fantascientifici, trasformazioni e robot giganti. Synth rock strumentale, 120 BPM, chitarre controllate, basso pulsante, melodia eroica originale. Energia e amicizia, adatto al menu.
- **Primal Sentinels — primal-theme.mp3:** Picchiaduro con titani e poteri. Elettronica arcade con percussioni incisive, 112 BPM, basso analogico, tema avventuroso deciso. Combattivo ma leggibile in sottofondo.
- **Primal Sentinels II — primal2-theme.mp3:** Seguito di un picchiaduro, sottotitolo Cuori di Stella. Synth cinematografici, 118 BPM, armonia cosmica, ritmo energico, tema di squadra e speranza con un accento più maturo.
- **Mamma mia, i marziani! — stivale-theme.mp3:** Cartoon anni Trenta e invasione aliena surreale. Swing strumentale giocoso, 125 BPM, clarinetto, ottoni leggeri, contrabbasso e batteria spazzolata, piccole punte sci-fi. Allegro e avventuroso.
- **SerieA 9000 SIM — sim-theme.mp3:** Menu di una simulazione calcistica nostalgica anni Novanta. Pop elettronico strumentale, 105 BPM, tastiere luminose e basso caldo. Attesa del campionato, concentrazione tattica, niente cori o telecronache.
- **Soccer Arcade 2000 — arcade-theme.mp3:** Calcio da cabinato fine anni Novanta. Breakbeat leggero, 128 BPM, synth sportivi e basso elastico, gancio melodico originale. Divertente e dinamico, niente fischi arbitrali o cori.
- **IT SHIFT 2D — it2d-theme.mp3:** Una giornata frenetica nel supporto informatico. Elettronica giocosa, 100 BPM, pluck digitali, piccoli accenti da ufficio e basso elastico. Ironia e concentrazione, non stressante.
- **IT SHIFT 3D — it3d-theme.mp3:** Un ufficio che diventa inquietante, estetica PSX. Dark ambient a pulsazione lenta, pad metallici lontani e note di piano rade. Tensione sottile, niente urla, jumpscare o picchi improvvisi.

## Collegamento al sito
Prima consegna utile: i quattro file console. I temi dei giochi sono facoltativi e restano separati dalle colonne sonore interne: non sostituiscono automaticamente l’audio dei giochi.

In catalog.js, worldAudio contiene i percorsi menu/boot/select/confirm. Inserire solo file realmente disponibili nella cartella assets/audio. La musica si avvia solo con consenso e interazione dell’utente; si interrompe quando parte un gioco o la pagina non è visibile. Suoni e musica si disattivano dalle impostazioni. Il sito usa già piccoli suoni sintetici quando non sono presenti file personalizzati.
