function closeModal() {
    document.getElementById("htmBtnBackDropModal").click();
    window.sessionStorage.setItem("userid", 0);    
    window.sessionStorage.setItem("usertyp", "");
}

function getUserInfo(userid, usertype) {
    document.getElementById("htmAncBackDropModal").click();

    window.sessionStorage.setItem("userid", userid);
    window.sessionStorage.setItem("usertyp", usertype);

    let route = "services/back/php/dashboard/get_user_info.php?uid=" + userid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "DASHBOARD: GetUsersInfo - ";
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

            var records;
            try { 
                records = JSON.parse(d.success); 
            } catch (e) {
                console.log(tag, e)
                return; 
            }   console.log(tag, records);

            let uploadphoto = records.user_photo;
            let uploadvalidid = records.user_validid;
            
            let fullname = records.user_lastname + ", " + records.user_firstname + " " + records.user_midname;
            let address = records.contact_address;
            let contact = records.contact_phone;
            let email = records.contact_email;
            let bday = records.user_birthdate;

            var formattedDate = bday.split("-")
            var birthdateTimeStamp = new Date(formattedDate[0], formattedDate[1], formattedDate[2])
            var currentDate = new Date().getTime();
            var difference = currentDate - birthdateTimeStamp;
            var currentAge = Math.floor(difference / 31557600000);
            if (currentAge == -1) {
                currentAge = 0;
            }

            
            
            let rmcache = new Date();
            if (uploadphoto != "n/a") {
                img_userphoto.src = uploadphoto + "?nc=" + rmcache.getMilliseconds();
            }
            if (uploadvalidid != "n/a") {
                img_uservalidid.src = uploadvalidid + "?nc=" + rmcache.getMilliseconds();
            }


            let verified = "New";
            btn_decline.disabled = false;
            btn_approve.disabled = false;
            if (records.login_verified == 1) {
                verified = "Verified";
                btn_decline.disabled = false;
                btn_approve.disabled = true;
            }
            else if (records.login_verified == -1) {
                verified = "Unapproved";
                btn_decline.disabled = true;
                btn_approve.disabled = false; 
            }
            let role = records.role_name;
            let usertype = role.charAt(0).toUpperCase() + role.slice(1);

            console.log(bday, usertype);

            inp_fullname.value = fullname;
            inp_address.value = address;
            inp_phone.value = contact;
            inp_email.value = email;
            inp_birthdate.value = bday;
            inp_usertype.value = usertype;


            lbl_age.innerHTML = currentAge + " year(s) old";

        }
    };
}

function delUserInfo(userid) {
    let route = "services/back/php/dashboard/del_user.php?uid=" + userid + "&id=" + huid.value;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "DASHBOARD: DeleteUserInfo - ";
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

            getUsersCtr();
            getUsers();
            closeModal();

        }
    };

}

btn_approve.onclick = () => {
    let userid = window.sessionStorage.getItem("userid");
    let usertyp = window.sessionStorage.getItem("usertyp");
    usertyp = usertyp.toLowerCase();
    if (usertyp == "lawyer") {
        alert("User now is updated as Lawyer, verify this account in the Lawyer's Table.");
        return;
    }

    let route = "services/back/php/dashboard/upd_user_verify.php?uid=" + userid + "&vfy=1&id=" + huid.value + "&role=" + usertyp;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "DASHBOARD: VerifyUsersInfo - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            let d;
            try { 
                d = JSON.parse(respo); 
            } catch (e) {
                console.log(tag, e)
                return; 
            }   console.log(tag, d.success);
            
            alert(d.message);
            if (d.success == false) { 
                console.log(tag, d.message);
                return; 
            }

            getUsersCtr();
            getUsers();
            closeModal();

        }
    };
}

btn_decline.onclick = () => {
    let userid = window.sessionStorage.getItem("userid");
    let usertyp = window.sessionStorage.getItem("usertyp");
    usertyp = usertyp.toLowerCase();

    if (usertyp == "lawyer") {
        alert("User now is updated as Lawyer, decline this account in the Lawyer's Table.");
        return;
    }

    let route = "services/back/php/dashboard/upd_user_verify.php?uid=" + userid + "&vfy=-1&id=" + huid.value + "&role=" + usertyp;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "DASHBOARD: DeclineUsersInfo - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            let d;
            try { 
                d = JSON.parse(respo); 
            } catch (e) {
                console.log(tag, e)
                return; 
            }   console.log(tag, d.success);

            alert(d.message);
            if (d.success == false) { 
                console.log(tag, d.message);
                return; 
            }

            getUsersCtr();
            getUsers();
            closeModal();
        }
    };
}


link_lawyers.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "lawyers.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "lawyers.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}
link_audit.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "auditlogs.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "auditlogs.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}
link_lawcategory.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "lawcategory.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "lawcategory.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}
link_lawfield.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "lawfield.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "lawfield.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}
link_lawcontent.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "lawcontent.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "lawcontent.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}
link_appoint.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "admappoint.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "admappoint.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}