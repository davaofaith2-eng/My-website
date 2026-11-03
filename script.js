document.addEventListener('DOMContentLoaded', () => {
  // Floating aqua-pink drops
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const layer = document.createElement('div');
    layer.className = 'drop-layer';
    layer.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < 19; i++) {
      const drop = document.createElement('span');
      drop.className = 'water-drop';

      drop.style.left = `${Math.random() * 100}%`;
      drop.style.setProperty('--size', `${12 + Math.random() * 34}px`);
      drop.style.setProperty('--duration', `${13 + Math.random() * 18}s`);
      drop.style.setProperty('--delay', `${-Math.random() * 28}s`);
      drop.style.setProperty('--opacity', `${0.16 + Math.random() * 0.28}`);

      layer.appendChild(drop);
    }

    document.body.prepend(layer);
  }

  // Reveal sections as they enter the screen
  const revealItems = document.querySelectorAll(
    '.panel, #drop, .container, #contact, .gallery-item, .goal-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealItems.forEach(item => {
      item.classList.add('reveal');
      observer.observe(item);
    });
  }
});

// GALLERY LIGHTBOX
let currentImageIndex = 0;

function galleryImages() {
  return Array.from(document.querySelectorAll('.thumbnail'));
}

function openLightbox(index) {
  const images = galleryImages();
  if (!images.length) return;

  currentImageIndex = typeof index === 'number' ? index : 0;

  const box = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImage');

  if (!box || !img) return;

  img.src = images[currentImageIndex].src;
  img.alt = images[currentImageIndex].alt || 'Gallery image';

  box.classList.add('show');
  box.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const box = document.getElementById('lightbox');
  if (!box) return;

  box.classList.remove('show');
  box.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function changeImage(direction) {
  const images = galleryImages();
  if (!images.length) return;

  currentImageIndex =
    (currentImageIndex + direction + images.length) % images.length;

  const img = document.getElementById('lightboxImage');
  img.src = images[currentImageIndex].src;
  img.alt = images[currentImageIndex].alt || 'Gallery image';
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();

  const box = document.getElementById('lightbox');
  if (box && box.classList.contains('show')) {
    if (event.key === 'ArrowLeft') changeImage(-1);
    if (event.key === 'ArrowRight') changeImage(1);
  }
});

// LOG OUT
function confirmLogout() {
  if (confirm('Are you sure you want to log out?')) {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  }
}

// SKILLS TABS
function openTab(evt, tabName) {
  document.querySelectorAll('.tabcontent').forEach(el => {
    el.style.display = 'none';
  });

  document.querySelectorAll('.tablinks').forEach(el => {
    el.classList.remove('active');
  });

  const tab = document.getElementById(tabName);
  if (tab) tab.style.display = 'block';

  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add('active');
  }
}

// EXPANDABLE GOAL CARDS
function toggleGoalDetails(id) {
  const target = document.getElementById(`goal${id}-details`);
  if (target) target.classList.toggle('active');
}