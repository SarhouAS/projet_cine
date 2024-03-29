$("form").submit(event => {
    event.preventDefault(); 

    $.ajax({
        url: "../php/register.php",
        type: "POST",
        dataType: "json", 
        data: { 
            firstname: $("#Nom").val(),
            lastname: $("#prenom").val(),
            email: $("#email").val(),
            pwd: $("#pwd").val(),
            city: $("#ville").val(),
            country: $("#pays").val()
        },
        success: (res) => {
            
            if (res.success) window.location.replace("../login.html");
            else alert(res.error); 
        }
    });
});