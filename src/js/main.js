const shareButtons = document.querySelector('.js-share');
const container = document.querySelector('.js-container');
let scrollDebounce = false;
let shareFixed = false;

const mq = window.matchMedia( "(min-width: 1300px)" );

const setSharePosition = () => {
  const fixedCssClass = 'c-share--fix';

  if (container && mq.matches) {
    const topOfPage = container.offsetTop;
    if (!scrollDebounce) {
      scrollDebounce = true;
      window.requestAnimationFrame(() => {
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
  } else {
    if (shareFixed) {
      shareButtons.classList.remove(fixedCssClass);
    }
  }
};


if (typeof shareButtons !== 'undefined') {
  window.onload = setSharePosition;
  window.onresize = setSharePosition;
  window.onscroll = setSharePosition;
}
