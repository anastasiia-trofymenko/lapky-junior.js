import { smoothScrollTo } from "../utils/scroll";

const footer = document.querySelector('.footer');

if (footer) {
  const footerLinks = footer.querySelectorAll('a[href^="#"]:not([href="#"])');

  footerLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);

      smoothScrollTo(targetEl);
    });
  });
}
