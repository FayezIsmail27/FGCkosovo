// script.js

// 1. Greetings rotation (unchanged)
const greetings = [
  'Përshëndetje!', 'Hi!', 'こんにちは!', '안녕하세요!', '你好!',
  '!مرحبا', 'नमस्ते!', 'Привет!', 'Bonjour!', 'Hola!',
  'Hallo!', 'Ciao!', 'Olá!', 'Γειά σου!',
  'Merhaba!', 'Hej!', 'Jambo!', 'नमस्कार!', 'Salaam!'
];
let greetIndex = 0;
const greetEl = document.getElementById('greeting');
setInterval(() => {
  greetIndex = (greetIndex + 1) % greetings.length;
  greetEl.textContent = greetings[greetIndex];
}, 1500);


// 2. Members data, now with a `symbols` array instead of football/F1
const members = [
  {
    name: 'Leona',
    position: 'Team Lead',
    desc: 'Leona is thrilled to be participating in the FIRST Global Challenge for the second time. FGC has only deepened her love for robotics, and she’s excited to dive back in! But robotics isn’t her only passion; she also loves being creative with art and fashion, reading books, singing, and watching Formula 1 races. She loves learning new languages, which helps her connect with people from different cultures. So if you see her, don’t forget to teach her a phrase or two in your language!',
    symbols: [
      'pics/Real_Madrid_CF.svg.png',
      'pics/f3.png',
      'pics/champl2.png',
      'pics/freak.png',
      'pics/mclarenr.png'
    ],
    photo: 'pics/lando.png'
  },
  {
    name: 'Klea',
    position: 'My new friend',
    desc: 'I forgot her name and I feel bad about it, but she is a great person and I love her. Remind me of her name if you see this. (Dont tell her I forgot it, please)',
    symbols: [
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png'
    ],
    photo: 'pics/lando.png'
  },
  {
    name: 'Amar',
    position: 'The GOAT',
    desc: 'Amar is a 16-year-old with a passion for programming. Growing up, he always had technology around him, and his curiosity about how things work led to his interests in computers at a young age. He wrote his first lines of code at 10, and since then, programming has become his main passion. He also loves playing basketball and enjoys learning new things about astronomy.',
    symbols: [
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png'
    ],
    photo: 'pics/lando.png'
  },
  {
    name: 'Marta',
    position: 'Programmer',
    desc: 'Brief description for Member 4.',
    symbols: [
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png'
    ],
    photo: 'pics/lando.png'
  },
  {
    name: 'Ardi',
    position: 'Designer',
    desc: 'Brief description for Member 5.',
    symbols: [
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png'
    ],
    photo: 'pics/lando.png'
  },
  {
    name: 'Era',
    position: 'Designer',
    desc: 'Era is a high school student at UBT. In her free time, she loves reading, spending time with her family and exploring activities that broaden her knowledge, particularly in robotics and other tech-related fields. She finds her first time participating in FGC an amazing experience that will help her to further improve her skills and connect with others who share her interests. She also loves traveling and is beyond excited to meet all of you.',
    symbols: [
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png'
    ],
    photo: 'pics/lando.png'
  },
  {
    name: 'Drit',
    position: 'Designer',
    desc: 'Brief description for Member 7.',
    symbols: [
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png'
    ],
    photo: 'pics/lando.png'
  },
  {
    name: 'Elita',
    position: 'Mentor',
    desc: 'Best Mentor Ever!',
    symbols: [
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png',
      'pics/mclarenr.png',
      'pics/Real_Madrid_CF.svg.png'
    ],
    photo: 'pics/lando.png'
  }
];

let currentMember = 0;

function showMember(i) {
  const m = members[i];
  // update text fields
  document.getElementById('member-name').textContent     = m.name;
  document.getElementById('member-position').textContent = m.position;
  document.getElementById('member-desc').textContent     = m.desc;

  // update the 5 symbol boxes
  m.symbols.forEach((src, idx) => {
    const imgEl = document.getElementById(`symbol${idx + 1}`);
    if (imgEl) imgEl.src = src;
  });

  // update photo
  document.getElementById('member-image').src = m.photo;
}

// prev / next controls
document.getElementById('prev-member').addEventListener('click', () => {
  currentMember = (currentMember - 1 + members.length) % members.length;
  showMember(currentMember);
});
document.getElementById('next-member').addEventListener('click', () => {
  currentMember = (currentMember + 1) % members.length;
  showMember(currentMember);
});

// initial display
showMember(currentMember);


// 3. Country tab switching (unchanged)
document.addEventListener('DOMContentLoaded', () => {
  const learnTab  = document.getElementById('learn-tab');
  const playTab   = document.getElementById('play-tab');
  const learnPane = document.getElementById('learn-content');
  const playPane  = document.getElementById('play-content');

  learnTab.addEventListener('click', () => {
    learnTab.classList.add('active');
    playTab.classList.remove('active');
    learnPane.classList.add('active');
    playPane.classList.remove('active');
  });

  playTab.addEventListener('click', () => {
    playTab.classList.add('active');
    learnTab.classList.remove('active');
    playPane.classList.add('active');
    learnPane.classList.remove('active');
  });
});

// 4. Header hide-on-scroll (unchanged)
let lastScroll = 0;
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  lastScroll = currentScroll;
});



// 6. Smooth-scroll nav links (unchanged)
document.querySelectorAll('.site-nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetEl = document.querySelector(link.getAttribute('href'));
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    window.scrollTo({
      top: targetEl.offsetTop - headerHeight,
      behavior: 'smooth'
    });
  });
});

// 7. Mobile menu toggle (unchanged)
document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("site-nav").classList.toggle("show");
});




document.addEventListener('DOMContentLoaded', () => {
  const learnTab    = document.getElementById('learn-tab');
  const playTab     = document.getElementById('play-tab');
  const learnPane   = document.getElementById('learn-content');
  const playPane    = document.getElementById('play-content');

  learnTab.addEventListener('click', () => {
    learnTab.classList.add('active');
    playTab.classList.remove('active');
    learnPane.classList.add('active');
    playPane.classList.remove('active');
  });

  playTab.addEventListener('click', () => {
    playTab.classList.add('active');
    learnTab.classList.remove('active');
    playPane.classList.add('active');
    learnPane.classList.remove('active');
  });
});



document.querySelectorAll(".post-carousel").forEach(post => {
  const imgs = post.querySelectorAll("img");
  const left = post.querySelector(".nav.left");
  const right = post.querySelector(".nav.right");
  let index = 0;

  const show = i => {
    imgs.forEach(img => img.classList.remove("active"));
    imgs[i].classList.add("active");
  };

  left.onclick = () => {
    index = (index - 1 + imgs.length) % imgs.length;
    show(index);
  };

  right.onclick = () => {
    index = (index + 1) % imgs.length;
    show(index);
  };
});



const modal = document.getElementById('linktree-modal');
const btn = document.getElementById('linktree-btn');
const textLink = document.getElementById('linktree-text');
const span = document.querySelector('.modal .close');

const openModal = (e) => {
  e.preventDefault();
  modal.style.display = "block";
};

if (btn) btn.onclick = openModal;
if (textLink) textLink.onclick = openModal;

span.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

































// countdown target
const countToDate = new Date('October 27, 2025 00:00:00').getTime();

// update per second
function updateCountdown() {
  const now      = Date.now();
  const diff     = Math.max(0, countToDate - now);
  const totalSec = Math.floor(diff / 1000);

  const days    = Math.floor(totalSec / 86400);
  const hours   = Math.floor(totalSec / 3600) % 24;
  const minutes = Math.floor(totalSec / 60) % 60;
  const seconds = totalSec % 60;

  flip(document.querySelector('[data-days-tens]'),    Math.floor(days    / 10));
  flip(document.querySelector('[data-days-ones]'),    days    % 10);
  flip(document.querySelector('[data-hours-tens]'),   Math.floor(hours   / 10));
  flip(document.querySelector('[data-hours-ones]'),   hours   % 10);
  flip(document.querySelector('[data-minutes-tens]'), Math.floor(minutes / 10));
  flip(document.querySelector('[data-minutes-ones]'), minutes % 10);
  flip(document.querySelector('[data-seconds-tens]'), Math.floor(seconds / 10));
  flip(document.querySelector('[data-seconds-ones]'), seconds % 10);
}

updateCountdown();
setInterval(updateCountdown, 1000);

function flip(flipCard, newNumber) {
  if (!flipCard) return;

  const topHalf    = flipCard.querySelector('.fc-top');
  const bottomHalf = flipCard.querySelector('.fc-bottom');
  if (!topHalf || !bottomHalf) return;

  const current = parseInt(topHalf.textContent, 10);
  if (newNumber === current) return;

  // build the two flipping halves
  const topFlip    = document.createElement('div');
  topFlip.classList.add('fc-top-flip');
  topFlip.textContent = current;

  const bottomFlip = document.createElement('div');
  bottomFlip.classList.add('fc-bottom-flip');
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener('animationstart', () => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener('animationend', () => topFlip.remove());
  bottomFlip.addEventListener('animationend', () => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });

  flipCard.append(topFlip, bottomFlip);
}
