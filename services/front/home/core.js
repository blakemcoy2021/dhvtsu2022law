function getUserInfo(userid) {
    let route = "services/back/php/dashboard/get_user_info.php?uid=" + userid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "HOME: GetUsersInfo - ";
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
            
            uname.innerHTML = records.login_username;
            lbl_username.innerHTML = records.login_username; 
            
            let verify = records.login_verified;
            let uploadphoto = records.user_photo;
            let firstname = records.user_firstname;
            let lastname = records.user_lastname;
            let midname = records.user_midname;
            let email = records.contact_email;
            let contact = records.contact_phone;
            let address = records.contact_address;
            let bday = records.user_birthdate;

            let uploadvalidid = records.user_validid;
            let uploadprcid = records.lawyer_prcid;

            var formattedDate = bday.split("-")
            var birthdateTimeStamp = new Date(formattedDate[0], formattedDate[1], formattedDate[2])
            var currentDate = new Date().getTime();
            var difference = currentDate - birthdateTimeStamp;
            var currentAge = Math.floor(difference / 31557600000);
            if (currentAge == -1) {
                currentAge = 0;
            }

            let islawyer = records.login_roleid;
            let uploadvalidId = records.user_validid;



            let verified = "<span style='color: green'>New</span>";
            if (verify == 1) {
                verified = "<span style='color: blue'>Verified</span>";
            }
            else if (records.login_verified == -1) {
                verified = "<span style='color: red'>Unapproved</span>"
            }
            lbl_verified.innerHTML = verified;

            let rmcache = new Date();
            if (uploadphoto != "n/a") {
                photo_upload.src = uploadphoto + "?nc=" + rmcache.getMilliseconds();
                photo_usersm.src = photo_upload.src;
            }
            if (uploadvalidid != "n/a") {
                photo_validId.src = uploadvalidid + "?nc=" + rmcache.getMilliseconds();
            }
            // if (uploadprcid != "n/a") {
            //     photo_upload.src = uploadprcid + "?nc=" + rmcache.getMilliseconds();
            // }

            inp_firstname.value = firstname;
            inp_lastname.value = lastname;
            inp_midname.value = midname;
            inp_email.value = email;
            inp_phone.value = contact;
            inp_address.value = address;
            inp_bday.value = bday;

            lbl_age.innerHTML = currentAge + " year(s) old";

            chk_lawyer.checked = false;
            if (islawyer == 3) {
                chk_lawyer.checked = true;
            }

        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };
}