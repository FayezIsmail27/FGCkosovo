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



