btn_update.onclick = () => {
    let userid = window.localStorage.getItem("uid");

    let failfieldctr = 0;
    if (inp_firstname.value == "") { failfieldctr++; }
    if (inp_lastname.value == "") { failfieldctr++; }
    if (inp_midname.value == "") { failfieldctr++; }
    if (inp_email.value == "") { failfieldctr++; }
    if (inp_phone.value == "") { failfieldctr++; }
    if (inp_address.value == "") { failfieldctr++; }
    if (inp_bday.value == "") { failfieldctr++; }
    if (failfieldctr > 0) {
        alert('all field(s) required.');
        return;
    }

    let data = new FormData();
    data.append("fname", inp_firstname.value);
    data.append("mname", inp_midname.value);
    data.append("lname", inp_lastname.value);
    data.append("email", inp_email.value);
    data.append("phone", inp_phone.value);
    data.append("addr", inp_address.value);
    data.append("bday", inp_bday.value);

    data.append("islaw", chk_lawyer.checked);

    data.append("uid", userid);

    let route = "services/back/php/home/upd_user_info.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", route, true);
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "HOME: UpdateUsersInfo - ";
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

            getUserInfo(userid);
        }
    };
}

inp_photo.onchange = () => {
    uploadPhoto(0);
}

inp_validId.onchange = () => {
    uploadPhoto(1);
}

function uploadPhoto(idtype) {
    let userid = window.localStorage.getItem("uid");

    let photo = inp_photo;
    if (idtype == 1) {
        photo = inp_validId;
    }
    // else if (idtype == 2) {
    //     photo = inp_prcId;
    // }

    let ext = photo.value.split('.').pop();
    if (ext != "jpg" && ext != "png" && ext != "jpeg") {
        alert("The selected file is not a photo! Only accepts .jpg and .png. Convert first your photo, also in less than 20MB.");
        return false;
    }

    let data = new FormData();
    data.append("photo", photo.files[0]);
    data.append("type", idtype);
    data.append("uid", userid);

    let route = "services/back/php/home/upd_user_photo.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", route, true);
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "HOME: UpdateUsersInfo - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            let d;
            try { 
                d = JSON.parse(respo); 
            } 
            catch (e) {
                alert(d.message);
                console.log(tag, e)
                return; 
            }   console.log(tag, d.success);
            
            if (d.success == false) { 
                console.log(tag, d.message);
                return; 
            }
            alert(d.message);

            getUserInfo(userid);
        }
    };
}

link_notifs.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        if (hrole.value == 1) {
            window.location.href = "dashboard.html"; //dashboard
        } else {
            window.location.href = "notifications.html";
        }

    } else {    // no web storage
        console.log("**** No web storage.");

        if (d[2] == 1) {   //dashboard
            window.location.href = "dashboard.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        } else {
            window.location.href = "notifications.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
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