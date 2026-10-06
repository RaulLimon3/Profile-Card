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
const optionsField = document.querySelectorAll('#options input[type="radio"]');
const errorOption = document.getElementById('optionsError');
const errorMessage = document.getElementById('errorMessage');
const inputName = document.getElementById('name');
const nameError = document.getElementById('nameError');
const inputEmail = document.getElementById('email');
const emailError = document.getElementById('emailError');
const inputMessage = document.getElementById('message');
const messageError = document.getElementById('messageError');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const options = Array.from(optionsField).some(optionField => optionField.checked);
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const message = inputMessage.value.trim();
    if (options === false && name === '' && email === '' && message === '') {
        validateOptions(options);
        errorMessage.classList.remove('is-hidden');
        inputName.classList.add('input--error');
        inputEmail.classList.add('input--error');
        inputMessage.classList.add('input--error');
        errorMessage.textContent = 'Por favor llena los campos.';
        return;
    }
    errorMessage.classList.add('is-hidden');
    errorMessage.textContent = '';
    if (!validateOptions(options)) return;
    if (!validateName(name)) return;
    if (!validateEmail(email)) return;
    if (!validateMessage(message)) return;
    form.reset();
});

// const showOptionError = (selectedOptions) => {
    
// }

const validateOptions = (options) => {
    if (!options) {
        optionsField.forEach(option => {
            option.closest('.input').classList.add('input--error');
        });
        errorOption.classList.remove('is-hidden');
        errorOption.textContent = 'Please select an option.';
        return false;
    }
    optionsField.forEach(option => {
        option.closest('.input').classList.remove('input--error');
    });
    errorOption.classList.add('is-hidden');
    errorOption.textContent = '';
    return true;
};

const validateName = (name) => {
    const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (name === '') {
        showInputError(inputName, nameError, 'Pon tu nombre por favor.');
        return false;
    }

    if (name.length < 2) {
        showInputError(inputName, nameError, 'Nombre no valido.');
        return false;
    }

    if (!regexName.test(name)) {
        showInputError(inputName, nameError, 'El formato no es valido.');
        return false;
    }
    clearInputError(inputName, nameError);
    return true;
};

const validateEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showInputError(inputEmail, emailError, 'Coloca tu correo electronico por favor.');
        return false;
    }

    if (!regexEmail.test(email)) {
        showInputError(inputEmail, emailError, 'El correo electronico no es valido, introduce un correo valido.');
        return false;
    }
    clearInputError(inputEmail, emailError);
    return true;
};

const validateMessage = (message) => {
    if (message === '') {
        showInputError(inputMessage, messageError, 'Por favor escribe tu problema para llegar a tu solución.');
        return false;
    }

    if (message.length < 40) {
        showInputError(inputMessage, messageError, 'Explícame más detalle tu problema para llegar una solución optima');
        return false;
    }
    clearInputError(inputMessage, messageError);
    return true;
};

const showInputError = (input, output, message) => {
    input.classList.add('input--error');
    setMessageError(output, message)
};

const clearInputError = (input, output) => {
    input.classList.remove('input--error');
    output.classList.add('is-hidden');
    output.textContent = '';
};

const setMessageError = (element, message = '') => {
    element.classList.remove('is-hidden');
    element.textContent = message;
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