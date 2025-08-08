document.addEventListener('DOMContentLoaded', () => {
  const container   = document.getElementById('level3-container');
  const yesBtn      = document.getElementById('yes-btn');
  const noBtn       = document.getElementById('no-btn');
  const winCard     = document.getElementById('win-card');
  const closeWin    = document.getElementById('close-win-card');
  const messageDiv  = document.getElementById('message');

  const mobileMsgs = [
    'No',
    'Try again',
    'Please, Think again',
    "I'm getting mad now",
    'Bye'
  ];
  let msgIndex = 0;

  const isMobile = () => window.matchMedia('(max-width:600px)').matches;

  yesBtn.addEventListener('click', () => {
    winCard.classList.add('show');
    winCard.setAttribute('aria-hidden', 'false');
    yesBtn.disabled = true;
  });
  closeWin.addEventListener('click', () => {
    winCard.classList.remove('show');
    winCard.setAttribute('aria-hidden', 'true');
  });

  function getRelativeRect(elem) {
    const cR = container.getBoundingClientRect();
    const eR = elem.getBoundingClientRect();
    return {
      left:   eR.left   - cR.left,
      top:    eR.top    - cR.top,
      right:  eR.right  - cR.left,
      bottom: eR.bottom - cR.top,
      width:  eR.width,
      height: eR.height
    };
  }

  function evade() {
    const maxX    = container.clientWidth  - noBtn.offsetWidth;
    const maxY    = container.clientHeight - noBtn.offsetHeight;
    const yesRect = getRelativeRect(yesBtn);
    let x, y, tries = 0;

    do {
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      if (++tries > 100) break; // safety break
    } while (
      x + noBtn.offsetWidth  > yesRect.left &&
      x                     < yesRect.right &&
      y + noBtn.offsetHeight > yesRect.top  &&
      y                     < yesRect.bottom
    );

    noBtn.style.left = `${x}px`;
    noBtn.style.top  = `${y}px`;
  }

  if (!isMobile()) {
    container.addEventListener('mousemove', e => {
      const r = noBtn.getBoundingClientRect();
      if (
        e.clientX >= r.left  &&
        e.clientX <= r.right &&
        e.clientY >= r.top   &&
        e.clientY <= r.bottom
      ) {
        evade();
      }
    });
  }

  else {
    const handleMobileNo = e => {
      e.preventDefault();
      if (msgIndex < mobileMsgs.length) {
        messageDiv.textContent = mobileMsgs[msgIndex++];
        if (msgIndex === mobileMsgs.length) {
          noBtn.style.display = 'none';
        }
      }
    };
    noBtn.addEventListener('click', handleMobileNo);
    noBtn.addEventListener('touchstart', handleMobileNo, { passive: false });
  }
});
