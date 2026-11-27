// Only animate elements near the viewport, and release listeners when motion is disabled.
function enableMotion() {
  const controller = new AbortController();
  const { signal } = controller;
  const reveals = document.querySelectorAll(
    '.mosaic > *, .entry > h2, .entry article, #skills dl > div, .resource-grid > a, .contact'
  );
  const screens = document.querySelectorAll('.project-screen');
  const visible = new Set();
  let frame = 0;

  const entrance = new IntersectionObserver(entries => {
    const entering = entries.filter(entry => entry.isIntersecting);
    entering.forEach(({target}, index) => {
      target.style.setProperty('--reveal-delay', Math.min(index, 3) * 65 + 'ms');
      target.classList.replace('motion-pending', 'motion-visible');
      entrance.unobserve(target);
    });
  }, { threshold: 0.04 });

  function updateAngles() {
    frame = 0;
    for (const screen of visible) {
      const rect = screen.getBoundingClientRect();
      const distance = (rect.top + rect.height / 2 - innerHeight / 2) / ((innerHeight + rect.height) / 2);
      screen.style.setProperty('--scroll-tilt', (Math.max(-1, Math.min(1, distance)) * 11).toFixed(2) + 'deg');
    }
  }
  function scheduleUpdate() {
    if (!frame && visible.size) frame = requestAnimationFrame(updateAngles);
  }
  const viewport = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      if (isIntersecting) visible.add(target);
      else visible.delete(target);
    }
    scheduleUpdate();
  }, { rootMargin: '64px' });

  for (const element of reveals) {
    element.classList.add('motion-pending');
    entrance.observe(element);
  }
  for (const screen of screens) {
    viewport.observe(screen);
    screen.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const rect = screen.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      screen.style.setProperty('--pointer-tilt', (x * 10).toFixed(2) + 'deg');
    }, {signal});
    screen.addEventListener('pointerleave', () => screen.style.removeProperty('--pointer-tilt'), {signal});
  }
  addEventListener('scroll', scheduleUpdate, { passive: true, signal });
  addEventListener('resize', scheduleUpdate, { signal });
  return () => {
    controller.abort();
    cancelAnimationFrame(frame);
    viewport.disconnect();
    entrance.disconnect();
    for (const element of reveals) {
      element.classList.remove('motion-pending', 'motion-visible');
      element.style.removeProperty('--reveal-delay');
    }
    for (const screen of screens) {
      screen.style.removeProperty('--scroll-tilt');
      screen.style.removeProperty('--pointer-tilt');
    }
  };
}

if ('IntersectionObserver' in window) {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let stop;
  function applyPreference() {
    stop?.();
    stop = preference.matches ? undefined : enableMotion();
  }
  preference.addEventListener('change', applyPreference);
  applyPreference();
}
