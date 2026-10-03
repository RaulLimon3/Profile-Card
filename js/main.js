const viewElements = document.querySelectorAll('.view-element');
const openContentBtn = document.getElementById('openContent');
const closedContentBtn = document.getElementById('closedContent');
const openFormBtn = document.getElementById('openForm');
const closedFormBtn = document.getElementById('closedForm');
const headerContainer = document.getElementById('headerContainer');
const bodyContainer = document.getElementById('bodyContainer');
const bodyContent = document.getElementById('bodyContent');
const formContainer = document.getElementById('formContainer');

openContentBtn.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    closedFormBtn.classList.add('is-hidden');
    headerContainer.classList.add('card__header--shrink');
    bodyContainer.classList.remove('is-hidden');
    openContentBtn.classList.add('is-hidden');
    openFormBtn.classList.add('is-show');
});

closedContentBtn.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    headerContainer.classList.remove('card__header--shrink');
    bodyContainer.classList.add('is-hidden');
    openContentBtn.classList.remove('is-hidden');
    openFormBtn.classList.remove('is-show');
});

openFormBtn.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    closedContentBtn.classList.add('is-hidden');
    closedFormBtn.classList.remove('is-hidden');
    openFormBtn.classList.remove('is-show');
    bodyContent.classList.add('is-hidden');
    formContainer.classList.remove('is-hidden');
});

closedFormBtn.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    closedContentBtn.classList.remove('is-hidden');
    closedFormBtn.classList.add('is-hidden');
    openFormBtn.classList.add('is-show');
    bodyContent.classList.remove('is-hidden');
    formContainer.classList.add('is-hidden');
});

// let currentView = viewElements[0].dataset.view;
// let lastView = null;

// document.addEventListener('click', (e) => {
//     const buttons = e.target.closest('.btn');
//     if (!buttons) return;
//     let idButton = buttons.id;
//     if (idButton === 'openContent') {
//         headerContainer.classList.add('card__header--shrink');
//         bodyContainer.classList.remove('is-hidden');
//         lastView = currentView;
//         openContentBtn.classList.add('is-hidden');
//         openFormBtn.classList.add('is-show');
//         currentView = viewElements[1].dataset.view;
//     } else if (idButton === 'openForm') {
//         lastView = currentView;
//         bodyContent.classList.add('is-hidden');
//         formContainer.classList.remove('is-hidden');
//         currentView = viewElements[2].dataset.view;
//         console.log(currentView);
//         openFormBtn.classList.remove('is-show');
//     } else if (idButton === 'closedContent') {
//         handleClosedBtn(lastView);
//     }
// });

// const handleClosedBtn = (prevView) => {
//     if (prevView === 'summary') {
//         headerContainer.classList.remove('card__header--shrink');
//         bodyContainer.classList.add('is-hidden');
//         openContentBtn.classList.remove('is-hidden');
//         openFormBtn.classList.remove('is-show');
//         lastView = currentView;
//     } else {
//         formContainer.classList.add('is-hidden');
//         bodyContent.classList.remove('is-hidden');
//         openFormBtn.classList.remove('is-hidden');
//         openFormBtn.classList.add('is-show');
//         lastView = viewElements[0].dataset.view;
//         console.log(prevView);
//     }
// };

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