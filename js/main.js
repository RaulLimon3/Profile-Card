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
    if (!validateName(name)) return;
    if (!validateEmail(email)) return;
    if (!validateMessage(message)) return;
    form.reset();
});

const validateName = (name) => {
    const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (name === '') {
        inputName.classList.add('input--error');
        nameError.classList.remove('is-hidden');
        nameError.textContent = 'Pon tu nombre por favor';
        return false;
    }

    if (name.length < 2) {
        inputName.classList.add('input--error');
        nameError.classList.remove('is-hidden');
        nameError.textContent = 'Nombre no valido';
        return false;
    }

    if (!regexName.test(name)) {
        inputName.classList.add('input--error');
        nameError.classList.remove('is-hidden');
        nameError.textContent = 'El formato no es valido';
        return false;
    }
    inputName.classList.remove('input--error');
    nameError.classList.add('is-hidden');
    nameError.textContent = '';
    return true;
};

const validateEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        inputEmail.classList.add('input--error');
        emailError.classList.remove('is-hidden');
        emailError.textContent = 'Colaca tu correo electronico por favor';
        return false;
    }

    if (!regexEmail.test(email)) {
        inputEmail.classList.add('input--error');
        emailError.classList.remove('is-hidden');
        emailError.textContent = 'El correo electronico no es valido, introduce un correo valido';
        return false;
    }
    inputEmail.classList.remove('input--error');
    emailError.classList.add('is-hidden');
    emailError.textContent = '';
    return true;
};

const validateMessage = (message) => {
    if (message === '') {
        inputMessage.classList.add('input--error');
        messageError.classList.remove('is-hidden');
        messageError.textContent = 'Por favor escribe tu problema para llegar a tu solución';
        return false;
    }

    if (message.length < 40) {
        inputMessage.classList.add('input--error');
        messageError.classList.remove('is-hidden');
        messageError.textContent = 'Explicame a detalle tu problema para llegar una solición optima';
        return false;
    }
    inputMessage.classList.remove('input--error');
    messageError.classList.add('is-hidden');
    messageError.textContent = ''
    return true;
};

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