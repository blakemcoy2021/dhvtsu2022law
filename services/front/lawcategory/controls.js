btn_add.onclick = () => {
    document.getElementById("htmAncBackDropModal").click();

    lbl_modaltitle.innerHTML = "Add Law Category";
    let rmcache = new Date();
    img_lawcat.src = "res/legal/none.png?nc=" + rmcache.getMilliseconds();
    inp_photo.value = "";
    
    inp_lawcatname.value = "";
    inp_lawcatforeword.value = "";
    inp_lawcatdetails.value = "";
    img_lawcover.src = "res/legal/none2.png?nc=" + rmcache.getMilliseconds();
    inp_cover.value = "";
    btn_update.innerHTML = "Add";
}
btn_reload.onclick = () => {
    getLawCategoryCtr();            
    getLawCategory();
}

btn_update.onclick = () => {
    let catid = window.sessionStorage.getItem("catid");

    let failfieldctr = 0;
    if (inp_lawcatname.value == "n/a") { 
        alert('This value cannot be used.');
        return;    
    }
    if (inp_lawcatname.value == "") { failfieldctr++; }
    if (inp_lawcatforeword.value == "") { failfieldctr++; }
    if (inp_lawcatdetails.value == "") { failfieldctr++; }
    if (failfieldctr > 0) {
        alert('all field(s) required.');
        return;
    }

    let data = new FormData();
    data.append("catname", inp_lawcatname.value);
    data.append("catforeword", inp_lawcatforeword.value);
    data.append("catdetails", inp_lawcatdetails.value);
    data.append("uid", huid.value);

    let route = "services/back/php/lawcategory/add_lawcategory.php";
    let tag = "LAWCATEGORY: AddLawCat - ";
    if (catid != 0) {
        data.append("catid", catid);
        route = "services/back/php/lawcategory/upd_lawcategory_info.php";
        tag = "LAWCATEGORY: UpdateLawCatInfo - ";
    }

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", route, true);
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
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

            getLawCategoryCtr();            
            getLawCategory();
            closeModal();
        }
    };
}

function closeModal() {
    document.getElementById("htmBtnBackDropModal").click();
    window.sessionStorage.setItem("catid", 0);
}

inp_photo.onchange = () => {
    uploadPhoto(0);
}
inp_cover.onchange = () => {
    uploadPhoto(1);
}
function uploadPhoto(idtype) {
    let catid = window.sessionStorage.getItem("catid");

    let photo = inp_photo;
    if (idtype == 1) {
        photo = inp_cover;
    }

    let ext = photo.value.split('.').pop();
    if (ext != "jpg" && ext != "png" && ext != "jpeg") {
        alert("The selected file is not a photo! Only accepts .jpg and .png. Convert first your photo, also in less than 20MB.");
        return false;
    }

    let data = new FormData();
    data.append("photo", photo.files[0]);
    data.append("type", idtype);
    data.append("catid", catid);
    data.append("uid", huid.value);

    let route = "services/back/php/lawcategory/upd_lawcategory_photo.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", route, true);
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAWCATEGORY: UpdateLawCatInfo - ";
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

            getLawCategoryCtr();            
            getLawCategory();
            closeModal();
        }
    };
}

function getLawCatInfo(catid) {
    document.getElementById("htmAncBackDropModal").click();


    lbl_modaltitle.innerHTML = "Update Law Category";
    btn_update.innerHTML = "Update";

    window.sessionStorage.setItem("catid", catid);

    let route = "services/back/php/lawcategory/get_lawcategory_info.php?cid=" + catid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAWCATEGORY: GetLawCatInfo - ";
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

            let uploadphoto = records.lawcategory_photo;
            let uploadcover = records.lawcategory_cover;
            
            let lawcatname = records.lawcategory_name;
            let lawcatforeword = records.lawcategory_details1;
            let lawcatdetails = records.lawcategory_details2;

            let rmcache = new Date();
            if (uploadphoto != "n/a") {
                img_lawcat.src = uploadphoto + "?nc=" + rmcache.getMilliseconds();
            }
            if (uploadcover != "n/a") {
                img_lawcover.src = uploadcover + "?nc=" + rmcache.getMilliseconds();
            }

            inp_lawcatname.value = lawcatname;
            inp_lawcatforeword.value = lawcatforeword;
            inp_lawcatdetails.value = lawcatdetails;

        }
    };
}

function delLawCatInfo(id) {
    alert("deletion by log id in process");
    return;
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