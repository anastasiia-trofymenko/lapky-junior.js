export function lockScroll() {
  document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
  document.body.style.overflow = '';
}

export function smoothScrollTo(targetEl, offset = 0) {
  if (!targetEl) return;

  const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });
}
