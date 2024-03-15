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

export const togglePassword = (e) => {
    e.prevenetDefault();
    const passwordInput = document.getElementById('password');
    const currentType = passwordInput.getAttribute("type");
    if (currentType === "password") {
        passwordInput.setAttribute("type", "text");
    } else {
        passwordInput.setAttribute("type","password");
    }
}

export const User = {
    login : document.querySelectorAll("input")[0],
    pwd : document.querySelectorAll("input")[1],
    control_form(){
        if (this.login.value && this.pwd.value) {
            const encryptedPassword = encryptedPassword(this.pwd.value);
            localStorage.setItem("login", this.login.value);
            localStorage.setItem("password", encryptedPassword);
            Swal.fire({
                icon: "error",
                title: "Erreur : Mot de passe erroné",
                text : " something went wrong!",
                footer : '<a href= "../index.html"> Pourquoi ce probleme</a>',
            });
        }
    },
}

export function saveFormData() {
    const form = document.querySelector('.register-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            Nom: form.elements['Nom'].value,
            prenom: form.elements['prenom'].value,
            email: form.elements['email'].value,
            pwd: form.elements['pwd'].value,
            ville: form.elements['ville'].value,
            pays: form.elements['pays'].value
        };

        localStorage.setItem('formData', JSON.stringify(formData));

        sendDataToDatabase(formData);
    });
}

function sendDataToDatabase(formData) {
    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {

            console.log('Formulaire envoyé avec succès !');

        } else {
            console.error('Erreur lors de l\'envoi du formulaire');
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi du formulaire :', error);
    });
}

saveFormData();
