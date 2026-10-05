const openContentBtn = document.getElementById('openContent');
const openFormBtn = document.getElementById('openForm');
const closedFormBtn = document.getElementById('closedForm');
const headerContainer = document.getElementById('headerContainer');
const bodyContainer = document.getElementById('bodyContainer');
const bodyContent = document.getElementById('bodyContent');
const formContainer = document.getElementById('formContainer');
const footerContainer = document.querySelector('.card__footer');
const headerBtn = document.querySelector('.header-btn');
const breakpoint = window.matchMedia('(min-width: 768px)');
const form = document.getElementById('formContact');
const errorMessage = document.getElementById('errorMessage');
const inputName = document.getElementById('name');
const nameError = document.getElementById('nameError');
const inputEmail = document.getElementById('email');
const emailError = document.getElementById('emailError');
const inputMessage = document.getElementById('message');
const messageError = document.getElementById('messageError');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const options = document.querySelector('#options input[type="radio"]:checked');
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const message = inputMessage.value.trim();
    if (options === null && name === '' && email === '' && message === '') {
        errorMessage.classList.remove('is-hidden');
        inputName.classList.add('input--error');
        inputEmail.classList.add('input--error');
        inputMessage.classList.add('input--error');
        errorMessage.textContent = 'Por favor llena los campos';
        return;
    }
    errorMessage.classList.add('is-hidden');
    errorMessage.textContent = '';
    if (name === '') {
        inputName.classList.add('input--error');
        nameError.classList.remove('is-hidden');
        nameError.textContent = 'Pon tu nombre por favor';
        return;
    }
    inputName.classList.remove('input--error');
    nameError.classList.add('is-hidden');
    nameError.textContent = '';
    if (email === '') {
        inputEmail.classList.add('input--error');
        emailError.classList.remove('is-hidden');
        emailError.textContent = 'Colaca tu correo electronico por favor';
        return;
    }
    inputEmail.classList.remove('input--error');
    emailError.classList.add('is-hidden');
    emailError.textContent = '';
    if (message === '') {
        inputMessage.classList.add('input--error');
        messageError.classList.remove('is-hidden');
        messageError.textContent = 'Por favor escribe tu problema para llegar a tu solución';
        return;
    }
    inputMessage.classList.remove('input--error');
    messageError.classList.add('is-hidden');
    messageError.textContent = '';
    form.reset();
});

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

const handleButtons = (e) => {
    if (!e.matches) {
        openFormBtn.classList.remove('is-show');
    }
};

breakpoint.addEventListener('change', handleButtons);

handleButtons(breakpoint);