const validateOptions = (options) => {
    if (!options) return { isValid: false, message: 'Please select an option.' };
    return { isValid: true, message: '' };
};

const validateName = (name) => {
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s'-]+$/;
    if (name === '') return { isValid: false, message: 'Please enter your name.' };

    if (name.length < 2 || name.length > 50) return { isValid: false, message: 'Please enter a valid name.' };

    if (!regexName.test(name)) return { isValid: false, message: 'Please use only letters, spaces, hyphens, and apostrophes in your name.' };

    return { isValid: true, message: '' };
};

const validateEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') return { isValid: false, message: 'Please enter your email address.' };

    if (!regexEmail.test(email)) return { isValid: false, message: 'Please enter a valid email address.' };

    return { isValid: true, message: '' };
};

const validateMessage = (message) => {
    if (message === '') return { isValid: false, message: 'Please describe your project.' };

    if (message.length < 20) return { isValid: false, message: 'Please provide more details about your project.' };

    if (message.length > 2000) return { isValid: false, message: 'Your message is a little too long. Please summarize it in 2,000 characters or fewer.' };

    return {isValid: true, message: ''};
};

export { validateOptions, validateName, validateEmail, validateMessage };