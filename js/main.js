const openContentBtn = document.getElementById('openContent');
const openFormBtn = document.getElementById('openForm');
const closedBtn = document.getElementById('closedContent');
const headerContainer = document.getElementById('headerContainer');
const bodyContainer = document.getElementById('bodyContainer');
const bodyContent = document.getElementById('bodyContent');
const formContainer = document.getElementById('formContainer');

openContentBtn.addEventListener('click', (e) => {
    const container = e.target.closest('.btn-container');
    if (!container) return
    headerContainer.classList.add('card__header--shrink');
    bodyContainer.classList.remove('is-hidden');
    openContentBtn.classList.add('is-hidden');
    openFormBtn.classList.remove('is-hidden');
});

openFormBtn.addEventListener('click', (e) => {
    const container = e.target.closest('.btn-container');
    if (!container) return;
    bodyContent.classList.add('is-hidden');
    formContainer.classList.remove('is-hidden');
    openFormBtn.classList.add('is-hidden');
});

closedBtn.addEventListener('click', (e) => {
    const container = e.target.closest('.btn-container');
    if (!container) return;
    headerContainer.classList.remove('card__header--shrink');
    bodyContainer.classList.add('is-hidden');
    openContentBtn.textContent = 'About me';
});

/*
    Header expandido
    resumen
    Boton de About me

    Clic en About me
    Encoje el header y muestra el boton de cerrar
    Muestra el contenido detallado
    Cambia el botón de texto a Get in touch

    Clic en Get in touch
    Oculta el contenido detallado 
    Muestra el formulario de contacto
    Oculta el boton de Get in touch

*/