const urlParams = new URLSearchParams(window.location.search); 

if (urlParams.get("logout")) {
  
    $.ajax({
        url: "../php/logout.php", 
        type: "GET",
        dataType: "json",
        success: () => {
           
            localStorage.removeItem("user");
        }
    });
}

$("form").submit((event) => { 
    event.preventDefault(); 

    $.ajax({
        url: "../php/login.php", 
        type: "POST", 
        dataType: "json", 
        data: { 
            email: $("#email").val(),
            pwd: $("#password").val()
        },
        success: (res) => {
            if (res.success) { 
                localStorage.setItem("user", JSON.stringify(res.user)); 
                window.location.replace("../index.html"); 
            } else alert(res.error);
        }
    });
});