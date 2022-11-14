function closeModal() {
    document.getElementById("htmBtnBackDropModal").click();
    window.sessionStorage.setItem("userid", 0);    
}

function getUserInfo(userid) {
    document.getElementById("htmAncBackDropModal").click();

    window.sessionStorage.setItem("userid", userid);

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
    alert("world " + userid);
    return;

}

btn_approve.onclick = () => {
    let userid = window.sessionStorage.getItem("uid");

    let route = "services/back/php/dashboard/upd_user_verify.php?uid=" + userid + "&vfy=1";
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

btn_decline.onclick = () => {
    let userid = window.sessionStorage.getItem("uid");

    let route = "services/back/php/dashboard/upd_user_verify.php?uid=" + userid + "&vfy=-1";
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