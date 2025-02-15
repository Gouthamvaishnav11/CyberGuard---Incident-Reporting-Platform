document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.querySelector('.navbar-toggler');
    const navbar = document.querySelector('#navbarNav');

    // Single click to toggle 'show' class
    toggler.addEventListener('click', () => {
        navbar.classList.toggle('show');
    });

    // Double click to forcefully close the navbar
    toggler.addEventListener('dblclick', () => {
        navbar.classList.remove('show'); // Remove 'show' class on double click
    });
});
