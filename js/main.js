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
const modal = document.getElementById('modal');
const closeModalBtn = modal.querySelector('#closeModal');

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meaeklkw';

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

form.addEventListener('submit', async (e) => {
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
    if (!isOptionsValid || !isNameValid || !isEmailValid || !isMessageValid) {
        return;
    };
    const selectedOption = form.querySelector('#options input[type="radio"]:checked');
    const info = {
        interest: selectedOption.value,
        name,
        email,
        message
    };

    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(info)
        });
        const result = await response.json();

        if (!response.ok) {
            const formErrors = Array.isArray(result.errors)
                ? result.errors.map(error => error.message).join(' ')
                : '';
            handelModal(
                'error',
                formErrors || 'We couldn’t send your message. Please try again.'
            );
            return;
        }

        handelModal(
            'success',
            'Your message was sent successfully.\n Thank you for reaching out! I’ll get back to you within 24–48 hours.'
        );
        form.reset();
    } catch (error) {
        console.log('Form submission failed: ', error);
        handelModal('error', 'We couldn’t complete your request. Please check your connection and try again.');
    }
});

const clearForm = () => {
    const globalError = form.querySelector('#errorMessage');
    const inputs = form.querySelectorAll('.input');
    const inputsError = form.querySelectorAll('.input__error');
    globalError.classList.add('is-hidden');
    globalError.textContent = '';
    inputs.forEach(input => input.classList.remove('input--error'));
    inputsError.forEach(error => {
        error.classList.add('is-hidden');
        error.textContent = '';
    });
    form.reset();
};

const showGlobalMessage = (message) => {
    errorMessage.classList.remove('is-hidden');
    errorMessage.textContent = message;
};

const clearGlobalMessage = () => {
    errorMessage.classList.add('is-hidden');
    errorMessage.textContent = '';
};

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

const openModal = () => {
    modal.classList.add('active');
};

const closedModal = () => {
    modal.classList.remove('active');
};

const handelModal = (status, message = '') => {
    const modalStatus = modal.querySelector(`.icon__status-${status}`);
    const modalMessage = modal.querySelector('.modal__message');
    if (!modalStatus) return;
    modalStatus.classList.remove('is-hidden');
    modalMessage.textContent = message;
    openModal();
};

closeModalBtn.addEventListener('click', (e) => {
    const btn = e.target.closest('.modal__closed-btn');
    if (!btn) return;
    modal.querySelectorAll('.icon__status').forEach(icon => icon.classList.add('is-hidden'));
    modal.querySelector('.modal__message').textContent = '';
    closedModal();
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

const handleButtons = (e) => {
    if (!e.matches) {
        openFormBtn.classList.remove('is-show');
    }
};

breakpoint.addEventListener('change', handleButtons);

handleButtons(breakpoint);