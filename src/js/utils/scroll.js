// scroll

export function smoothScrollTo(targetEl, offset = 0) {
  if (!targetEl) return;

  const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });
}