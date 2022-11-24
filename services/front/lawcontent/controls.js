btn_add.onclick = () => {
    document.getElementById("htmAncBackDropModal").click();

    lbl_modaltitle.innerHTML = "Add Law Content";
    let rmcache = new Date();
    img_lawphoto.src = "res/legal/none2.png?nc=" + rmcache.getMilliseconds();
    inp_photo.value = "";
    
    inp_lawtitle.value = "";
    inp_lawdetails.value = "";
    slctPopulateLawCat(0);

    lbl_lawpdf.innerHTML = "ATTACH PDF LAW FILE: <u>Upload file on Update only. Add first.</u>";
    formFile.value = "";
    formFile.disabled = true;

    btn_update.innerHTML = "Add";
}
btn_reload.onclick = () => {
    getLawContentCtr();            
    getLawContent();
}

btn_update.onclick = () => {
    let cnid = window.sessionStorage.getItem("contentid");

    let failfieldctr = 0;
    if (inp_lawtitle.value == "") { failfieldctr++; }
    if (inp_lawdetails.value == "") { failfieldctr++; }
    if (slct_lawcat.value == 0) {
        alert('Select Law Category for this content.');
        return;
    }
    if (failfieldctr > 0) {
        alert('all field(s) required.');
        return;
    }

    let data = new FormData();
    data.append("lawtitle", inp_lawtitle.value);
    data.append("lawdetails", inp_lawdetails.value);
    data.append("lawcatid", slct_lawcat.value);
    data.append("uid", huid.value);

    let route = "services/back/php/lawcontent/add_lawcontent.php";
    let tag = "LAW CONTENT: AddLawContent - ";
    if (cnid != 0) {
        data.append("cnid", cnid);
        route = "services/back/php/lawcategory/upd_lawcategory_info.php";
        tag = "LAW CONTENT: UpdateLawContentInfo - ";
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

            getLawContentCtr();            
            getLawContent();
            closeModal();
        }
    };
}

function slctPopulateLawCat(catId = 0) {
    let route = "services/back/php/lawcategory/get_lawcategory.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAW CONTENT: GetLawContents - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            slct_lawcat.innerHTML = "<option selected value='0'>No Law Contents Yet</option>";

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
                let stream_opts = "<option selected value='0'>-- Select Lawyer Expertise --</option>";
                for (let i = 0; i < records.length; i++) {
                    let lc = records[i].lawcategory_name;
                    let lcId = records[i].lawcategory_id;
                    if (lcId != 0) {
                        stream_opts += "<option value='"+lcId+"'>"+lc+"</option>";
                    }
                }

                slct_lawcat.innerHTML = stream_opts;
                slct_lawcat.value = catId;
            }

        }
    };
}


function closeModal() {
    document.getElementById("htmBtnBackDropModal").click();
    window.sessionStorage.setItem("contentid", 0);
}

inp_photo.onchange = () => {
    uploadPhoto();
}
function uploadPhoto() {
    let cnid = window.sessionStorage.getItem("contentid");

    let photo = inp_photo;

    let ext = photo.value.split('.').pop();
    if (ext != "jpg" && ext != "png" && ext != "jpeg") {
        alert("The selected file is not a photo! Only accepts .jpg and .png. Convert first your photo, also in less than 20MB.");
        return false;
    }

    let data = new FormData();
    data.append("photo", photo.files[0]);
    data.append("cnid", cnid);
    data.append("uid", huid.value);

    let route = "services/back/php/lawcontent/upd_lawcontent_photo.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", route, true);
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAW CONTENT: UpdateLawContentInfo - ";
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

            getLawContentCtr();            
            getLawContent();
            closeModal();
        }
    };
}
inp_lawpdf.onchange = () => {
    uploadPDF();
}
function uploadPDF() {
    let cnid = window.sessionStorage.getItem("contentid");

    let pdf = inp_lawpdf;

    let ext = pdf.value.split('.').pop();
    if (ext != "pdf") {
        alert("The selected file is not a pdf! Only accepts .pdf and also in less than 20MB.");
        return false;
    }

    let data = new FormData();
    data.append("pdf", pdf.files[0]);
    data.append("cnid", cnid);
    data.append("uid", huid.value);

    let route = "services/back/php/lawcontent/upd_lawcontent_pdf.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", route, true);
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAW CONTENT: UpdateLawContentInfo - ";
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

            getLawContentCtr();            
            getLawContent();
            closeModal();
        }
    };
}

function getLawContentInfo(cnid) {
    document.getElementById("htmAncBackDropModal").click();


    lbl_modaltitle.innerHTML = "Update Law Content";
    btn_update.innerHTML = "Update";

    window.sessionStorage.setItem("contentid", cnid);

    let route = "services/back/php/lawcontent/get_lawcontent_info.php?cnid=" + cnid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAW CONTENT: GetLawContentInfo - ";
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


            let uploadphoto = records.law_photo;
            let lawtitle = records.law_title;
            let lawdetails = records.law_details;
            let lawcatid = records.law_lawcategoryid;

            let rmcache = new Date();
            if (uploadphoto != "n/a") {
                img_lawphoto.src = uploadphoto + "?nc=" + rmcache.getMilliseconds();
            }
            inp_lawtitle.value = lawtitle;
            inp_lawdetails.value = lawdetails;
            slctPopulateLawCat(lawcatid);

            inp_lawpdf.disabled = false;
            let pdfpath = records.law_attachfile;
            if (pdfpath != "n/a") {
                let lawpdfArr = pdfpath.split("/");
                lbl_lawpdf.innerHTML = "ATTACH PDF LAW FILE: <u>" + lawpdfArr[lawpdfArr.length-1] + "</u>";
            }
            else {
                lbl_lawpdf.innerHTML = "ATTACH PDF LAW FILE: " + pdfpath;
            }
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
link_appoint.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "admappoint.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "admappoint.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}