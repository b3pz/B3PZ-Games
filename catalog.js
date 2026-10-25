const games = [
{repo:'PARTITION_99',title:'PARTITION_99',cover:'PARTITION_99',category:'Avventura e mistero',genre:'Avventura investigativa',image:'partition.webp',accent:'#526b58',sub:'Un computer. Un segreto.',description:'Dicembre 1999, Valdarno. Accendi un vecchio computer, collegati con il modem e segui le tracce di un mistero nascosto tra file, chat e ricordi.',tags:['Thriller tecnologico','Investigazione','Anni ’90']},
{repo:'Orfeo',title:'Orfeo',cover:'ORFEO',category:'Avventura e mistero',genre:'Avventura grafica · Punta e clicca',image:'orfeo.webp',accent:'#a07950',sub:'Ogni traccia ha una storia.',description:'Due protagonisti, un mistero da ricostruire. Esplora, conversa e combina gli oggetti in un’avventura tra città, archivi ed enigmi.',tags:['Punta e clicca','Enigmi','Due protagonisti']},
{repo:'Ranger_Zero',title:'Project Ranger Zero',cover:'RANGER\nZERO',category:'Azione',genre:'Avventura d’azione narrativa',image:'ranger.webp',accent:'#793c3c',sub:'Trasformati. Scegli. Combatti.',description:'Una squadra di Ranger, trasformazioni e robot giganti. Alterna esplorazione, dialoghi e combattimenti in un’avventura fantascientifica.',tags:['Fantascienza','Combattimento','Storia']},
{repo:'Primal_Sentinel',title:'Primal Sentinels',cover:'PRIMAL\nSENTINELS',category:'Azione',genre:'Picchiaduro a scorrimento',image:'primal.webp',accent:'#876849',sub:'Il cuore dei titani',description:'Affronta ondate di nemici e boss con poteri speciali e titani. Un picchiaduro da sala giochi, da affrontare anche in cooperativa.',tags:['Picchiaduro','Cooperativa','Titani']},
{repo:'Primal_sentinel_II',title:'Primal Sentinels II',cover:'PRIMAL\nSENTINELS II',category:'Azione',genre:'Picchiaduro a scorrimento',image:'primal2.webp',accent:'#515383',sub:'Cuori di Stella',description:'I Sentinels tornano con nuove abilità, mosse di coppia e una nuova avventura. Un seguito tra combattimenti, titani e minigiochi.',tags:['Picchiaduro','Cooperativa','Cuori di Stella']},
{repo:'Stivale',title:'Mamma mia, i marziani!',cover:'MAMMA MIA,\nI MARZIANI!',category:'Azione',genre:'Run and gun · Platform d’azione',image:'stivale.webp',accent:'#b5944b',sub:'L’invasione ha inizio.',description:'Corri, salta e spara su un pianeta a forma di Stivale. Un’avventura arcade con eroi animali e un’estetica da cartone animato anni Trenta.',tags:['Corri e spara','Cartoon','Arcade']},
{repo:'SOCCERSIM9000',title:'SerieA 9000 SIM',cover:'SERIEA\n9000 SIM',category:'Sport',genre:'Simulazione calcistica tattica',image:'sim.webp',accent:'#44634b',sub:'La tua squadra. La tua stagione.',description:'Scegli la formazione, imposta la tattica e segui le partite simulate. Campionati, coppe e squadre del calcio anni Novanta e Duemila.',tags:['Calcio','Strategia','Simulazione']},
{repo:'soccer-arcade-2000',title:'Soccer Arcade 2000',cover:'SOCCER\nARCADE 2000',category:'Sport',genre:'Calcio arcade',image:'arcade.webp',accent:'#3a6172',sub:'Scendi in campo.',description:'Passaggi, dribbling, contrasti e tiri spettacolari. Controlla direttamente la squadra in un gioco di calcio ispirato ai cabinati anni Novanta.',tags:['Calcio','Arcade','Controllo diretto']},
{repo:'it-nightmare',title:'IT SHIFT · 2D',cover:'IT SHIFT\n2D',category:'Simulazione',genre:'Simulazione lavorativa · Minigiochi',image:'it2d.webp',accent:'#526349',sub:'A day in IT support',description:'Una giornata nel supporto informatico: ticket, riparazioni, colleghi e imprevisti. Gestisci priorità e stress e porta a termine il turno.',tags:['Vita in ufficio','Puzzle tecnici','Gestione del tempo']},
{repo:'Itshit',title:'IT SHIFT · 3D',cover:'IT SHIFT\n3D',category:'Avventura e mistero',genre:'Avventura narrativa horror',image:'it3d.webp',accent:'#626b42',sub:'Il turno non è come sembra.',description:'Una settimana in ufficio, un’atmosfera sempre più inquietante. Esplora lo studio e segui una storia horror con estetica ispirata alla prima PlayStation.',tags:['Horror','Estetica PSX','Finali multipli']}
];
const assetsByRepo = {
 'PARTITION_99':{key:'partition',logoCrop:{image:'logos/partition-source.webp',x:75,y:145,w:880,h:115,fullW:1024}},
 'Orfeo':{key:'orfeo',logoCrop:{image:'orfeo.webp',x:385,y:35,w:430,h:210,fullW:1200}},
 'Ranger_Zero':{key:'ranger',logo:'ranger'},
 'Primal_Sentinel':{key:'primal',logo:'primal'},
 'Primal_sentinel_II':{key:'primal2',logo:'primal2'},
 'Stivale':{key:'stivale',logo:'stivale'},
 'SOCCERSIM9000':{key:'sim',logo:'sim'},
 'soccer-arcade-2000':{key:'arcade',logo:'arcade'},
 'it-nightmare':{key:'it2d',logoCrop:{image:'it2d.webp',x:240,y:22,w:650,h:300,fullW:1200}},
 'Itshit':{key:'it3d',logoCrop:{image:'it3d.webp',x:72,y:120,w:410,h:75,fullW:1200},edition:'3D'}
};
games.forEach(g=>{Object.assign(g,assetsByRepo[g.repo]);g.coverImage='covers/'+g.key+'.webp';g.screens=[];});

const shotLabels = {"partition": ["Desktop NOVA 2000", "Connessione con il modem"], "orfeo": ["Menu principale", "Esplorazione e dialoghi"], "ranger": ["Menu principale"], "primal": ["Schermata del titolo", "Scelta del Sentinel", "Combattimento"], "primal2": ["Schermata del titolo", "Scelta del Sentinel", "Primo capitolo"], "stivale": ["Menu principale", "Scelta dell’eroe", "Briefing della missione"], "sim": ["Schermata iniziale", "Modalità di gioco", "Scelta delle squadre"], "moments": ["Schermata iniziale", "Stagione e classifica", "Partita in 3D"], "arcade": ["Schermata del titolo", "Modalità di gioco"], "it2d": ["Menu principale", "Inizio del turno"], "it3d": ["Menu principale", "Esplorazione dello studio"]};
games.forEach(g=>{g.screenLabels=shotLabels[g.key];g.screens=g.screenLabels.map((_,i)=>"assets/screenshots/"+g.key+"-"+(g.key==="arcade"?i+2:i+1)+".webp");});
games.forEach(g=>{g.video=g.video||null;});
