const questions = styleQuestions;

const breeds = [
  { name: "Border Collie", role: "The Financial Brain", emoji: "🐕", color: "linear-gradient(145deg,#17202b,#51677c)", quote: "You have a plan for your money, plus a backup plan for the plan.", power: "Seeing every move ahead", watch: "Making room for enjoyment too" },
  { name: "Doberman", role: "The Power Player", emoji: "🐕‍🦺", color: "linear-gradient(145deg,#111215,#7d3e28)", quote: "Money has a job: build freedom, influence and options.", power: "Discipline with ambition", watch: "Confidence moving faster than caution" },
  { name: "German Shepherd", role: "The Protector", emoji: "🐕", color: "linear-gradient(145deg,#2b211a,#8a6a46)", quote: "Everyone is covered. Every bill has a place. Surprises need permission.", power: "Creating real security", watch: "Finding room for new possibilities" },
  { name: "Labrador", role: "The Generous Optimist", emoji: "🦮", color: "linear-gradient(145deg,#71501e,#d89d46)", quote: "Money is best when it creates food, fun and happy people.", power: "Generosity without hesitation", watch: "Keeping space for your own priorities" },
  { name: "Poodle", role: "The Luxury Curator", emoji: "🐩", color: "linear-gradient(145deg,#714052,#dfa290)", quote: "You don’t want more things. You want better things, and perhaps champagne.", power: "Knowing what feels valuable", watch: "Balancing quality with other priorities" },
  { name: "Husky", role: "The Spontaneous Spirit", emoji: "🐺", color: "linear-gradient(145deg,#31516a,#88bdd1)", quote: "You had a financial plan. Then something more exciting happened.", power: "Optimism under pressure", watch: "Leaving little time to review a changing plan" }
];

let current = 0;
let selections = [];

const screens = {
  intro: document.getElementById("intro"),
  quiz: document.getElementById("quiz"),
  result: document.getElementById("result"),
  aha: document.getElementById("aha")
};

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const q = questions[current];
  document.getElementById("questionKicker").textContent = `REAL LIFE · ${String(current + 1).padStart(2,"0")}`;
  document.getElementById("questionTitle").textContent = q.title;
  document.getElementById("progressText").textContent = `${current + 1}/${questions.length}`;
  document.getElementById("progressBar").style.width = `${((current + 1) / questions.length) * 100}%`;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  const offset = current % 6;
  [...q.answers.slice(offset), ...q.answers.slice(0, offset)].forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${answer[0]}</span>`;
    button.addEventListener("click", () => chooseAnswer(answer[1]));
    answers.appendChild(button);
  });
}

function chooseAnswer(score) {
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  selections[current] = score;
  selections.length = current + 1;
  track('quiz_answer', {question: current + 1});
  if (current < questions.length - 1) {
    current += 1;
    renderQuestion();
  } else {
    renderResult();
  }
}

const resultPanels = [[20,24,316,736],[354,24,316,736],[689,24,316,736],[20,782,316,716],[354,782,316,716],[689,782,316,716]];
let resultBlob = null;
let activeBreed = null;
let posterReady = Promise.resolve();
const resultDesigns = new Image();
resultDesigns.src = 'assets/dog-result-designs.png';
async function drawPoster(breed) {
  resultBlob = null;
  await Promise.all([resultDesigns.decode(), document.fonts.load('700 40px "Tasa Orbiter"')]);
  const canvas = document.getElementById('resultCard'), ctx = canvas.getContext('2d');
  const [x,y,w,h] = resultPanels[breeds.indexOf(breed)];
  canvas.width = 632;
  canvas.height = h * 2 + 224;
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.textAlign='center';ctx.fillStyle='#008f85';ctx.font='500 18px Inter';
  ctx.fillText('MY MONEY BREED IS',316,36);
  ctx.fillStyle='#101b19';ctx.font='700 40px "Tasa Orbiter"';ctx.fillText(breed.name,316,88);
  ctx.fillStyle='#526c68';ctx.font='500 20px Inter';ctx.fillText(breed.role,316,122);
  ctx.drawImage(resultDesigns,x,y,w,h,0,144,w*2,h*2);
  ctx.fillStyle='#ffffff';ctx.fillRect(0,144+h*2,632,80);
  ctx.fillStyle='#101b19';ctx.font='500 16px sans-serif';
  ctx.fillText(shareLink.value.replace(/^https?:\/\//,''),316,144+h*2+46,600);
  canvas.setAttribute('aria-label',`${breed.name}. ${breed.role}. Your personalised Aisance dog design.`);
  resultBlob = await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
}
function renderResult() {
  const breed = breeds[selectStyle(selections)];
  activeBreed = breed;
  shareLink.value = makeShareLink(breed);
  const example = breedExamples[breeds.indexOf(breed)];
  document.getElementById('exampleQuestion').textContent = example[0];
  document.getElementById('exampleAnswer').textContent = example[1];
  track('quiz_result', {breed: breed.name});
  document.getElementById('sharePanel').hidden=true;
  document.getElementById('resultTitle').textContent = `Your Money Breed: ${breed.name}`;
  document.getElementById('resultPower').textContent=breed.power;
  document.getElementById('resultWatch').textContent=breed.watch;
  document.getElementById('resultBody').textContent='Your breed reflects preferences, not your financial health. Every style has strengths. Explore a money conversation that fits yours.';
  document.getElementById('actionMessage').textContent='';
  posterReady = drawPoster(breed).catch(()=>{document.getElementById('actionMessage').textContent='The image could not load. Please refresh and try again.';});
  showScreen('result');
}

function restart() {
  current = 0;
  selections = [];
  document.getElementById("actionMessage").textContent = "";
  renderQuestion();
  showScreen("intro");
}

document.getElementById("startButton").addEventListener("click", () => {
  current = 0;
  selections = [];
  renderQuestion();
  showScreen("quiz");
});

document.getElementById("backButton").addEventListener("click", () => {
  if (current === 0) showScreen("intro");
  else { current -= 1; renderQuestion(); }
});

document.getElementById("restartTop").addEventListener("click", restart);

function savePoster() {
  if (!resultBlob) return;
  const url=URL.createObjectURL(resultBlob), link=document.createElement('a');
  link.href=url;link.download=`aisance-${activeBreed.name.toLowerCase().replaceAll(' ','-')}.png`;link.click();
  setTimeout(()=>URL.revokeObjectURL(url),30000);
}
document.getElementById('saveButton').addEventListener('click',async()=>{await posterReady;savePoster();});
const sharePanel=document.getElementById('sharePanel');
const shareLink=document.getElementById('shareLink');
const nativeShareButton=document.getElementById('nativeShareButton');
shareLink.value=location.origin+location.pathname;
document.getElementById('shareButton').addEventListener('click',()=>{
  sharePanel.hidden=!sharePanel.hidden;
  nativeShareButton.hidden=typeof navigator.share!=='function';
  nativeShareButton.disabled=!resultBlob;
  if(!sharePanel.hidden) sharePanel.scrollIntoView({behavior:'smooth',block:'nearest'});
});
document.getElementById('copyLinkButton').addEventListener('click',async()=>{
  const message=document.getElementById('actionMessage');
  try {
    await navigator.clipboard.writeText(shareLink.value);
    message.textContent='Quiz link copied. Paste it into your message or post.';
  } catch(error) {
    shareLink.focus();shareLink.select();shareLink.setSelectionRange(0,shareLink.value.length);
    const copied=document.execCommand('copy');
    message.textContent=copied?'Quiz link copied. Paste it into your message or post.':'Your link is selected. Copy it to share.';
  }
});
document.getElementById('shareSaveButton').addEventListener('click',async()=>{await posterReady;savePoster();});
nativeShareButton.addEventListener('click',()=>{
  const message=document.getElementById('actionMessage');
  const text=`I'm a ${activeBreed.name}. Which dog is running your bank account? ${shareLink.value}`;
  const file=resultBlob?new File([resultBlob],'my-money-breed.png',{type:'image/png'}):null;
  const payload=file && navigator.canShare && navigator.canShare({files:[file]})
    ? {files:[file],title:'My Money Breed',text}
    : {title:'My Money Breed',text,url:shareLink.value};
  navigator.share(payload).catch(error=>{
    if(error.name!=='AbortError') message.textContent='Use Copy link or Save my dog image below to share from this browser.';
  });
});
// Integration hook only: no third-party pixel is loaded and no network event is
// sent here. Connect this event to the approved consent-aware analytics adapter.
function track(name, detail = {}) {
  const campaign = {};
  for (const [key, value] of new URLSearchParams(location.search)) {
    if (/^utm_(source|medium|campaign|content|term)$/.test(key) || key === 'ref') campaign[key] = value;
  }
  window.dispatchEvent(new CustomEvent('aisance:analytics', {detail:{event:name,...detail,campaign}}));
}
function makeShareLink(breed) {
  const url = new URL(location.pathname, location.origin);
  url.searchParams.set('ref', breed.name.toLowerCase().replaceAll(' ', '-'));
  return url.href;
}
document.getElementById('ahaButton').addEventListener('click', () => {showScreen('aha');track('aha_view', {breed:activeBreed.name});});
document.getElementById('backResult').addEventListener('click', () => showScreen('result'));
document.getElementById('assistantLink').addEventListener('click', event => {
  const url = new URL(event.currentTarget.href);
  for (const [key,value] of new URLSearchParams(location.search)) {
    if (/^utm_(source|medium|campaign|content|term)$/.test(key) || key === 'ref') url.searchParams.set(key,value);
  }
  event.currentTarget.href=url.href;
  track('outbound_click', {breed:activeBreed.name});
});
document.getElementById('shareButton').addEventListener('click', () => track('share_open', {breed:activeBreed.name}));
document.getElementById('startButton').addEventListener('click', () => track('quiz_start'));
track('quiz_view');
renderQuestion();
