function getUserInfo(userid) {
    let route = "services/back/php/dashboard/get_user_info.php?uid=" + userid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "HOME: GetUsersInfo - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            let d;
            try {
                d = JSON.parse(respo);
            } catch (e) {
                console.log(tag, e)
                return;
            } console.log(tag, d.success);

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
            } console.log(tag, records);

            uname.innerHTML = records.login_username;
            window.localStorage.setItem("uname", uname.innerHTML);


            verified = records.login_verified;
            let uploadphoto = records.user_photo;
            let firstname = records.user_firstname;
            if (firstname == "n/a") {
                firstname = "";
            }
            let lastname = records.user_lastname;
            if (lastname == "n/a") {
                lastname = "";
            }

            let midname = records.user_midname;
            if (midname == "n/a") {
                midname = "";
            }
            let email = records.contact_email;
            let contact = records.contact_phone;
            if (contact == "n/a") {
                contact = "";
            }
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



            let verified_str = "<span style='color: green'>New</span>";
            if (verified == "1") {
                verified_str = "<span style='color: blue'>Verified</span>";
            }
            else if (verified == "-1") {
                verified_str = "<span style='color: red'>Unapproved</span>"
            }
            else if (verified == "2") {
                verified_str = "<span style='color: orange'>Re-verification</span>"
            }
            lbl_verified.innerHTML = verified_str;

            let rmcache = new Date();
            if (uploadphoto != "n/a") {
                photo_upload.src = uploadphoto + "?nc=" + rmcache.getMilliseconds();
                photo_usersm.src = photo_upload.src;

            }
            if (uploadvalidid != "n/a") {
                photo_validId.src = uploadvalidid + "?nc=" + rmcache.getMilliseconds();
            }
            if (uploadprcid != "n/a") {
                photo_prcId.src = uploadprcid + "?nc=" + rmcache.getMilliseconds();
                islawyer = 3;
            }

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
                lawyer = "1";
                chk_lawyer.checked = true;
                toggleLawyerFields(1);
                slctPopulateLawyerCat(records.lawyer_lawcatid);

                let mapObjStr = records.lawyer_mapaddr; // adjust when google map is working
                mapObjStr = mapObjStr.replaceAll("_", "\"");
                let map;
                try {
                    map = JSON.parse(mapObjStr);
                } catch (e) {
                    console.log("map parse! ", e)
                    return;
                } 
                window.sessionStorage.setItem("gmapAddr", JSON.stringify(map));
                inp_lawyeraddr.value = map.place;

                inp_lawyeropent.value = records.lawyer_opentime;
                inp_lawyercloset.value = records.lawyer_closetime;
                
                let daysArr = [records.days_issun, records.days_ismon, 
                                records.days_istue, records.days_iswed, 
                                records.days_isthu, records.days_isfri, records.days_issat];
                for (let j = 0; j < daysArr.length; j++) {
                    let id_str = "inlineCheckbox" + (j+1).toString();
                    let element = document.getElementById(id_str);
                    element.checked = false;
                    if (daysArr[j] == "1") {
                        element.checked = true;
                    }
                }

            }

        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };
}

