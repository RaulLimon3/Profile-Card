const modal = document.getElementById('modal');
const closedModalBtn = document.getElementById('closeModal');

const initModal = () => {
    closedModalBtn.addEventListener('click', (e) => {
        const btn = e.target.closest('.modal__closed-btn');
        if (!btn) return;
        modal.querySelectorAll('.icon__status').forEach(icon => icon.classList.add('is-hidden'));
        modal.querySelector('.modal__message').textContent = '';
        closedModal();
    });
};

const openModal = () => {
    modal.classList.add('active');
};

const closedModal = () => {
    modal.classList.remove('active');
};

const handleModal = (status, message) => {
    const modalStatus = modal.querySelector(`.icon__status-${status}`);
    const modalMessage = modal.querySelector('.modal__message');
    if (!modalStatus) return;
    modalStatus.classList.remove('is-hidden');
    modalMessage.textContent = message;
    openModal();
};

export { initModal, handleModal };