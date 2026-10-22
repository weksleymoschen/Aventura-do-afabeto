const LOCAL_BG={academy:"assets/backgrounds/academy_fallback.jpg",forest:"assets/backgrounds/forest_fallback.jpg",tower:"assets/backgrounds/tower_fallback.jpg",city:"assets/backgrounds/city_fallback.jpg",island:"assets/backgrounds/island_fallback.jpg",mountain:"assets/backgrounds/mountain_fallback.jpg",map:"assets/backgrounds/map_fallback.jpg",celebration:"assets/backgrounds/celebration_fallback.jpg"};
const AVATAR_LOCAL=["assets/avatars/hero_blue_fallback.jpg","assets/avatars/hero_pink_fallback.jpg","assets/avatars/hero_green_fallback.jpg","assets/avatars/hero_purple_fallback.jpg"];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const state={name:"",avatar:-1,phase:1,q:0,stars:0,unlocked:1,busy:false,sound:true,audio:null};
const phases=[
{name:"FLORESTA DAS VOGAIS",bg:"forest",instruction:"Qual imagem começa com a letra:",five:true,qs:[
{c:"A",correct:"abelha",o:["elefante","abelha","casa","banana","arvore"]},
{c:"E",correct:"elefante",o:["casa","uva","elefante","banana","olho"]},
{c:"I",correct:"ilha",o:["uva","casa","olho","ilha","abelha"]},
{c:"O",correct:"olho",o:["elefante","olho","uva","casa","ilha"]},
{c:"U",correct:"uva",o:["ilha","abelha","casa","uva","olho"]}]},
{name:"TORRE DAS SÍLABAS",bg:"tower",instruction:"Qual imagem começa com a sílaba:",qs:[
{c:"CA",correct:"casa",o:["casa","cachorro","bola","macaco"]},
{c:"BO",correct:"bola",o:["cachorro","bola","casa","macaco"]},
{c:"GA",correct:"gato",o:["casa","macaco","gato","bola"]},
{c:"MA",correct:"macaco",o:["bola","gato","casa","macaco"]},
{c:"PA",correct:"pato",o:["casa","pato","gato","bola"]}]},
{name:"CIDADE DOS SONS",bg:"city",instruction:"Qual imagem começa com o som:",qs:[
{c:"M",correct:"macaco",o:["bola","macaco","gato","mesa"]},
{c:"B",correct:"bola",o:["gato","casa","bola","macaco"]},
{c:"G",correct:"gato",o:["gato","mesa","bola","casa"]},
{c:"C",correct:"casa",o:["bola","macaco","casa","gato"]},
{c:"P",correct:"pato",o:["casa","bola","gato","pato"]}]},
{name:"ILHA DAS LETRAS",bg:"island",instruction:"Qual imagem começa com a letra:",qs:[
{c:"U",correct:"uva",o:["uva","relogio","urso","igreja"]},
{c:"R",correct:"relogio",o:["igreja","uva","relogio","urso"]},
{c:"I",correct:"igreja",o:["urso","igreja","uva","relogio"]},
{c:"A",correct:"abelha",o:["abelha","urso","igreja","uva"]},
{c:"B",correct:"banana",o:["relogio","banana","uva","urso"]}]},
{name:"MONTANHA DAS PALAVRAS",bg:"mountain",instruction:"Qual imagem corresponde à palavra:",qs:[
{c:"SOL",correct:"sol",o:["sol","lua","estrela","nuvem"]},
{c:"LUA",correct:"lua",o:["estrela","sol","lua","nuvem"]},
{c:"ESTRELA",correct:"estrela",o:["nuvem","estrela","lua","sol"]},
{c:"NUVEM",correct:"nuvem",o:["sol","lua","estrela","nuvem"]},
{c:"CASA",correct:"casa",o:["lua","casa","sol","nuvem"]}]}
];
const ext={ilha:"svg",olho:"svg",pato:"svg",cavalo:"svg",colher:"svg",arvore:"svg"};
function objSrc(n){return `assets/objects/${n}.${ext[n]||"jpg"}`}
function setScene(img,key){img.onerror=null;img.src=LOCAL_BG[key]||LOCAL_BG.academy}
function show(id){$$(".screen").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active")}
function avatarImg(i,cls=""){return `<img class="${cls}" src="${AVATAR_LOCAL[i]}" alt="Herói ${i+1}">`}
function init(){setScene($("#setupScene"),"academy");setScene($("#mapScene"),"map");setScene($("#finishScene"),"celebration");
 $("#avatarGrid").innerHTML=AVATAR_LOCAL.map((u,i)=>`<button class="avatar-card" data-i="${i}" aria-label="Escolher herói ${i+1}">${avatarImg(i)}</button>`).join("");
 $$(".avatar-card").forEach(b=>b.addEventListener("click",()=>{$$(".avatar-card").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");state.avatar=+b.dataset.i;$("#warning").textContent=""}));
}
function startAudio(){if(state.audio)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;const ctx=new AC(),master=ctx.createGain();master.gain.value=.025;master.connect(ctx.destination);state.audio={ctx,master};let i=0,notes=[261.6,329.6,392,523.2,392,349.2,293.7,329.6];function loop(){if(state.sound)tone(notes[i++%notes.length],.34,.055);setTimeout(loop,470)}loop()}
function tone(freq,d=.18,vol=.08,type="sine"){if(!state.audio||!state.sound)return;const {ctx,master}=state.audio,o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(vol,ctx.currentTime+.02);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+d);o.connect(g);g.connect(master);o.start();o.stop(ctx.currentTime+d+.02)}
function sfx(ok){if(ok){tone(660,.12,.12,"triangle");setTimeout(()=>tone(880,.18,.11,"triangle"),100)}else{tone(170,.16,.08,"sawtooth")}}
function openPhase(n){state.phase=n;state.q=0;show("game");setScene($("#gameScene"),phases[n-1].bg);$("#phaseTitle").textContent=`FASE ${n} • ${phases[n-1].name}`;const sh=$("#sideHero");sh.src=AVATAR_LOCAL[state.avatar];renderQuestion()}
function renderQuestion(){state.busy=false;const p=phases[state.phase-1],q=p.qs[state.q];$("#instruction").textContent=p.instruction;$("#challenge").textContent=q.c;$("#progressText").textContent=`${state.q+1}/5`;$("#progressDots").innerHTML=[0,1,2,3,4].map(i=>`<i class="dot ${i<=state.q?"on":""}"></i>`).join("");const box=$("#choices");box.className="choices"+(p.five?" five":"");box.innerHTML=q.o.map(n=>`<button class="choice" data-n="${n}" aria-label="${n}"><img src="${objSrc(n)}" alt="${n}"><b>${n.toUpperCase()}</b></button>`).join("");$$(".choice").forEach(b=>b.addEventListener("click",()=>answer(b,b.dataset.n===q.correct)))}
function answer(btn,ok){if(state.busy)return;if(!ok){btn.classList.add("wrong");sfx(false);setTimeout(()=>btn.classList.remove("wrong"),430);return}state.busy=true;btn.classList.add("correct");sfx(true);$("#feedback").classList.add("show");confetti("#confetti",26);setTimeout(()=>{$("#feedback").classList.remove("show");state.stars++;state.q++;if(state.q===5){state.unlocked=Math.max(state.unlocked,state.phase+1);if(state.phase===5)finish();else openPhase(state.phase+1)}else renderQuestion()},760)}
function confetti(sel,n){const box=$(sel);box.innerHTML="";const colors=["#ffd83d","#ff4f86","#35cfff","#42d85b","#874df2"];for(let i=0;i<n;i++){const e=document.createElement("i");e.className="conf";e.style.left=Math.random()*100+"%";e.style.background=colors[i%colors.length];e.style.animationDelay=Math.random()*.35+"s";box.appendChild(e)}setTimeout(()=>box.innerHTML="",2300)}
function renderMap(){show("map");$("#mapPlayer").textContent=state.name;$("#starCount").textContent=`⭐ ${state.stars}/25`;const names=phases.map(p=>p.name);$("#mapWorlds").innerHTML=names.map((n,i)=>{const k=i+1,locked=k>state.unlocked,done=k<state.unlocked||state.stars===25;return `<button class="world-btn w${k} ${locked?"locked":""} ${done?"done":""}" data-world="${k}" ${locked?"disabled":""}>${locked?"🔒 ":""}${k} • ${n}</button>`}).join("");$$(".world-btn:not(.locked)").forEach(b=>b.addEventListener("click",()=>openPhase(+b.dataset.world)))}
function finish(){state.unlocked=6;show("finish");$("#finishName").textContent=state.name;const h=$("#finishHero");h.src=AVATAR_LOCAL[state.avatar];confetti("#finishConfetti",55);tone(523,.2,.11,"triangle");setTimeout(()=>tone(659,.2,.11,"triangle"),180);setTimeout(()=>tone(784,.4,.12,"triangle"),360)}
$("#startBtn").addEventListener("click",()=>{const n=$("#playerName").value.trim();if(!n){$("#warning").textContent="Digite seu nome para começar.";$("#playerName").focus();return}if(state.avatar<0){$("#warning").textContent="Escolha seu herói para começar.";return}state.name=n;startAudio();openPhase(1)});
$("#backBtn").addEventListener("click",renderMap);$("#mapHome").addEventListener("click",()=>show("setup"));$("#finishMapBtn").addEventListener("click",renderMap);$("#restartBtn").addEventListener("click",()=>location.reload());
$$(".sound,.map-sound").forEach(b=>b.addEventListener("click",()=>{state.sound=!state.sound;$$(".sound,.map-sound").forEach(x=>x.textContent=state.sound?"🔊":"🔇")}));
init();