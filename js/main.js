const viewElements = document.querySelectorAll('.view-element');

let currentView = viewElements[0].dataset.view;
// console.log(vistaActual);
// vistaActual.forEach(view => console.log(view.dataset.view));
let lastView = null;

document.addEventListener('click', (e) => {
    const buttons = e.target.closest('.btn');
    if (!buttons) return;
    let idButton = buttons.id;
    if (idButton === 'openContent') {
        headerContainer.classList.add('card__header--shrink');
        bodyContainer.classList.remove('is-hidden');
        lastView = currentView;
        openContentBtn.classList.add('is-hidden');
        openFormBtn.classList.add('is-show');
        currentView = viewElements[1].dataset.view;
    } else if (idButton === 'openForm') {
        console.log('Open form');
    } else if (idButton === 'closedContent') {
        handleClosedBtn(currentView);
    }
});

const handleClosedBtn = (currentView) => {
    if (currentView === 'details') {
        headerContainer.classList.remove('card__header--shrink');
        bodyContainer.classList.add('is-hidden');
        openContentBtn.classList.remove('is-hidden');
        openFormBtn.classList.remove('is-show');
    }
};

const openContentBtn = document.getElementById('openContent');
const openFormBtn = document.getElementById('openForm');
const closedBtn = document.getElementById('closedContent');
const headerContainer = document.getElementById('headerContainer');
const bodyContainer = document.getElementById('bodyContainer');
const bodyContent = document.getElementById('bodyContent');
const formContainer = document.getElementById('formContainer');
const closedContainerBtn = document.querySelector('.header-btn');
const cardFooter = document.querySelector('.card__footer');

// const mediaQuery = window.matchMedia('(min-width: 768px)');

// let currentView = headerContainer.dataset.view;
// let lastView = null;

// const handleContent = (e) => {
//     if (e.matches) {
//         closedContainerBtn.classList.add('is-hidden');
//         // currentView = bodyContainer.dataset.view;
//         openFormBtn.addEventListener('click', (e) => {
//             const container = e.target.closest('.btn-container');
//             if (!container) return;
//             // lastView = currentView;
//             bodyContent.classList.add('is-hidden');
//             formContainer.classList.remove('is-hidden');
//             // currentView = formContainer.dataset.view;
//             openFormBtn.classList.add('is-hidden');
//             closedContainerBtn.classList.add('is-show');
//             cardFooter.classList.add('is-hidden');
//         });
//         closedBtn.addEventListener('click', (e) => {
//             const container = e.target.closest('.btn-container');
//             if (!container) return;
//             formContainer.classList.add('is-hidden');
//             bodyContent.classList.remove('is-hidden');
//             openFormBtn.classList.remove('is-hidden');
//             closedContainerBtn.classList.remove('is-hidden');
//             closedContainerBtn.classList.remove('is-show');
//             cardFooter.classList.remove('is-hidden');
//         });
//     }
// };

// mediaQuery.addEventListener('change', handleContent);
// handleContent(mediaQuery);


// openContentBtn.addEventListener('click', (e) => {
//     const container = e.target.closest('.btn-container');
//     if (!container) return;
//     lastView = currentView;
//     headerContainer.classList.add('card__header--shrink');
//     bodyContainer.classList.remove('is-hidden');
//     currentView = bodyContainer.dataset.view;
//     openContentBtn.classList.add('is-hidden');
//     openFormBtn.classList.add('is-show');
// });

// openFormBtn.addEventListener('click', (e) => {
//     const container = e.target.closest('.btn-container');
//     if (!container) return;
//     lastView = currentView
//     bodyContent.classList.add('is-hidden');
//     formContainer.classList.remove('is-hidden');
//     currentView = formContainer.dataset.view;
//     openFormBtn.classList.remove('is-show');
// });

// closedBtn.addEventListener('click', (e) => {
//     const container = e.target.closest('.btn-container');
//     if (!container) return;
//     if (lastView === 'summary' && currentView === 'details') {
//         lastView = currentView;
//         headerContainer.classList.remove('card__header--shrink');
//         bodyContainer.classList.add('is-hidden');
//         openFormBtn.classList.remove('is-show');
//         openContentBtn.classList.remove('is-hidden');
//         currentView = headerContainer.dataset.view;
//     } else if (lastView === 'details' && currentView === 'form') {
//         lastView = currentView;
//         formContainer.classList.add('is-hidden');
//         bodyContent.classList.remove('is-hidden');
//         openFormBtn.classList.remove('is-hidden');
//         openFormBtn.classList.add('is-show');
//         currentView = bodyContainer.dataset.view;
//     } else {
//         headerContainer.classList.remove('card__header--shrink');
//         bodyContainer.classList.add('is-hidden');
//         openFormBtn.classList.remove('is-show');
//         openContentBtn.classList.remove('is-hidden');
//         currentView = headerContainer.dataset.view;
//     }
// });