const questions = [
  {
    title: "Two days before payday. What’s the situation?",
    answers: [
      ["Still comfortable, and some already went into savings.", 3],
      ["A little left. We’re going to make it.", 2],
      ["Almost empty, but payday is close.", 1],
      ["My account has already entered next month.", 0]
    ]
  },
  {
    title: "Be honest: do you have debt?",
    answers: [
      ["No, or I clear my card completely every month.", 3],
      ["Only planned debt, like a mortgage or manageable loan.", 2],
      ["Credit card, instalments or buy-now-pay-later.", 1],
      ["Several debts. The exact total is… mysterious.", 0]
    ]
  },
  {
    title: "A surprise $200 bill lands. Your first move?",
    answers: [
      ["Emergency fund. Annoying, but handled.", 3],
      ["Pay it and spend less somewhere else.", 2],
      ["Use a credit card or ask someone to help.", 1],
      ["Close the message. Tomorrow-me is very capable.", 0]
    ]
  },
  {
    title: "Payday arrives. What happens next?",
    answers: [
      ["Money automatically moves into savings and investments.", 3],
      ["Bills first. Then I see what’s left.", 2],
      ["A little celebration first. Organisation later.", 1],
      ["It arrives and immediately fixes last month.", 0]
    ]
  },
  {
    title: "How well do you know your subscriptions?",
    answers: [
      ["Every single one. I cancel ruthlessly.", 3],
      ["There may be one forgotten subscription hiding.", 2],
      ["My bank statement introduces us sometimes.", 1],
      ["Free trials have been winning for years.", 0]
    ]
  },
  {
    title: "Your savings routine looks like…",
    answers: [
      ["Automatic. Every month, no discussion.", 3],
      ["I save what remains at the end of the month.", 2],
      ["I start, stop and heroically start again.", 1],
      ["Savings? Is that a new app?", 0]
    ]
  },
  {
    title: "You spot something you really want.",
    answers: [
      ["Wait 24 hours. If I still want it, we can talk.", 3],
      ["Check whether it fits this month.", 2],
      ["Buy it and promise to be responsible next week.", 1],
      ["It’s only $19.99 a month. Basically free.", 0]
    ]
  },
  {
    title: "Someone says: ‘You should invest.’",
    answers: [
      ["Already doing it, with a plan I understand.", 3],
      ["Interested, but I want to learn first.", 2],
      ["My friend knows a coin that could explode.", 1],
      ["I’m still investing in surviving until payday.", 0]
    ]
  }
];

const breeds = [
  { min: 22, name: "Border Collie", role: "The Financial Brain", emoji: "🐕", color: "linear-gradient(145deg,#17202b,#51677c)", quote: "You have a plan for your money, plus a backup plan for the plan.", power: "Seeing every move ahead", watch: "Overthinking the fun out of money", body: "Your system is strong. Aisance can help you move from managing money brilliantly to using it for bigger, more exciting goals." },
  { min: 18, name: "Doberman", role: "The Power Player", emoji: "🐕‍🦺", color: "linear-gradient(145deg,#111215,#7d3e28)", quote: "Money has a job: build freedom, influence and options.", power: "Discipline with ambition", watch: "Confidence moving faster than caution", body: "You like control and decisive action. Your Aisance plan should protect your downside without slowing your momentum." },
  { min: 14, name: "German Shepherd", role: "The Protector", emoji: "🐕", color: "linear-gradient(145deg,#2b211a,#8a6a46)", quote: "Everyone is covered. Every bill has a place. Surprises need permission.", power: "Creating real security", watch: "Playing safe for too long", body: "You naturally protect your future and your people. Aisance can help you keep that security while making room for growth." },
  { min: 10, name: "Labrador", role: "The Generous Optimist", emoji: "🦮", color: "linear-gradient(145deg,#71501e,#d89d46)", quote: "Money is best when it creates food, fun and happy people.", power: "Generosity without hesitation", watch: "Saying yes to absolutely everyone", body: "You make money feel warm and social. Your Aisance plan will keep the joy while making sure future-you gets invited too." },
  { min: 6, name: "Poodle", role: "The Luxury Curator", emoji: "🐩", color: "linear-gradient(145deg,#714052,#dfa290)", quote: "You don’t want more things. You want better things, and perhaps champagne.", power: "Knowing what feels valuable", watch: "Turning ‘quality’ into an elegant excuse", body: "You have taste and know how to enjoy life. Aisance can help you fund the lifestyle intentionally instead of letting the lifestyle set the rules." },
  { min: 0, name: "Husky", role: "The Beautiful Chaos", emoji: "🐺", color: "linear-gradient(145deg,#31516a,#88bdd1)", quote: "You had a financial plan. Then something more exciting happened.", power: "Optimism under pressure", watch: "Sending invoices to future-you", body: "Rigid budgets were never going to work for you. Aisance can give you a tiny, flexible system that survives real life and your next idea." }
];

let current = 0;
let selections = [];

const screens = {
  intro: document.getElementById("intro"),
  quiz: document.getElementById("quiz"),
  result: document.getElementById("result")
};

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const q = questions[current];
  document.getElementById("questionTitle").textContent = q.title;
  document.getElementById("progressText").textContent = `${current + 1}/${questions.length}`;
  document.getElementById("progressBar").style.width = `${((current + 1) / questions.length) * 100}%`;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  q.answers.forEach((answer, index) => {
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
  if (current < questions.length - 1) {
    current += 1;
    renderQuestion();
  } else {
    renderResult();
  }
}

let resultBlob = null;
let activeBreed = null;

function portraitPath(breed) {
  return `assets/breeds/${breedSlug(breed)}.png`;
}

function breedSlug(breed) {
  return breed.name.toLowerCase().replaceAll(' ', '-');
}

async function drawPoster(breed) {
  const portrait = new Image();
  portrait.src = portraitPath(breed);
  await portrait.decode();
  if (breed !== activeBreed) return;

  const canvas = document.getElementById('resultCard');
  const ctx = canvas.getContext('2d');
  canvas.width = portrait.naturalWidth;
  canvas.height = portrait.naturalHeight;
  ctx.drawImage(portrait, 0, 0);
  canvas.setAttribute('aria-label', `${breed.name}. ${breed.role}. Your personalised Aisance dog design.`);
  canvas.hidden = false;
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  if (breed !== activeBreed) return;
  resultBlob = blob;
}

function renderResult() {
  const score = selections.reduce((sum, value) => sum + value, 0);
  const breed = breeds.find(item => score >= item.min);
  activeBreed = breed;
  resultBlob = null;
  saveLink.href = portraitPath(breed);
  saveLink.download = `aisance-${breedSlug(breed)}.png`;
  updateSocialLinks(breed);
  document.getElementById('sharePanel').hidden=true;
  document.getElementById('resultTitle').textContent = breed.name;
  document.getElementById('resultRole').textContent = breed.role;
  document.getElementById('resultPower').textContent=breed.power;
  document.getElementById('resultWatch').textContent=breed.watch;
  document.getElementById('resultBody').textContent=breed.body;
  document.getElementById('actionMessage').textContent='';
  document.getElementById('resultCard').hidden = true;
  drawPoster(breed).catch(error => {
    console.warn('Unable to render the result poster.', error);
  });
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

const sharePanel = document.getElementById('sharePanel');
const shareLink = document.getElementById('shareLink');
const saveLink = document.getElementById('shareSaveButton');
const nativeShareButton = document.getElementById('nativeShareButton');
const isPublicUrl = ['https:', 'http:'].includes(location.protocol)
  && !['localhost', '127.0.0.1', '[::1]', '0.0.0.0'].includes(location.hostname);
const publicQuizUrl = isPublicUrl ? location.origin + location.pathname : '';
shareLink.value = publicQuizUrl;
document.getElementById('publicShareOptions').hidden = !publicQuizUrl;
document.getElementById('localShareNote').hidden = Boolean(publicQuizUrl);

function shareCaption(breed) {
  return `I'm a ${breed.name}. Which dog is running your bank account?`;
}

function updateSocialLinks(breed) {
  if (!publicQuizUrl) return;
  const url = encodeURIComponent(publicQuizUrl);
  const text = encodeURIComponent(shareCaption(breed));
  document.getElementById('shareFacebook').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  document.getElementById('shareLinkedIn').href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  document.getElementById('shareX').href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  document.getElementById('shareWhatsApp').href = `https://wa.me/?text=${text}%20${url}`;
}

document.getElementById('shareButton').addEventListener('click', () => {
  sharePanel.hidden = !sharePanel.hidden;
  nativeShareButton.hidden = typeof navigator.share !== 'function';
  if (!sharePanel.hidden) sharePanel.scrollIntoView({behavior:'smooth',block:'nearest'});
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
nativeShareButton.addEventListener('click',()=>{
  const message=document.getElementById('actionMessage');
  const text = shareCaption(activeBreed);
  const file=resultBlob?new File([resultBlob],'my-money-breed.png',{type:'image/png'}):null;
  const payload=file && navigator.canShare && navigator.canShare({files:[file]})
    ? {files:[file],title:'My Money Breed',text}
    : {title:'My Money Breed',text};
  if (publicQuizUrl) payload.url = publicQuizUrl;
  navigator.share(payload).catch(error=>{
    if(error.name!=='AbortError') message.textContent='Use Copy link or Save my dog image below to share from this browser.';
  });
});
renderQuestion();
