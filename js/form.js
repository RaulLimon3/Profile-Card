import { sendContactForm } from "./api.js";
import { handleModal, initModal } from "./modal.js";
import { validateEmail, validateMessage, validateName, validateOptions } from "./validation.js";

initModal();

const form = document.getElementById('formContact');
const globalError = document.getElementById('errorMessage');
const optionInput = document.getElementById('options');
const optionsField = document.querySelectorAll('#options input[type="radio"]');
const errorOptions = document.getElementById('optionsError');
const inputName = document.getElementById('name');
const errorName = document.getElementById('nameError');
const inputEmail = document.getElementById('email');
const errorEmail = document.getElementById('emailError');
const inputMessage = document.getElementById('message');
const messageError = document.getElementById('messageError');

const initForm = () => {
    optionInput.addEventListener('change', (e) => {
        if (!e.target.matches('input[type="radio"]')) return;
        const isChecked = e.target.checked;
        showOptionErrors(isChecked, validateOptions(isChecked));
    });

    inputName.addEventListener('change', (e) => {
        const nameValue = e.target.value.trim();
        showInputError(inputName, errorName, validateName(nameValue));
    });

    inputEmail.addEventListener('change', (e) => {
        const emailValue = e.target.value.trim();
        showInputError(inputEmail, errorEmail, validateEmail(emailValue));
    });

    inputMessage.addEventListener('change', (e) => {
        const messageValue = e.target.value.trim();
        showInputError(inputMessage, messageError, validateMessage(messageValue));
    });

    form.addEventListener('change', () => {
        const formData = new FormData(form);
        const dataObject = Object.fromEntries(formData.entries());
        const anyValue = Object.values(dataObject).some(value => value.trim() !== '');
        if (anyValue) {
            clearGlobalMessage();
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.btn-submit');
        const options = Array.from(optionsField).some(optionField => optionField.checked);
        const name = inputName.value.trim();
        const email = inputEmail.value.trim();
        const message = inputMessage.value.trim();
        if (options === false && name === '' && email === '' && message === '') {
            showGlobalMessage('Please fill in all required fields.');
            setOptionsErrorState(options);
            inputName.classList.add('input--error');
            inputEmail.classList.add('input--error');
            inputMessage.classList.add('input--error');
            return;
        }
        clearGlobalMessage();
        const optionsValidation = validateOptions(options);
        showOptionErrors(options, optionsValidation);
        const nameValidation = validateName(name);
        showInputError(inputName, errorName, nameValidation);
        const emailValidation = validateEmail(email);
        showInputError(inputEmail, errorEmail, emailValidation);
        const messageValidation = validateMessage(message);
        showInputError(inputMessage, messageError, messageValidation);
        if (!optionsValidation.isValid || !nameValidation.isValid || !emailValidation.isValid || !messageValidation.isValid) {
            return;
        };
        const selectedOption = form.querySelector('#options input[type="radio"]:checked');
        const info = {
            interest: selectedOption.value,
            name,
            email,
            message
        };
        const originalButtonText = submitBtn.textContent;
        submitBtn.classList.add('btn-submit--active');
        submitBtn.textContent = 'Sending message...';
        submitBtn.disabled = true;
        try {
            await sendContactForm(info);
            handleModal(
                'success',
                'Your message was sent successfully. Thank you for reaching out! I’ll get back to you within 24–48 hours.'
            );
            form.reset();
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : 'We couldn’t complete your request. Please check your connection and try again.';
            handleModal('error', message);
        } finally {
            submitBtn.classList.remove('btn-submit--active');
            submitBtn.textContent = originalButtonText;
            submitBtn.disabled = false;
        }
    });
};

const showGlobalMessage = (message) => {
    globalError.classList.remove('is-hidden');
    globalError.textContent = message;
};

const clearGlobalMessage = () => {
    globalError.classList.add('is-hidden');
    globalError.textContent = '';
};

const clearForm = () => {
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
}

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

const showOptionErrors = (options, { isValid, message }) => {
    if (isValid !== true) {
        setOptionsErrorState(options);
        errorOptions.classList.remove('is-hidden');
        errorOptions.textContent = message;
        return false;
    }
    setOptionsErrorState(options);
    errorOptions.classList.add('is-hidden');
    errorOptions.textContent = '';
    return true;
};

const showInputError = (input, output, { isValid, message }) => {
    if (isValid !== true) {
        input.classList.add('input--error');
        setMessageError(output, message);
        return false;
    }
    clearInputError(input, output);
    return true;
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

export { initForm, clearForm };