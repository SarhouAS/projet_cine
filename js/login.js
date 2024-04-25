const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("logout")) {
    fetch("../php/logout.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la déconnexion.");
        }
        localStorage.removeItem("user");
    })
    .catch(error => {
        console.error("Erreur: ", error.message);
    });
}

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch("../php/login.php", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la connexion.");
        }
        return response.json();
    })
    .then(res => {
        if (res.success) {
            localStorage.setItem("user", JSON.stringify(res.user));
            window.location.replace("../index.html");
        } else {
            throw new Error(res.error);
        }
    })
    .catch(error => {
        alert(error.message);
    });
});
