link_profile.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        if (hrole.value == 1) {
            window.location.href = "dashboard.html"; //dashboard
        } else {
            window.location.href = "home.html";
        }

    } else {    // no web storage
        console.log("**** No web storage.");

        if (d[2] == 1) {   //dashboard
            window.location.href = "dashboard.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        } else {
            window.location.href = "home.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        }

    }    
}
link_appoint.onclick = () => {
    if (verified != "1") {
        btn_notverified.click();
        return;
    }

    if (typeof (Storage) !== "undefined") {
        if (hrole.value == 1) {
            window.location.href = "dashboard.html"; //dashboard
        } else {
            window.location.href = "appointments.html";
        }

    } else {    // no web storage
        console.log("**** No web storage.");

        if (d[2] == 1) {   //dashboard
            window.location.href = "dashboard.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        } else {
            window.location.href = "appointments.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        }

    }    
}

function requestReVerify(userid) {
    let route = "services/back/php/notifs/upd_user_reverify.php?uid=" + userid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "NOTIFICATIONS: ReVerifyUsersInfo - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            let d;
            try { 
                d = JSON.parse(respo); 
            } catch (e) {
                console.log(tag, e)
                return; 
            }   console.log(tag, d.success);
            
            if (d.success == false) { 
                console.log(tag, d.message);
                return; 
            }
            alert(d.message);

            getNotifications(userid);
        }
    };
}