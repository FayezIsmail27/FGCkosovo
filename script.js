
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

const members = [
  { name: 'Elita', position: 'Mentor', desc: 'Leona is thrilled to be participating in the FIRST Global Challenge for the second time. FGC has only deepened her love for robotics, and she’s excited to dive back in! But robotics isn’t her only passion, she also loves being creative with art and fashion, reading books, singing and watching Formula 1 races. She loves learning new languages, which helps her connect with people from different cultures. So if you see her, don’t forget to teach her a phrase or two in your language!', football: '', f1: '', footballIcon: 'pics/Real_Madrid_CF.svg.png', f1Icon: 'pics/mclarenr.png', photo: 'pics/lando.png' },
  { name: 'Leona', position: 'Team Lead', desc: 'Brief description for Member 2.', football: '', f1: '', footballIcon: 'pics/Real_Madrid_CF.svg.png', f1Icon: 'pics/mclarenr.png', photo: 'pics/lando.png' },
  { name: 'Amar', position: 'Human-Player', desc: 'Brief description for Member 3.', football: '', f1: '', footballIcon: 'pics/Real_Madrid_CF.svg.png', f1Icon: 'pics/mclarenr.png', photo: 'pics/lando.png' },
  { name: 'Marta', position: 'Programmer', desc: 'Brief description for Member 4.', football: '', f1: '', footballIcon: 'pics/Real_Madrid_CF.svg.png', f1Icon: 'pics/mclarenr.png', photo: 'pics/lando.png' },
  { name: 'Ardi', position: 'Desginer', desc: 'Brief description for Member 5.', football: '', f1: '', footballIcon: 'pics/Real_Madrid_CF.svg.png', f1Icon: 'pics/mclarenr.png', photo: 'pics/lando.png' },
  { name: 'Era', position: 'Desginer', desc: 'Brief description for Member 6.', football: '', f1: '', footballIcon: 'pics/Real_Madrid_CF.svg.png', f1Icon: 'pics/mclarenr.png', photo: 'pics/lando.png' },
  { name: 'Drit', position: 'Desginer', desc: 'Brief description for Member 7.', football: '', f1: '', footballIcon: 'pics/Real_Madrid_CF.svg.png', f1Icon: 'pics/mclarenr.png', photo: 'pics/lando.png' }
];


let currentMember = 0;
function showMember(i) {
  const m = members[i];
  document.getElementById('member-name').textContent    = m.name;
  document.getElementById('member-position').textContent= m.position;
  document.getElementById('member-desc').textContent    = m.desc;
  document.getElementById('member-football-icon').src   = m.footballIcon;
  document.getElementById('member-football').textContent= m.football;
  document.getElementById('member-f1-icon').src         = m.f1Icon;
  document.getElementById('member-f1').textContent      = m.f1;
  document.getElementById('member-image').src           = m.photo;
}
document.getElementById('prev-member').addEventListener('click', () => {
  currentMember = (currentMember - 1 + members.length) % members.length;
  showMember(currentMember);
});
document.getElementById('next-member').addEventListener('click', () => {
  currentMember = (currentMember + 1) % members.length;
  showMember(currentMember);
});
showMember(currentMember);

document.addEventListener('DOMContentLoaded', () => {
  const learnTab     = document.getElementById('learn-tab');
  const playTab      = document.getElementById('play-tab');
  const learnPane    = document.getElementById('learn-content');
  const playPane     = document.getElementById('play-content');

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



 function updateCountdown() {
    const target = new Date(2025, 9, 27, 0, 0, 0); 
    let diff = target - new Date();
    if (diff < 0) diff = 0;

    
    const msecPerMonth  = 1000*60*60*24*30,
          msecPerDay    = 1000*60*60*24,
          msecPerHour   = 1000*60*60,
          msecPerMinute = 1000*60;

    const months  = Math.floor(diff / msecPerMonth);
    diff -= months * msecPerMonth;
    const days    = Math.floor(diff / msecPerDay);
    diff -= days * msecPerDay;
    const hours   = Math.floor(diff / msecPerHour);
    diff -= hours * msecPerHour;
    const minutes = Math.floor(diff / msecPerMinute);
    diff -= minutes * msecPerMinute;
    const seconds = Math.floor(diff / 1000);

    document.getElementById('months').textContent  = months;
    document.getElementById('days').textContent    = days;
    document.getElementById('hours').textContent   = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
;

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

document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("site-nav").classList.toggle("show");
});
