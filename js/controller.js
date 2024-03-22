export function toggleElements() {
    const body = document.querySelector('body');
    const toggle = document.getElementById('toggle');
    const elementsToToggle = document.querySelectorAll('.container, .logo, .text, .p-box, .paragraph-box, .submit-button1');

    toggle.onclick = () => {
        toggle.classList.toggle("active");
        body.classList.toggle("active");

        elementsToToggle.forEach(element => {
            element.classList.toggle("active");
        });
    };
}
