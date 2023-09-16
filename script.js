'use strict';

/**COOKIES  MESSGAE */

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const header = document.querySelector('.header');

const allSections1 = document.querySelectorAll('.section');

const allbutton = document.getElementsByTagName('button');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.style.background = 'black';
message.style.width = '104.02%';
message.innerHTML =
  'We use cookies in our website for improved functionalities and analytics <button class="btn -v">OK</button>';
header.insertAdjacentElement('beforeend', message);

document.querySelector('.-v').addEventListener('click', function () {
  message.remove();
});

/**SETTING PROPERTIES AND STYLES*/

// console.log(getComputedStyle(message).fontSize);
// document.documentElement.style.setProperty('--color-primary', 'green');
// const logo = document.querySelector('.nav__logo');
// console.log(logo.setAttribute('src', 'secretary'));
// logo.classList.toggle('nav__links', true);

//WHEN I CLICK ON LEARN MORE I MUST SMOOTHLY SCROLL TO SECTION-1

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

/**ADDING AND REMOVING EVENTS*/
// function showalert() {
//   alert('MOUSE HAS ENTERED');
//   h1.removeEventListener('mouseenter', showalert);
// }
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', showalert);

/**EVENT BUBBLING AND CAPTURING USED IN CHANGING BABCKGROUND--COLOR*/

// function randInt(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// }
// function randomColor() {
//   return `rgb(${randInt(0, 255)},${randInt(0, 255)},${randInt(0, 255)})`;
// }
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

/**EVENT BUBBLING USED IN PAGE NAVIGATION*/
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/**DOM TRAVERSING*/

// const h1 = document.querySelector('h1');

// console.log(h1);
// console.log(h1.parentElement);
// console.log(h1.parentNode);S
// console.log(h1.childNodes);

/**BUILDING 3 DIFFERENT TAB AND CHANGING DATA ACCORDING TO THE CLICKED TAB */
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content ');
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  // const d = clicked.getAttribute('data-tab');
  // console.log(d);
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/**MOUSE IN AND MOUSE OUT EVENTS */
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__links');
function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    sibling.forEach(el => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/**STICKY NAVIGATION  */
/**METHOD 1 : USING scrollY AND  getBoundingClientRect */
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

/**METHOD 2 : USING INTERSECTION OBSERVER API */
const header1 = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
function stickyNav(entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header1);

/**REVEALING ELEMENTS ON SCROLL USING INTERSECTION OBSERVER API */
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/**FOCUS ON THAT DOT WHOSE SLIDE IS CURRENTLY BEING SEEN */
function slider() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let currentSlide = 0;
  const numberOfSlides = slides.length;

  /**CREATING DOTS AND ACTIVATING DOTS */

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  /**IMPLEMENT SLIDER COMPONENT */
  function gotoSlide(currentSlideNumber) {
    slides.forEach(
      (s, i) =>
        (s.style.transform = `translateX(${100 * (i - currentSlideNumber)}%)`)
    );
  }
  gotoSlide(0);
  function nextSlide() {
    if (currentSlide === numberOfSlides - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  }
  function prevSlide() {
    if (currentSlide === 0) {
      currentSlide = numberOfSlides - 1;
    } else {
      currentSlide--;
    }
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  }
  /**WHEN USER CLICKS ON LEFT AND RIGHT BUTTON */
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  /**WWHEN USER CLICKS THE RIGHT KEY AND LEFT KEY ON KEYBOARD */
  document.addEventListener('keydown', sliding);
  function sliding(e) {
    if (e.key === 'ArrowRight') {
      nextSlide();
    }
    if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  }

  /**WHEN USER CLICK ON A DOT IN THE SLIDER  */

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activateDot(slide);
    }
  });

  /**INITIALLY WHEN PAGE LOADS */
  function init() {
    gotoSlide(0);
    createDots();
    activateDot(0);
  }
  init();
}
slider();

/**LAZY LOADING IMAGES */

const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);
function loadimg(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));
