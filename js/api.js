const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meaeklkw';

export const sendContactForm = async (data) => {
    const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
            "Content-type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        const formErrors = Array.isArray(result.errors)
            ? result.errors.map(error => error.message).join(' ')
            : '';
        throw new Error(
            formErrors || 'We couldn’t send your message. Please try again.'
        );
    }

    return result;
};