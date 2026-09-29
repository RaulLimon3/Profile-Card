const openContentBtn = document.getElementById('openContent');
const openFormBtn = document.getElementById('openForm');
const closedBtn = document.getElementById('closedContent');
const headerContainer = document.getElementById('headerContainer');
const bodyContainer = document.getElementById('bodyContainer');
const bodyContent = document.getElementById('bodyContent');
const formContainer = document.getElementById('formContainer');

let currentView = headerContainer.dataset.view;
let lastView = null;

openContentBtn.addEventListener('click', (e) => {
    const container = e.target.closest('.btn-container');
    if (!container) return;
    lastView = currentView;
    headerContainer.classList.add('card__header--shrink');
    bodyContainer.classList.remove('is-hidden');
    currentView = bodyContainer.dataset.view;
    openContentBtn.classList.add('is-hidden');
    openFormBtn.classList.remove('is-hidden');
});

openFormBtn.addEventListener('click', (e) => {
    const container = e.target.closest('.btn-container');
    if (!container) return;
    lastView = currentView
    bodyContent.classList.add('is-hidden');
    formContainer.classList.remove('is-hidden');
    currentView = formContainer.dataset.view;
    openFormBtn.classList.add('is-hidden');
});

closedBtn.addEventListener('click', (e) => {
    const container = e.target.closest('.btn-container');
    if (!container) return;
    if (lastView === 'summary' && currentView === 'details') {
        lastView = currentView;
        headerContainer.classList.remove('card__header--shrink');
        bodyContainer.classList.add('is-hidden');
        openFormBtn.classList.add('is-hidden');
        openContentBtn.classList.remove('is-hidden');
        currentView = headerContainer.dataset.view;
    } else if (lastView === 'details' && currentView === 'form') {
        lastView = currentView;
        formContainer.classList.add('is-hidden');
        bodyContent.classList.remove('is-hidden');
        openFormBtn.classList.remove('is-hidden');
        openContentBtn.classList.add('is-hidden');
        currentView = bodyContainer.dataset.view;
    } else {
        headerContainer.classList.remove('card__header--shrink');
        bodyContainer.classList.add('is-hidden');
        openFormBtn.classList.add('is-hidden');
        openContentBtn.classList.remove('is-hidden');
        currentView = headerContainer.dataset.view;
    }
});