'use strict';

///////////////////////////////////////
// Modal window

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
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
console.log(header);
const allSections = document.querySelectorAll('.section');
console.log(allSections);
const allbutton = document.getElementsByTagName('button');
console.log(allbutton);

const message = document.createElement('div');
message.classList.add('cookie-message');
message.style.background = 'red';
message.style.width = '104.02%';
message.innerHTML =
  'We use cookies in our website for improved functionalities and analytics<button class="btn -v">Allow<button/>';
header.insertAdjacentElement('beforeend', message);

document.querySelector('.-v').addEventListener('click', function () {
  message.remove();
});
console.log(getComputedStyle(message).fontSize);
document.documentElement.style.setProperty('--color-primary', 'red');
const logo = document.querySelector('.nav__logo');
console.log(logo.setAttribute('src', 'secretary'));
logo.classList.toggle('nav__links', true);
