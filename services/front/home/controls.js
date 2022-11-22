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

    let lawyerCheck = chk_lawyer.checked;
    let opentime = inp_lawyeropent.value;
    let closetime = inp_lawyercloset.value;
    if (lawyerCheck) {
        if (slct_lawyercat.value == "0") { 
            alert('Lawyer\'s Field of Expertise is required!');
            return;
        }
        if (inp_lawyeraddr.value == "") { 
            alert('Lawyer\'s office address required!');
            return;
        }
        let opentimeVal = parseInt(opentime.split(":")[0]);
        let closetimeVal = parseInt(closetime.split(":")[0]);
        if (closetimeVal < opentimeVal) {
            alert('Lawyer\'s operation time invalid! closing time cannot be earlier than opening time. No time hitting graveyard hour shifts.');
            return;
        }
    }

    let data = new FormData();
    data.append("fname", inp_firstname.value);
    data.append("mname", inp_midname.value);
    data.append("lname", inp_lastname.value);
    data.append("email", inp_email.value);
    data.append("phone", inp_phone.value);
    data.append("addr", inp_address.value);
    data.append("bday", inp_bday.value);

    data.append("islaw", lawyerCheck);
    if (lawyerCheck) {
        data.append("lawcatg", slct_lawyercat.value);
        data.append("lawaddr", inp_lawyeraddr.value); // make it object {addr, lat, long}
        data.append("lawopen", opentime);
        data.append("lawclos", closetime);

        let stream_days = "";
        let loopval = 7;
        for (let i = 0; i < loopval; i++) {
            let id_str = "inlineCheckbox" + (i+1).toString();
            let chkval = document.getElementById(id_str);
            if (chkval.checked) {
                stream_days += "1";
            }
            else {
                stream_days += "0";
            }
            if (i != (loopval-1)) {
                stream_days += ",";
            }
        }
        data.append("lawdays", stream_days);
    }

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

            // chk_lawyer reset here???
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

inp_prcId.onchange = () => {
    uploadPhoto(2);
}

function uploadPhoto(idtype) {
    let userid = window.localStorage.getItem("uid");

    let photo = inp_photo;
    if (idtype == 1) {
        photo = inp_validId;
    }
    else if (idtype == 2) {
        photo = inp_prcId;
    }

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

            // chk_lawyer reset here???
            getUserInfo(userid);
        }
    };
}


function toggleLawyerFields(mode) {
    Array.prototype.forEach.call(document.getElementsByClassName("lawyer-fields"), function(element) {
        // Use `element` here
        if (mode == 1) {
            element.classList.remove("lawyer-hide");
        }
        else {
            element.classList.add("lawyer-hide");
        }
    });    
}

function slctPopulateLawyerCat(lawcatid = 0) {
    let route = "services/back/php/home/get_lawyer_cat.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "HOME: GetLawyerCategory - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            slct_lawyercat.innerHTML = "<option selected value='0'>No Lawyer Categories Yet</option>";

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

            let stream_opts = "<option selected value='0'>-- Select Lawyer Expertise --</option>";
            if (records.length > 0) {
                for (let i = 0; i < records.length; i++) {
                    let lc = records[i].lawcategory_name;
                    let lcId = records[i].lawcategory_id;
                    stream_opts += "<option selected value='"+lcId+"'>"+lc+"</option>";
                }

                slct_lawyercat.innerHTML = stream_opts;
                slct_lawyercat.value = lawcatid; // default 0

            }

        }
    };
}

chk_lawyer.onchange = () => {
    if (chk_lawyer.checked) {
        toggleLawyerFields(1);
        slctPopulateLawyerCat();
    }
    else {
        toggleLawyerFields(0);
    }
}
inp_lawyeraddr.onclick = () => {
    btn_googlemap.click();
}
btn_savegmap.onclick = () => {
    alert("feature on-hold due to google map account!");
    btn_closegmap.click();
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
        if (lawyer == "1") {
            lbl_userverify.innerHTML = "Lawyer Status Not Yet Verified";
        }
        else {
            lbl_userverify.innerHTML = "Not Yet Verified";
        }
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