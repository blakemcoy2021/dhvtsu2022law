///show password///

var showPassword = document.getElementById("showPassword")

showPassword.addEventListener("click", function () {
    var password = document.getElementById("htmlPassword")
    if (password.type == "password") {
        password.type = "text";
    } 
    else {
        password.type = "password";
    }
});

///valid error///

var nameError = document.getElementById("nameError")
var passError = document.getElementById("passwordError")
var emailError = document.getElementById("emailError")
function validateUsername() {
    var name1 = document.getElementById("htmInpRegUsername").value

    if (name1.length >= 1) {
        nameError.innerHTML = '<i class="fas fa-solid fa-circle-check" style="color:green"></i>'

    } 
    else {
        nameError.innerHTML = '<i class="fa-solid fa-circle-xmark" style="color:red"></i>'
    };

};
function validateEmail() {
    var email = document.getElementById("htmEmail").value
    var valEmail =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email.length == 0) {
        emailError.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color:orange"></i>'
        return false;
    };
    if (!email.match(valEmail)) {
        emailError.innerHTML = '<i class="fa-solid fa-circle-xmark" style="color:red"></i>'
        return false;
    };

    emailError.innerHTML = '<i class="fas fa-solid fa-circle-check" style="color:green"></i>'
    return true;

};
function validatePassword() {
    var pass1 = document.getElementById("htmlPassword").value
    if (pass1.length > 6) {
        passError.innerHTML = '<i class="fas fa-solid fa-circle-check" style="color:green"></i>'
    
    };
    if(pass1.length < 6){
        passError.innerHTML = '<i class="fa-solid fa-circle-xmark" style="color:red"></i>'
    }
   
};



///register////

var btnRegister = document.getElementById("htmBtnRegister");
btnRegister.addEventListener("click", function () {

    var request = new XMLHttpRequest();
    var htm_username = document.getElementById("htmInpRegUsername")
    var htm_email = document.getElementById("htmEmail")
    var htm_password = document.getElementById("htmlPassword")

    route = "services/back/php/register/register.php";
    request.open("POST", route, true);
    var data = new FormData();
    data.append('username', htm_username.value);
    data.append('email', htm_email.value);
    data.append('password', htm_password.value);

    request.send(data)
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "Signup failed: User already exist.") {
                $(function () {
                    Swal.fire(
                        'Signup Failed',
                        'Username Already Exist',
                        'error'
                    )
                });

            } 
            else if (this.responseText == "Register Success") {
                $(function () {
                    Swal.fire(
                        'Registration Success',
                        ``,
                        'success'
                    )
                });
            }
        }
        htm_username.value = '';
        htm_email.value = '';
        htm_password.value = '';
        nameError.innerHTML ='<i class="fa-solid fa-circle-exclamation" style="color:orange"></i>' 
        passError.innerHTML ='<i class="fa-solid fa-circle-exclamation" style="color:orange"></i>' 
        emailError.innerHTML ='<i class="fa-solid fa-circle-exclamation" style="color:orange"></i>'        
    }
});

////login/////
var userLogin = document.getElementById("usernameLogin")
var passLogin = document.getElementById("passwordLogin")
var btnLogin = document.getElementById("htmBtnLogin")

btnLogin.addEventListener("click", function () {

    var backEndSCript = "services/back/php/login/login.php";
    var request = new XMLHttpRequest();
    request.open("POST", backEndSCript, true);

    var data = new FormData();
    data.append('user', userLogin.value);
    data.append('pass', passLogin.value);
    request.send(data)

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (this.responseText == "username not found!") {
                $(function () {
                    Swal.fire(
                        'Failed to login',
                        'Incorrect Username Or Password',
                        'error'
                    )
                });
            };
            if (this.responseText == "login success to !") {
                window.location.href = "index.html"
            };

        };



    }

});


