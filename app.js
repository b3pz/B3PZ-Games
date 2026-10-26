'use strict';
const $ = id => document.getElementById(id);
function readLocal(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
function writeLocal(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
const preferences = Object.assign({sound:false,music:false,crt:true,motion:matchMedia('(prefers-reduced-motion: reduce)').matches}, readLocal('b3pz:settings', {}));
let favorites = new Set(readLocal('b3pz:favorites', []).filter(repo => games.some(g => g.repo === repo)));
let recent = readLocal('b3pz:lastPlayed', null);
let filter = 'Tutti', favoritesOnly = false, developmentOnly = false, list = games.slice(), selected = Math.max(0, games.findIndex(g => g.repo === readLocal('b3pz:selected', 'PARTITION_99'))), playing = null;
let shotGame = null, shotSelection = 0, bootVisible = true, audioContext = null, toastTimer;
const categories = ['Tutti','Avventura e mistero','Azione','Sport','Simulazione'];
const gameUrl = g => `https://b3pz.github.io/${g.repo}/`;
const selectedGame = () => list[selected];
const activeDialog = () => document.querySelector('dialog[open]');
const toast = document.createElement('div'); toast.className = 'toast'; toast.role = 'status'; toast.hidden = true; document.body.append(toast);
function tell(message) { toast.textContent = message; toast.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.hidden = true; }, 2200); }
const menuMusic = new Audio(); menuMusic.loop=true; menuMusic.volume=.2;
function syncMusic(){if(worldAudio.menu && preferences.music && !playing && !document.hidden && !bootVisible){if(!menuMusic.src)menuMusic.src=worldAudio.menu;menuMusic.play().catch(()=>{});}else menuMusic.pause();}
function sound(kind = 'select') {
  if (!preferences.sound) return;
  if(worldAudio[kind]){const clip=new Audio(worldAudio[kind]);clip.volume=.3;clip.play().catch(()=>{});return;}
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') audioContext.resume();
    const notes = kind === 'boot' ? [261.63,392,523.25,783.99] : kind === 'confirm' ? [440,659.25] : [330];
    notes.forEach((frequency,i) => { const oscillator = audioContext.createOscillator(), gain = audioContext.createGain(), time = audioContext.currentTime + i * (kind === 'boot' ? .14 : .07); oscillator.type = 'sine'; oscillator.frequency.value = frequency; gain.gain.setValueAtTime(0,time); gain.gain.linearRampToValueAtTime(kind === 'boot' ? .045 : .025,time+.012); gain.gain.exponentialRampToValueAtTime(.001,time+.25); oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(time); oscillator.stop(time+.28); });
  } catch {}
}
function applyPreferences() {
  document.body.classList.toggle('no-crt', !preferences.crt);
  document.body.classList.toggle('reduce-motion', preferences.motion);
  $('sound-status').textContent = preferences.sound ? 'ON' : 'OFF';
  $('sound-toggle').setAttribute('aria-label', preferences.sound ? 'Disattiva suoni del menu' : 'Attiva suoni del menu');
  $('setting-music').checked=preferences.music; $('setting-music').disabled=!worldAudio.menu;
  syncMusic();
  $('setting-sound').checked = preferences.sound; $('setting-crt').checked = preferences.crt; $('setting-motion').checked = preferences.motion;
  writeLocal('b3pz:settings', preferences);
}
function enterWorld() {
  if (!bootVisible) return;
  bootVisible = false; $('collection').hidden = false; $('startup').classList.add('exiting');
  try { sessionStorage.setItem('b3pz:bootSeen','1'); } catch {}
  sound('boot'); syncMusic();
  setTimeout(() => { $('startup').hidden = true; $('carousel').focus({preventScroll:true}); }, preferences.motion ? 0 : 650);
}
function replayIntro() {
  if (playing || activeDialog()) return;
  bootVisible = true; syncMusic(); $('collection').hidden = true; $('startup').hidden = false;
  $('startup').classList.remove('exiting'); $('startup').classList.add('replayed'); $('enter-world').focus({preventScroll:true});
}
$('enter-world').onclick = enterWorld; $('skip-intro').onclick = enterWorld; $('replay-intro').onclick = replayIntro;
function drawFilters() {
  const nav = document.querySelector('.filters'); nav.replaceChildren();
  categories.forEach(category => {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = category;
    button.className = category === filter && !favoritesOnly && !developmentOnly ? 'active' : ''; button.setAttribute('aria-pressed', String(category === filter && !favoritesOnly && !developmentOnly));
    const count = document.createElement('small'); count.textContent = category === 'Tutti' ? games.length : games.filter(g => g.category === category).length; button.append(count);
    button.onclick = () => { sound(); filter = category; favoritesOnly = false; developmentOnly=false; refreshList(); };
    nav.append(button);
  });
  $('favorites-filter').classList.toggle('active',favoritesOnly); $('favorites-filter').setAttribute('aria-pressed',String(favoritesOnly));
  $('favorites-count').textContent = favorites.size;
}
function refreshList(keepRepo) {
  list = games.filter(g => developmentOnly ? g.development : favoritesOnly ? favorites.has(g.repo) : filter === 'Tutti' || g.category === filter);
  selected = Math.max(0, list.findIndex(g => g.repo === keepRepo));
  $('development-filter').setAttribute('aria-pressed',String(developmentOnly));
  drawFilters(); drawCovers();
}
function createCover(g,index) {
  const button = document.createElement('button'); button.className = 'cover'; button.type = 'button'; button.setAttribute('aria-label',`Seleziona ${g.title}`);
  const art = document.createElement('div'); art.className = 'art';
  const image = new Image(); image.src = 'assets/'+g.coverImage; image.alt = ''; image.draggable = false; art.append(image);
  const spine = document.createElement('div'); spine.className = 'spine'; spine.textContent = 'B3PZ WORLD · ORIGINAL COLLECTION';
  const panel = document.createElement('div'); panel.className = 'logo-panel';
  if (g.logoCrop) {
    const crop = g.logoCrop, window = document.createElement('div'); window.className = 'logo-window'; window.style.aspectRatio = crop.w+'/'+crop.h;
    const logo = new Image(); logo.src = 'assets/'+crop.image; logo.alt = g.title; logo.style.width = crop.fullW/crop.w*100+'%'; logo.style.left = -crop.x/crop.w*100+'%'; logo.style.top = -crop.y/crop.h*100+'%'; window.append(logo); panel.append(window);
  } else {
    const logo = new Image(); logo.src = 'assets/logos/'+g.logo+'.webp'; logo.alt = g.title; logo.className = 'original-logo'; panel.append(logo);
  }
  if (g.edition) { const edition = document.createElement('span'); edition.className = 'cover-edition'; edition.textContent = g.edition; panel.append(edition); }
  button.append(art,spine,panel);
  button.onclick = () => { if (selected !== index) sound(); selected = index; update(); };
  button.ondblclick = () => { selected = index; launch(); };
  return button;
}
function drawCovers() { $('carousel').replaceChildren(...list.map(createCover)); update(); }
function update() {
  const g = selectedGame(); $('empty').hidden = !!g; document.querySelector('.details').hidden = !g;
  $('counter').textContent = String(g ? selected+1 : 0).padStart(2,'0')+' / '+String(list.length).padStart(2,'0');
  $('category-label').textContent = developmentOnly ? 'IN SVILUPPO · WORK IN PROGRESS' : favoritesOnly ? 'I TUOI PREFERITI' : filter === 'Tutti' ? 'TUTTI I MONDI' : filter.toUpperCase();
  $('prev').disabled = $('next').disabled = list.length < 2;
  if (!g) return;
  const step = innerWidth <= 700 ? 169 : innerWidth < 1001 ? 173 : innerWidth >= 1600 ? 240 : 215;
  [...$('carousel').children].forEach((card,index) => {
    let offset = index-selected;
    if (offset > list.length/2) offset -= list.length;
    if (offset < -list.length/2) offset += list.length;
    const distance = Math.abs(offset);
    card.style.transform = `translateX(${offset*step}px) translateY(${-distance*9}px) translateZ(${-distance*140}px) rotateY(${offset === 0 ? 0 : offset > 0 ? -30 : 30}deg)`;
    card.style.opacity = distance > 2 ? '0' : distance === 2 ? '.38' : distance === 1 ? '.7' : '1';
    card.style.filter = distance ? `brightness(${distance === 1 ? .75 : .6}) saturate(.7)` : 'none';
    card.style.zIndex = String(10-distance); card.style.pointerEvents = distance > 2 ? 'none' : 'auto'; card.tabIndex = distance > 2 ? -1 : 0;
    card.classList.toggle('active',index === selected); card.setAttribute('aria-pressed',String(index === selected));
  });
  $('genre').textContent = g.genre.toUpperCase(); $('number').textContent = 'WORLD / '+String(games.indexOf(g)+1).padStart(2,'0');
  $('title').textContent = g.title; $('description').textContent = g.description; $('selection-subtitle').textContent = g.sub.toUpperCase();
  $('external').href = gameUrl(g); $('tags').replaceChildren(...g.tags.map(tag => { const span = document.createElement('span'); span.textContent = tag; return span; }));
  const favorite = favorites.has(g.repo); $('favorite').textContent = favorite ? '★' : '☆'; $('favorite').setAttribute('aria-pressed',String(favorite)); $('favorite').setAttribute('aria-label',(favorite ? 'Rimuovi dai preferiti: ' : 'Aggiungi ai preferiti: ')+g.title);
  $('screens-button').hidden = !g.screens.length; $('video-button').hidden = !g.video;
  document.documentElement.style.setProperty('--ambient',g.accent);
  const bg=$('game-backdrop');if(bg.dataset.repo!==g.repo){bg.dataset.repo=g.repo;bg.style.backgroundImage=`url("${g.backdrop}")`;} writeLocal('b3pz:selected',g.repo);
}
function move(delta) { if (list.length < 2) return; selected = (selected+delta+list.length)%list.length; sound(); update(); }
$('prev').onclick = () => move(-1); $('next').onclick = () => move(1);
window.addEventListener('resize',update);
function showAll() { filter='Tutti'; favoritesOnly=false; developmentOnly=false; refreshList(); }
$('home').onclick = showAll; $('show-all').onclick = showAll;
$('favorites-filter').onclick = () => { favoritesOnly = !favoritesOnly; developmentOnly=false; filter='Tutti'; sound(); refreshList(); };
$('favorite').onclick = () => {
  const g = selectedGame(); if (!g) return;
  if (favorites.has(g.repo)) { favorites.delete(g.repo); tell('Rimosso dai preferiti'); } else { favorites.add(g.repo); tell('Aggiunto ai preferiti'); }
  writeLocal('b3pz:favorites',[...favorites]); sound('confirm');
  if (favoritesOnly) refreshList(g.repo); else { drawFilters(); update(); }
};
let pointerStart = null, swiped = false;
$('carousel').addEventListener('pointerdown',event => { pointerStart={x:event.clientX,y:event.clientY}; swiped=false; });
$('carousel').addEventListener('pointerup',event => { if (!pointerStart) return; const dx=event.clientX-pointerStart.x,dy=event.clientY-pointerStart.y; if (Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)) { swiped=true; move(dx<0 ? 1 : -1); } pointerStart=null; });
$('carousel').addEventListener('pointercancel',() => { pointerStart=null; });
$('carousel').addEventListener('click',event => { if (swiped) { event.preventDefault(); event.stopImmediatePropagation(); swiped=false; } },true);
function showInfo() {
  const g=selectedGame(); if (!g || playing || bootVisible) return;
  $('info-title').textContent=g.title; $('info-genre').textContent=g.genre.toUpperCase(); $('info-description').textContent=g.description; $('info-category').textContent=g.category; $('info-controls').textContent=g.controls; $('info-status').textContent=g.status;
  $('info-tags').replaceChildren(...g.tags.map(tag=>{ const span=document.createElement('span'); span.textContent=tag; return span; }));
  sound('confirm'); $('info-dialog').showModal();
}
$('info').onclick=showInfo; $('close-info').onclick=()=>$('info-dialog').close();
$('info-play').onclick=()=>{ $('info-dialog').close(); launch(); };
$('info-screens').onclick=()=>{ $('info-dialog').close(); showScreens(); };
function showScreens() {
  const g=selectedGame(); if (!g?.screens.length || playing || bootVisible) return;
  shotGame=g; shotSelection=0; updateShot(); sound('confirm'); $('lightbox').showModal();
}
function updateShot() {
  $('shot-large').src=shotGame.screens[shotSelection]; $('shot-large').alt=shotGame.title+' — '+shotGame.screenLabels[shotSelection];
  $('shot-caption').textContent=shotGame.title+' · '+shotGame.screenLabels[shotSelection]; $('shot-index').textContent=(shotSelection+1)+' / '+shotGame.screens.length;
  $('shot-prev').disabled=$('shot-next').disabled=shotGame.screens.length<2;
  $('shot-thumbs').replaceChildren(...shotGame.screens.map((src,index)=>{ const button=document.createElement('button'); button.classList.toggle('active',index===shotSelection); button.setAttribute('aria-label','Mostra screenshot '+(index+1)); const image=new Image(); image.src=src; image.alt=''; button.append(image); button.onclick=()=>{shotSelection=index;updateShot();};return button; }));
}
function moveShot(delta) { if (!shotGame) return; shotSelection=(shotSelection+delta+shotGame.screens.length)%shotGame.screens.length; updateShot(); }
$('screens-button').onclick=showScreens; $('close-shot').onclick=()=>$('lightbox').close(); $('shot-prev').onclick=()=>moveShot(-1); $('shot-next').onclick=()=>moveShot(1);
$('lightbox').addEventListener('click',event=>{ if (event.target===$('lightbox')) $('lightbox').close(); });
$('video-button').onclick=()=>{const g=selectedGame();if(!g?.video)return;$('video-title').textContent=g.title;$('demo-video').src=g.video;$('video-dialog').showModal();};
$('close-video').onclick=()=>$('video-dialog').close();$('video-dialog').addEventListener('close',()=>{$('demo-video').pause();$('demo-video').removeAttribute('src');$('demo-video').load();});
$('development-filter').onclick=()=>{developmentOnly=!developmentOnly;favoritesOnly=false;filter='Tutti';sound();refreshList();};
$('about').onclick=()=>{sound('confirm');$('about-dialog').showModal();};$('close-about').onclick=()=>$('about-dialog').close();
$('resume').onclick=()=>{const g=games.find(g=>g.repo===recent?.repo);if(!g)return;filter='Tutti';favoritesOnly=false;developmentOnly=false;refreshList(g.repo);launch();};
function updateRecent() { const g=games.find(g=>g.repo===recent?.repo); $('resume').hidden=!g;$('resume-title').textContent=g?.title||'';$('resume').title='Riapre il gioco. Ripristina la partita dal menu del gioco, se disponibile.'; $('last-played').textContent=g ? 'ULTIMO AVVIO · '+g.title.toUpperCase() : games.length+' GIOCHI · PRONTI A PARTIRE'; }
function launch() {
  const g=selectedGame(); if (!g || playing || bootVisible) return;
  activeDialog()?.close(); playing=g; syncMusic(); sound('confirm'); recent={repo:g.repo,date:new Date().toISOString()};writeLocal('b3pz:lastPlayed',recent);updateRecent();
  $('playing-title').textContent=g.title; $('player-external').href=gameUrl(g);
  const frame=document.createElement('iframe');frame.title=g.title;frame.allow='autoplay; fullscreen; gamepad';frame.setAttribute('allowfullscreen','');frame.src=gameUrl(g);$('frame-wrap').replaceChildren(frame);
  $('collection').hidden=true;$('player').hidden=false;document.body.style.overflow='hidden';history.pushState({player:true},'', '#play/'+g.repo);frame.focus();
}
function closeGame() {
  const frame=$('frame-wrap').querySelector('iframe');if(frame)frame.src='about:blank';$('frame-wrap').replaceChildren();playing=null;syncMusic();$('player').hidden=true;$('collection').hidden=false;document.body.style.overflow='';$('play').focus({preventScroll:true});
}
function askLeave() { if(playing&&!$('leave').open)$('leave').showModal(); }
$('play').onclick=launch;$('back').onclick=askLeave;
$('leave').addEventListener('close',()=>{if($('leave').returnValue==='leave'){closeGame();if(history.state?.player)history.back();}});
window.addEventListener('popstate',()=>{if(playing){history.pushState({player:true},'','#play/'+playing.repo);askLeave();}});
async function fullscreen(target) { try { if(document.fullscreenElement)await document.exitFullscreen();else if(target.requestFullscreen)await target.requestFullscreen();else tell('Schermo intero non disponibile in questo browser'); } catch { tell('Schermo intero non disponibile in questo browser'); } }
$('full').onclick=()=>fullscreen($('frame-wrap'));$('console-full').onclick=()=>fullscreen(document.documentElement);
$('sound-toggle').onclick=()=>{preferences.sound=!preferences.sound;applyPreferences();sound('confirm');};
$('settings').onclick=()=>{applyPreferences();$('settings-dialog').showModal();};$('close-settings').onclick=()=>$('settings-dialog').close();
for(const [id,key] of [['setting-music','music'],['setting-sound','sound'],['setting-crt','crt'],['setting-motion','motion']])$(id).onchange=()=>{preferences[key]=$(id).checked;applyPreferences();if(key==='sound')sound('confirm');};
document.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName))return;
  if(bootVisible){if(event.key==='Enter'||event.key===' '){event.preventDefault();enterWorld();}return;}
  const dialog=activeDialog();if(dialog){if(dialog===$('lightbox')&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();moveShot(event.key==='ArrowRight'?1:-1);}return;}
  if(playing)return;
  if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}
  if(event.key==='Enter'&&!event.target.closest('button,a')){event.preventDefault();launch();}
  if(event.key.toLowerCase()==='i'){event.preventDefault();showInfo();}if(event.key.toLowerCase()==='s'){event.preventDefault();showScreens();}
});
let controllerLast=0,controllerButtons=[];
function pollController(time) {
  const pad=navigator.getGamepads?.().find(p=>p?.connected);
  if(pad){
    const pressed=pad.buttons.map(b=>b.pressed),edge=index=>pressed[index]&&!controllerButtons[index];
    if(edge(0)){if(bootVisible)enterWorld();else if(activeDialog()===$('leave')){}else if(activeDialog())activeDialog().close();else if(!playing)launch();}
    if(edge(1)){if(activeDialog())activeDialog().close();else if(playing)askLeave();}
    if(!bootVisible&&!playing&&!activeDialog()){if(edge(2))showInfo();if(edge(3))showScreens();if(time-controllerLast>260){if(pad.axes[0]>.55||pressed[15]){move(1);controllerLast=time;}else if(pad.axes[0]<-.55||pressed[14]){move(-1);controllerLast=time;}}}
    controllerButtons=pressed;
  }else controllerButtons=[];
  requestAnimationFrame(pollController);
}
window.addEventListener('gamepadconnected',()=>{$('controller-status').textContent='Controller collegato · A: gioca · B: indietro · X: info · Y: screenshot';tell('Controller collegato');});
window.addEventListener('gamepaddisconnected',()=>{$('controller-status').textContent='Tastiera e touch pronti. Puoi collegare anche un controller.';});
applyPreferences();drawFilters();drawCovers();updateRecent();requestAnimationFrame(pollController);
try{if(sessionStorage.getItem('b3pz:bootSeen')==='1'){bootVisible=false;$('startup').hidden=true;$('collection').hidden=false;}}catch{}

document.addEventListener('visibilitychange',syncMusic);
syncMusic();
