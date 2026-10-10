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
const optionInput = document.getElementById('options');
const optionsField = document.querySelectorAll('#options input[type="radio"]');
const errorOption = document.getElementById('optionsError');
const errorMessage = document.getElementById('errorMessage');
const inputName = document.getElementById('name');
const nameError = document.getElementById('nameError');
const inputEmail = document.getElementById('email');
const emailError = document.getElementById('emailError');
const inputMessage = document.getElementById('message');
const messageError = document.getElementById('messageError');

optionInput.addEventListener('change', (e) => {
    if (!e.target.matches('input[type="radio"]')) return;
    const isChecked = e.target.checked;
    validateOptions(isChecked);
});

inputName.addEventListener('change', (e) => {
    const nameValue = e.target.value.trim();
    validateName(nameValue);
});

inputEmail.addEventListener('change', (e) => {
    const emailValue = e.target.value.trim();
    validateEmail(emailValue);
});

inputMessage.addEventListener('change', (e) => {
    const messageValue = e.target.value.trim();
    validateMessage(messageValue);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const options = Array.from(optionsField).some(optionField => optionField.checked);
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const message = inputMessage.value.trim();
    if (options === false && name === '' && email === '' && message === '') {
        setOptionsErrorState(options);
        errorMessage.classList.remove('is-hidden');
        inputName.classList.add('input--error');
        inputEmail.classList.add('input--error');
        inputMessage.classList.add('input--error');
        errorMessage.textContent = 'Please fill in all required fields.';
        return;
    }
    errorMessage.classList.add('is-hidden');
    errorMessage.textContent = '';
    const isOptionsValid = validateOptions(options);
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isMessageValid = validateMessage(message);
    if (!isOptionsValid || !isNameValid || !isEmailValid || !isMessageValid) return;
    form.reset();
});

const setOptionsErrorState = (selectedOptions) => {
    if (!selectedOptions) {
        optionsField.forEach(option => {
            option.closest('.input').classList.add('input--error');
        });
        return false;
    }
    optionsField.forEach(option => {
        option.closest('.input').classList.remove('input--error');
    });
    return true;
}

const validateOptions = (options) => {
    if (!options) {
        setOptionsErrorState(options);
        errorOption.classList.remove('is-hidden');
        errorOption.textContent = 'Please select an option.';
        return false;
    }
    setOptionsErrorState(options);
    errorOption.classList.add('is-hidden');
    errorOption.textContent = '';
    return true;
};

const validateName = (name) => {
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s'-]+$/;
    if (name === '') {
        showInputError(inputName, nameError, 'Please enter your name.');
        return false;
    }

    if (name.length < 2 || name.length > 50) {
        showInputError(inputName, nameError, 'Please enter a valid name.');
        return false;
    }

    if (!regexName.test(name)) {
        showInputError(inputName, nameError, 'Please use only letters, spaces, hyphens, and apostrophes in your name.');
        return false;
    }
    clearInputError(inputName, nameError);
    return true;
};

const validateEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showInputError(inputEmail, emailError, 'Please enter your email address.');
        return false;
    }

    if (!regexEmail.test(email)) {
        showInputError(inputEmail, emailError, 'Please enter a valid email address.');
        return false;
    }
    clearInputError(inputEmail, emailError);
    return true;
};

const validateMessage = (message) => {
    if (message === '') {
        showInputError(inputMessage, messageError, 'Please describe your project.');
        return false;
    }

    if (message.length < 20) {
        showInputError(inputMessage, messageError, 'Please provide more details about your project.');
        return false;
    }

    if (message.length > 2000) {
        showInputError(
            inputMessage,
            messageError,
            'Your message is a little too long. Please summarize it in 2,000 characters or fewer.'
        );
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