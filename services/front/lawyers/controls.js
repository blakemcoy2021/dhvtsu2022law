function closeModal() {
    document.getElementById("htmBtnBackDropModal").click();
    window.sessionStorage.setItem("userid", 0);
    window.sessionStorage.setItem("usertyp", "");
}

function slctPopulateLawyerField(fieldId = 0) {
    let route = "services/back/php/lawyers/get_lawyer_fields.php?id=" + fieldId;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAWYER: GetLawyerField - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            slct_lawyerfield.innerHTML = "<option selected value='0'>No Lawyer Fields Yet</option>";

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

            let stream_opts = "";
            if (records.length > 0) {
                for (let i = 0; i < records.length; i++) {
                    let lf = records[i].lawfield_name;
                    let lfId = records[i].lawfield_id;
                    stream_opts += "<option value='"+lfId+"'>"+lf+"</option>";
                }

                slct_lawyerfield.innerHTML = stream_opts;

            }

        }
    };
}

function getLawyerInfo(userid, usertype) {
    document.getElementById("htmAncBackDropModal").click();

    window.sessionStorage.setItem("userid", userid);
    window.sessionStorage.setItem("usertyp", usertype);

    let route = "services/back/php/dashboard/get_user_info.php?uid=" + userid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAWYER: GetLawyerInfo - ";
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
            let uploadprcid = records.lawyer_prcid;
            
            let fullname = records.user_lastname + ", " + records.user_firstname + " " + records.user_midname;
            let address = records.contact_address;
            let contact = records.contact_phone;
            let email = records.contact_email;
            let lawcat = records.lawcategory_name;
            let lawcatId = records.lawcategory_id;
            
            
            let rmcache = new Date();
            if (uploadphoto != "n/a") {
                img_userphoto.src = uploadphoto + "?nc=" + rmcache.getMilliseconds();
            }
            if (uploadprcid != "n/a") {
                img_prcid.src = uploadprcid + "?nc=" + rmcache.getMilliseconds();
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

            inp_fullname.value = fullname;
            inp_address.value = address;
            inp_phone.value = contact;
            inp_email.value = email;
            inp_lawcategory.value = lawcat;
            slctPopulateLawyerField(lawcatId);
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
    };
}

function delUserInfo(userid) {
    let route = "services/back/php/dashboard/del_user.php?uid=" + userid + "&id=" + huid.value;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAWYER: DeleteLawyersInfo - ";
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

            getLawyersCtr();
            getLawyers();
            closeModal();

        }
    };

}

inp_address.onclick = () => {
    btn_googlemap.click();
}

btn_approve.onclick = () => {
    let userid = window.sessionStorage.getItem("userid");
    let usertyp = window.sessionStorage.getItem("usertyp");
    usertyp = usertyp.toLowerCase();

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
            
            if (d.success == false) { 
                console.log(tag, d.message);
                return; 
            }
            alert(d.message);

            getLawyersCtr();
            getLawyers();
            closeModal();

        }
    };
}

btn_decline.onclick = () => {
    let userid = window.sessionStorage.getItem("userid");
    let usertyp = window.sessionStorage.getItem("usertyp");
    usertyp = usertyp.toLowerCase();

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
            
            if (d.success == false) { 
                console.log(tag, d.message);
                return; 
            }
            alert(d.message);

            getLawyersCtr();
            getLawyers();
            closeModal();


        }
    };
}

link_clients.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "dashboard.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "dashboard.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
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