import { clearForm, initForm } from "./form.js";

const openContentBtn = document.getElementById('openContent');
const openFormBtn = document.getElementById('openForm');
const closedFormBtn = document.getElementById('closedForm');
const headerContainer = document.getElementById('headerContainer');
const bodyContainer = document.getElementById('bodyContainer');
const bodyContent = document.getElementById('bodyContent');
const formContainer = document.getElementById('formContainer');
const footerContainer = document.querySelector('.card__footer');
const headerBtn = document.querySelector('.header-btn');

openContentBtn.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    headerContainer.classList.add('card__header--shrink');
    bodyContainer.classList.remove('is-hidden');
    openContentBtn.classList.add('is-hidden');
    openFormBtn.classList.add('is-show');
});

headerContainer.addEventListener('click', (e) => {
    const header = e.target.closest('.header-container');
    if (!header) return;
    headerContainer.classList.remove('card__header--shrink');
    bodyContainer.classList.add('is-hidden');
    openContentBtn.classList.remove('is-hidden');
    openFormBtn.classList.remove('is-show');
});

openFormBtn.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    footerContainer.classList.add('is-hidden');
    headerBtn.classList.add('is-show');
    closedFormBtn.classList.add('is-show');
    openFormBtn.classList.remove('is-show');
    bodyContent.classList.add('is-hidden');
    formContainer.classList.remove('is-hidden');
    requestAnimationFrame(() => {
        formContainer.classList.add('is-visible');
    });
});

closedFormBtn.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    clearForm();
    footerContainer.classList.remove('is-hidden');
    headerBtn.classList.remove('is-show');
    closedFormBtn.classList.remove('is-show');
    openFormBtn.classList.add('is-show');
    formContainer.classList.remove('is-visible');
});

formContainer.addEventListener('transitionend', (e) => {
    if (e.target !== formContainer || e.propertyName !== 'opacity') return;

    if (!formContainer.classList.contains('is-visible')) {
        formContainer.classList.add('is-hidden');
        bodyContent.classList.add('is-entering');
        bodyContent.classList.remove('is-hidden');

        requestAnimationFrame(() => {
            bodyContent.classList.remove('is-entering');
        });
    }
});

initForm();