btn_add.onclick = () => {
    document.getElementById("htmAncBackDropModal").click();

    lbl_modaltitle.innerHTML = "Add Law Field";

    inp_lawfldname.value = "";
    inp_lawflddesc.value = "";
    slctPopulateLawCat(0);
    txta_lawfldtags.value = "";
    fldtagsArr = [];

    btn_update.innerHTML = "Add";
}
btn_reload.onclick = () => {
    getLawFieldCtr();
    getLawField();
}

btn_update.onclick = () => {
    let fldid = window.sessionStorage.getItem("fldid");

    let failfieldctr = 0;
    if (inp_lawfldname.value == "") { failfieldctr++; }
    if (inp_lawflddesc.value == "") { failfieldctr++; }
    if (slct_lawcat.value == "0") { 
        alert('Law Category is required!');
        return;
    }
    if (txta_lawfldtags.value == "") { failfieldctr++; }
    if (failfieldctr > 0) {
        alert('all field(s) required.');
        return;
    }

    let data = new FormData();
    data.append("fldname", inp_lawfldname.value);
    data.append("flddesc", inp_lawflddesc.value);
    data.append("fldcatid", slct_lawcat.value);
    data.append("fldtags", txta_lawfldtags.value);
    data.append("uid", huid.value);

    let route = "services/back/php/lawfield/add_lawfield.php";
    let tag = "LAW FIELD: AddLawField - ";
    if (fldid != 0) {
        data.append("fldid", fldid);
        route = "services/back/php/lawfield/upd_lawfield_info.php";
        tag = "LAW FIELD: UpdateLawFieldInfo - ";
    }

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", route, true);
    xhttp.send(data);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respo = xhttp.responseText; console.log(tag, respo);

            let d;
            try {
                d = JSON.parse(respo);
            } catch (e) {
                console.log(tag, e)
                return;
            } console.log(tag, d.success);

            alert(d.message);            
            if (d.success == false) {
                console.log(tag, d.message);
                return;
            }

            getLawFieldCtr();
            getLawField();
            closeModal();
        }
    };
}

function closeModal() {
    document.getElementById("htmBtnBackDropModal").click();
    window.sessionStorage.setItem("catid", 0);
}

function slctPopulateLawCat(catId = 0) {
    let route = "services/back/php/lawcategory/get_lawcategory.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAW FIELD: GetLawCategories - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            slct_lawcat.innerHTML = "<option selected value='0'>No Law Categories Yet</option>";

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
                stream_opts = "<option selected value='0'>-- Select Lawyer Expertise --</option>";
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

function getLawFldInfo(fldid) {
    document.getElementById("htmAncBackDropModal").click();


    lbl_modaltitle.innerHTML = "Update Law Field";
    btn_update.innerHTML = "Update";

    window.sessionStorage.setItem("fldid", fldid);

    let route = "services/back/php/lawfield/get_lawfield_info.php?fid=" + fldid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LAW FIELD: GetLawFldInfo - ";
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

            inp_lawfldname.value = records.lawfield_name;
            inp_lawflddesc.value = records.lawfield_details;
            slctPopulateLawCat(records.lawfield_categoryid);

            /* blue, gray, green, red, orange, blue, dark */
            let badges = [
                "badge bg-primary",
                "badge bg-secondary",
                "badge bg-success",
                "badge bg-danger",
                "badge bg-warning",
                "badge bg-info",
                "badge bg-dark"
            ]
            let fldtags = records.lawfield_tags;
            if (fldtags.indexOf(",") != -1) {
                fldtagsArr = fldtags.split(",");
            }
            else if (fldtags != "n/a") {
                fldtagsArr = [fldtags]
            }
            let htmTagStream = "";
            let randomAlreadyTags = [];
            if (fldtagsArr.length > 0) {
                for (let j = 0; j < fldtagsArr.length; j++) {
                    fldtagsArr[j] = fldtagsArr[j].trim();

                    let val = 0;
                    val = Math.floor(Math.random() * badges.length);
                    let b = badges[val];

                    val = 0;
                    while (true) {
                        val = Math.floor(Math.random() * fldtagsArr.length);
                        if (!randomAlreadyTags.includes(val)) {
                            randomAlreadyTags.push(val);
                            break;
                        }
                    }
                    let t = fldtagsArr[val].trim();

                    htmTagStream += "<span style='cursor: pointer;' class='" + b + " m-1' onclick='removeTag(\"" + t + "\", this);'>" + t + "</span>";
                }
                htmTagStream += "...";
            }
            else {
                htmTagStream += fldtags;
            }

            div_lawfldtagscollect.innerHTML = htmTagStream;

            txta_lawfldtags.value = "";
            for (let k = 0; k < fldtagsArr.length; k++) {
                txta_lawfldtags.value += fldtagsArr[k];
                if (k != (fldtagsArr.length - 1)) {
                    txta_lawfldtags.value += ", ";
                }
            }
        }
    };
}
function removeTag(tag, el) {
    el.remove();

    //let idx = fldtagsArr.indexOf(tag);
    for (var i = 0; i < fldtagsArr.length; i++) {
        if (fldtagsArr[i] === tag) {
            fldtagsArr.splice(i, 1);
        }
    }
    txta_lawfldtags.value = "";
    for (let k = 0; k < fldtagsArr.length; k++) {
        txta_lawfldtags.value += fldtagsArr[k];
        if (k != (fldtagsArr.length - 1)) {
            txta_lawfldtags.value += ", ";
        }
    }

}
btn_lawfldtagadd.onclick = () => {
    if (inp_lawfldtagadd.value == "") {
        alert("Input Tag to Add.");
        return;
    }
    let tag = inp_lawfldtagadd.value;

    let badges = [
        "badge bg-primary",
        "badge bg-secondary",
        "badge bg-success",
        "badge bg-danger",
        "badge bg-warning",
        "badge bg-info",
        "badge bg-dark"
    ]
    let randomAlreadyBadge = [];
    let val = 0;
    while (true) {
        val = Math.floor(Math.random() * badges.length);
        if (!randomAlreadyBadge.includes(val)) {
            randomAlreadyBadge.push(val);
            break;
        }
    }
    let b = badges[val];

    let htmTag = "<span style='cursor: pointer;' class='" + b + " m-1' onclick='removeTag(\"" + tag + "\", this);'>" + tag + "</span>";
    div_lawfldtagscollect.innerHTML += htmTag;

    fldtagsArr.push(tag);

    txta_lawfldtags.value = "";
    for (let k = 0; k < fldtagsArr.length; k++) {
        txta_lawfldtags.value += fldtagsArr[k];
        if (k != (fldtagsArr.length - 1)) {
            txta_lawfldtags.value += ", ";
        }
    }

    inp_lawfldtagadd.value = "";
}


function delLawFldInfo(id) {
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