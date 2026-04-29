// Nzo Kiambeta Njimbo — comportamentos compartilhados

// ─── Reveal on scroll ───
(function() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// ─── Lightbox ───
(function() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const imgEl = lightbox.querySelector('img');
  const captionEl = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
  const nextBtn = lightbox.querySelector('.lightbox-nav.next');
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  let current = 0;

  function show(idx) {
    current = (idx + triggers.length) % triggers.length;
    const t = triggers[current];
    imgEl.src = t.getAttribute('data-src') || t.getAttribute('href') || '';
    imgEl.alt = t.getAttribute('data-caption') || '';
    captionEl.textContent = t.getAttribute('data-caption') || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function hide() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  triggers.forEach((t, i) => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      show(i);
    });
  });
  closeBtn && closeBtn.addEventListener('click', hide);
  prevBtn && prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) hide(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
