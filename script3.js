document.addEventListener('DOMContentLoaded', () => {
  const yesBtn     = document.getElementById('yes-btn');
  const noBtn      = document.getElementById('no-btn');
  const container  = document.getElementById('level3-container');
  const winCard    = document.getElementById('win-card');
  const closeWin   = document.getElementById('close-win-card');

  yesBtn.addEventListener('click', () => {
    winCard.classList.add('show');
    winCard.setAttribute('aria-hidden', 'false');

    yesBtn.disabled = true;
    noBtn.removeEventListener('mouseenter', evade);
  });

  function evade() {
    const cw = container.clientWidth  - noBtn.offsetWidth;
    const ch = container.clientHeight - noBtn.offsetHeight;
    const x  = Math.random() * cw;
    const y  = Math.random() * ch;
    noBtn.style.left = `${x}px`;
    noBtn.style.top  = `${y}px`;
  }

  noBtn.addEventListener('mouseenter', evade);

  closeWin.addEventListener('click', () => {
    winCard.classList.remove('show');
    winCard.setAttribute('aria-hidden', 'true');
  });
});
