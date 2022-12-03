function getLawContentCtr() {
    let route = "services/back/php/lawcontent/ctr_lawcontent.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LAW CONTENT: GetLawContentCtr - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            ctrlabel.innerHTML = "There are 0 law contents.";

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

            ctrlabel.innerHTML = "There are " + d.success + " law contents.";

        }
    };
}

function getLawCategoryCover() {
    let route = "services/back/php/legal-lawyer/get_lawfieldcat.php?lfid=" + lfid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LEGAL LAWYER: GetLegalLawyer - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            lbl_lawtitle.innerHTML = "Failed to Retrieve Law Title";
            lbl_lawdetails.innerHTML = "Failed to Retrieve Law Description";

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
                console.log(tag, e);
                return;
            }   console.log(tag, records);

            cover_lawphoto.style.backgroundImage = "url('"+records.lawcategory_cover+"')";
            lbl_lawtitle.innerHTML = records.lawfield_name + " - " + records.lawcategory_name;
            let details = "<span>"+records.lawfield_details+"</span><br><br>";
            let lawdesc = "<span>" + records.lawcategory_name + " is a " + records.lawcategory_details1 + "</span>";
            lbl_lawdetails.innerHTML = details + lawdesc;

        }
    };
}
function getLawyers() {
    let route = "services/back/php/legal-lawyer/get_lawyers_all.php?lfid=" + lfid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LEGAL LAWYERS: GetLegalLawyers - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            div_listlawyers.innerHTML = "<a href='#' class='list-group-item list-group-item-action' aria-current='true'>" +
                                            "<div class='d-flex w-100 justify-content-between'>" +
                                                "<h5 class='mb-1'>There are Lawyers found for this Type of Law...</h5>" +
                                            "</div>" +
                                        "</a>";

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
                console.log(tag, e);
                return;
            }   console.log(tag, records);

            if (records.length > 0) {
                let stream = "";
                for (let i = 0; i < records.length; i++) {
                    
                    // <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    //     <div class="d-flex">
                    //         <div style="margin-right: 20px">
                    //             <img src="res/legal/none.png" class="rounded-circle"  width="90" height="90">
                    //         </div>
                    //         <div>
                    //             <div class="d-flex w-100 justify-content-between">
                    //                 <h5 class="mb-1">List group item heading</h5>
                    //                 <small>3 days ago</small>
                    //             </div>
                    //             <p class="mb-1">Some placeholder content in a paragraph.</p>
                    //             <small>And some small print.</small>
                    //         </div>
                    //     </div>
                    // </a>

                    let lawyername = "Atty. " + records[i].user_lastname + ", " + 
                                                records[i].user_firstname + " " + 
                                                records[i].user_midname.substring(0,1) + ".";
                    if (lawyername.length > 44) {
                        lawyername = lawyername.substring(0,44) + "...";
                    }

                    let lawyer_days = "<b>Business Days:</b> ";
                    let daysArr = [records[i].days_issun, records[i].days_ismon, 
                                    records[i].days_istue, records[i].days_iswed, 
                                    records[i].days_isthu, records[i].days_isfri, records[i].days_issat];
                    let daysLblArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    for (let j = 0; j < daysArr.length; j++) {
                        if (daysArr[j] == "1") {
                            lawyer_days += daysLblArr[j] + ", ";
                        }
                    }

                    let opentimeArr = records[i].lawyer_opentime.split(":");
                    let closetimeArr = records[i].lawyer_closetime.split(":");
                    let opent = opentimeArr[0] + ":" + opentimeArr[1];
                    let closet = closetimeArr[0] + ":" + closetimeArr[1];
                    let lawyer_time = opent + " to " + closet;


                    let badges = [
                        "badge bg-primary",
                        "badge bg-secondary",
                        "badge bg-success",
                        "badge bg-danger",
                        "badge bg-warning text-dark",
                        "badge bg-info text-dark",
                        "badge bg-dark"
                    ]
                    let fldtags = records[i].lawfield_tags;
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
        
                            htmTagStream += "<span style='cursor: pointer;' class='" + b + " m-1'>" + t + "</span>";
                        }
                        htmTagStream += "...";
                    }
                    else {
                        htmTagStream += fldtags;
                    }

                    let lawyerId = records[i].lawyer_id;

                    // let link_str = "legal-lawyers.html?lfid=" + records[i].lawfield_id;
                    stream += "<a onclick='checkLoginRedirect("+lawyerId+", this);' href='#' class='list-group-item list-group-item-action' aria-current='true' id='rowId"+lawyerId+"'>" +
                                    "<div class='d-flex'>" +
                                        "<div style='margin-right: 20px'>" +
                                            "<img src='"+records[i].user_photo+"' class='rounded-circle' width='90' height='90'>" +
                                        "</div>" +
                                        "<div>" +
                                            "<div class='d-flex w-100 justify-content-between'>" +
                                                "<h5 class='mb-1'>"+lawyername+"</h5>" +
                                                // "<small>3 days ago</small>" +
                                            "</div>" +
                                            "<p class='mb-1'>"+lawyer_days+"&nbsp;&nbsp;<b>Open-Close Time: </b>"+lawyer_time+"</p>" +
                                            "<div style='width: 70%'>" +
                                                "<small>"+htmTagStream+"</small>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                "</a>";

                    div_listlawyers.innerHTML = stream;
                }
            }

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
            let tag = "LEGAL LAWYERS: GetLawCategories - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            slct_lawcategory.innerHTML = "<option selected value='0'>No Law Categories Yet</option>";

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

                slct_lawcategory.innerHTML = stream_opts;
                slct_lawcategory.value = catId;
            }

        }
    };
}




