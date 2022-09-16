var btnRegister = document.getElementById("htmBtnRegister");


btnRegister.addEventListener("click", function () {
    var request = new XMLHttpRequest();
    var htm_firstname = document.getElementById("registerFirstName")
    var htm_email = document.getElementById("htmEmail")
    var htm_password= document.getElementById("htmlPassword")
    
    
    
    request.open("POST", "register.php", true);
    var data = new FormData();
    data.append('firstname', htm_firstname.value);
    data.append('email', htm_email.value);
    data.append('password', htm_password.value);

    request.send(data)
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
        htm_firstname.value = '';
        htm_email.value = '';
        htm_password.value = '';
        
    }
});


var userLogin = document.getElementById("usernameLogin")
var passLogin = document.getElementById("passwordLogin")
var btnLogin = document.getElementById("htmbtnLogin")

btnLogin.addEventListener("click",function(){
    var backEndSCript = "login.php";
    var request = new XMLHttpRequest();
    request.open("POST",backEndSCript, true);
     
    var data = new FormData();
    data.append('user',userLogin.value);
    data.append('pass',passLogin.value);      
    request.send(data)

    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            if(this.responseText=="username not found!"){
                alert("user not found");
            }else{
                alert("login success")
                window.location.href = "http://www.google.com"
            }
         }
         

    }
});
