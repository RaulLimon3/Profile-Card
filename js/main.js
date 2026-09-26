const openBtn = document.getElementById('openContent');
const closedBtn = document.getElementById('closedContent');
const header = document.getElementById('headerContainer');
const body = document.getElementById('bodyContainer');

openBtn.addEventListener('click', (e) => {
    const container = e.target.closest('.btn-container');
    if (!container) return
    header.classList.add('card__header--shrink');
    body.classList.remove('is-hidden');
    openBtn.textContent = 'Get in touch';
});

closedBtn.addEventListener('click', (e) => {
    const container = e.target.closest('.btn-container');
    if (!container) return;
    header.classList.remove('card__header--shrink');
    body.classList.add('is-hidden');
    openBtn.textContent = 'About me';
});