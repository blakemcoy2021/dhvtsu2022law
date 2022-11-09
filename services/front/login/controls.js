btn_login.onclick = (event) => {
    fnLogin(event);
}

function fnLogin(event) {
    event.preventDefault();

    let failfieldctr = 0;
    if (uname.value == "") { failfieldctr++; }
    if (passw.value == "") { failfieldctr++; }
    if (failfieldctr > 0) {
        alert("All field(s) required!");
        return false;
    }

    let data = "uname=" + uname.value + "&passw=" + passw.value;
    var xmlhttp = new XMLHttpRequest();
    route = "services/back/php/login/login.php";
    xmlhttp.open("POST", route, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            //**below is template: json formatted
            // let d;
            // try {
            //     d = JSON.parse(this.responseText);
            // } catch (e) {
            //     alert('Response Format error! ' + this.responseText);
            //     return false;

            // }
            // if (d.success == false) {
            //     alert(d.message);
            //     return false;

            // } console.log(d.success);



            uname.value = "";
            passw.value = "";

            // d = d.success.split(",");

            // alert("Welcome aboard Mr/Ms. " + d[1]); //[2]
            // if (typeof (Storage) !== "undefined") {
            //     //window.localStorage.setItem("role", d[0]);
            //     window.localStorage.setItem("uid", d[0]);
            //     window.localStorage.setItem("fname", d[1].replace("-", " "));

            //     // if (d[0] == "superadmin" || d[0] == "admin") {
            //     //     window.location.href = "dashboard.html"; //dashboard
            //     // } else {
            //     //     window.location.href = "home.html";
            //     // }

            //     window.location.href = "dashboard.html";

            // } else {    // no web storage
            //     console.log("**** No web storage.");

            //     // if (d[0] == "superadmin" || d[0] == "admin") {   //dashboard
            //     //     window.location.href = "dashboard.html?uid=" + d[1] + "&fname=" + d[2].replace("-", " ");
            //     // } else {
            //     //     window.location.href = "home.html?uid=" + d[1] + "&fname=" + d[2].replace("-", " ");
            //     // }

            //     window.location.href = "dashboard.html?uid=" + d[0] + "&fname=" + d[1].replace("-", " ");
            // }


        } else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };
};


var validUsername = false;
var validEmail = false;
var validPassword = false;

btn_register.onclick = (event) => {
    fnRegister(event);
}

function fnRegister(event) {
    event.preventDefault();

    if (!validUsername) { alert("Invalid Username. Minimum 2 characters."); return false; }
    if (!validEmail) { alert("Invalid Email Format."); return false; }
    if (!validPassword) { alert("Invalid Password. Minimum 7 characters."); return false; }

    let failfieldctr = 0;
    if (username.value == "") { failfieldctr++; }
    if (password.value == "") { failfieldctr++; }
    if (email.value == "") { failfieldctr++; }
    if (failfieldctr > 0) {
        alert("All field(s) required!");
        return false;
    }

    let data = "username=" + username.value + "&password=" + password.value;
        data += "&email=" + email.value; console.log(data);
    var xmlhttp = new XMLHttpRequest();
    route = "services/back/php/login/register.php";
    xmlhttp.open("POST", route, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            //**below is template: json formatted
            // let d;
            // try {
            //     d = JSON.parse(this.responseText);
            // } catch (e) {
            //     alert('Response Format error! ' + this.responseText);
            //     return false;

            // }
            // if (d.success == false) {
            //     alert(d.message);
            //     return false;

            // } console.log(d.success);



            username.value = "";
            password.value = "";
            email.value = "";


        } else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };
};

///show password///

var showPassword = document.getElementById("showPassword")

showPassword.addEventListener("click", function () {
    var password = document.getElementById("htmlPassword")
    if (password.type === "password") {
        password.type = "text";
    } else {
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
        validUsername = true
    } else {
        nameError.innerHTML = '<i class="fa-solid fa-circle-xmark" style="color:red"></i>'
        validUsername = false
    };

};
function validateEmail() {
    var email = document.getElementById("htmEmail").value
    var valEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email.length == 0) {
        emailError.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color:orange"></i>'
        validEmail = false;
        return false;
    };
    if (!email.match(valEmail)) {
        emailError.innerHTML = '<i class="fa-solid fa-circle-xmark" style="color:red"></i>'
        validEmail = false;
        return false;
    };

    emailError.innerHTML = '<i class="fas fa-solid fa-circle-check" style="color:green"></i>'
    validEmail = true;
    return true;

};
function validatePassword() {
    var pass1 = document.getElementById("htmlPassword").value
    if (pass1.length > 6) {
        passError.innerHTML = '<i class="fas fa-solid fa-circle-check" style="color:green"></i>'
        validPassword = true;
    };
    if (pass1.length < 6) {
        passError.innerHTML = '<i class="fa-solid fa-circle-xmark" style="color:red"></i>'
        validPassword = false;
    }

};
