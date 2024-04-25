document.querySelector(".register-form").addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch("../php/register.php", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la requête.");
        }
        return response.json();
    })
    .then(res => {
        if (res.success) {
            window.location.replace("login.html");
        } else {
            throw new Error(res.error);
        }
    })
    .catch(error => {
        alert(error.message);
    });
});