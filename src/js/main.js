const shareButtons = document.querySelector('.js-share');
const container = document.querySelector('.js-container');
let scrollDebounce = false;
let shareFixed = false;

const setSharePosition = () => {
  if (container) {
    const topOfPage = container.offsetTop;
    if (!scrollDebounce) {
      scrollDebounce = true;
      window.requestAnimationFrame(() => {
        const fixedCssClass = 'c-share--fix';
        const scrollPosition = window.scrollY;
        // only update the dom if we have to
        // use shareFixed flag instead of contains to avoid DOM lookup
        if (scrollPosition >= topOfPage && !shareFixed) {
          shareFixed = true;
          shareButtons.classList.add(fixedCssClass);
        } else if (scrollPosition < topOfPage && shareFixed) {
          shareFixed = false;
          shareButtons.classList.remove(fixedCssClass);
        }
        scrollDebounce = false;
      });
    }
  }
};


if (typeof shareButtons !== 'undefined') {

  window.onload = setSharePosition;
  window.onscroll = setSharePosition;
}
