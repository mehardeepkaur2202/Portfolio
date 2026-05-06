// ── Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 1500);
});

// ── Cursor
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 7}px,${my - 7}px)`;
});

(function animTrail() {
  tx += (mx - tx) * .12;
  ty += (my - ty) * .12;
  trail.style.transform = `translate(${tx - 19}px,${ty - 19}px)`;
  requestAnimationFrame(animTrail);
})();

document.querySelectorAll('a,button,.video-card,.design-card,.service-item,.skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '28px';
    cursor.style.height = '28px';
    cursor.style.background = 'rgba(200,75,49,.35)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '14px';
    cursor.style.height = '14px';
    cursor.style.background = 'var(--rust)';
  });
});

// ── Work Tabs
const workTabs = document.querySelectorAll('.work-tab');
const workPanels = document.querySelectorAll('.work-panel');

workTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    workTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    workPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === target) panel.classList.add('active');
    });
    panel_reveals();
  });
});

function panel_reveals() {
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  revealEls.forEach(el => obs.observe(el));
}

// ── Scroll Reveal
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: .08 });
revealEls.forEach(el => obs.observe(el));

// ── Video Modal
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalClose = document.getElementById('videoModalClose');

function openVideoModal(src) {
  if (!src) return;
  modalVideo.src = src;
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalVideo.play();
}

function closeVideoModal() {
  videoModal.classList.remove('active');
  modalVideo.pause();
  modalVideo.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.dataset.src;
    openVideoModal(src);
  });
});

modalClose.addEventListener('click', closeVideoModal);

videoModal.addEventListener('click', e => {
  if (e.target === videoModal) closeVideoModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeVideoModal();
});

// ── Split Lightbox (design cards)
const backdrop = document.getElementById('splitBackdrop');
const stage = document.getElementById('splitStage');
const splitClose = document.getElementById('splitClose');

document.querySelectorAll('.design-card').forEach(card => {
  card.addEventListener('click', () => {
    const splits = JSON.parse(card.dataset.splits || '[]');

    stage.innerHTML = '';
    splits.forEach((s, i) => {
      const panel = document.createElement('div');
      panel.className = 'split-panel';

      if (s.src) {
        const img = document.createElement('img');
        img.src = s.src;
        img.className = 'split-panel-thumb';
        panel.appendChild(img);
      } else {
        const thumb = document.createElement('div');
        thumb.className = 'split-panel-thumb';
        thumb.style.cssText = `background:${s.bg};width:100%;`;
        thumb.style.aspectRatio = i === 0 ? '3/4' : i === 1 ? '4/5' : '1/1';
        panel.appendChild(thumb);
      }

      if (i === 0) {
        const badge = document.createElement('div');
        badge.className = 'split-badge';
        badge.textContent = `${splits.length} VIEWS`;
        panel.appendChild(badge);
      }

      const info = document.createElement('div');
      info.className = 'split-panel-info';
      info.innerHTML = `<strong>${s.label}</strong>${s.sub}`;
      panel.appendChild(info);

      stage.appendChild(panel);
    });

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeSplit() {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { stage.innerHTML = ''; }, 500);
}

splitClose.addEventListener('click', closeSplit);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeSplit(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSplit(); });

// ── Parallax on hero blob
document.addEventListener('mousemove', e => {
  const px = (e.clientX / window.innerWidth - .5) * 18;
  const py = (e.clientY / window.innerHeight - .5) * 12;
  document.querySelectorAll('.blob-wrap').forEach(el => {
    el.style.transform = `translate(${px * .4}px,${py * .4}px)`;
  });
});
