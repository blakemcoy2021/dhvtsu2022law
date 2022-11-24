function getLawFieldCtr() {
    let route = "services/back/php/lawfield/ctr_lawfield.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LAW FIELD: GetLawFieldCtr - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            ctrlabel.innerHTML = "There are 0 law field scopes.";

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

            ctrlabel.innerHTML = "There are " + d.success + " law field scopes.";

        }
    };
}

function getLawField() {
    let route = "services/back/php/lawfield/get_lawfield.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LAW FIELD: GetLawField - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            tbl.innerHTML = "";

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
                    
                    // <tr>
                    // <td><strong>Law_Field_Name</strong></td>
                    //     <td>
                    //         <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                    //             <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                    //                 class="avatar avatar-xs pull-up" title="Christina Parker">
                    //                 <img src="../assets/img/avatars/7.png" alt="Avatar" class="rounded-circle" />
                    //             </li>
                    //         </ul>
                    //     </td>
                    // <td>Category_Name</td>
                    // <td>Tags</td>
                    // <td>Date_Saved_Here</span></td>
                    // <td>
                    //     <div class="dropdown">
                    //         <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                    //             data-bs-toggle="dropdown">
                    //             <i class="bx bx-dots-vertical-rounded"></i>
                    //         </button>
                    //         <div class="dropdown-menu">
                    //             <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#backDropModal">
                    //                 <i class="bx bx-edit-alt me-1"></i> Edit</a>
                    //             <a class="dropdown-item" href="javascript:void(0);">
                    //                 <i class="bx bx-trash me-1"></i> Delete</a>
                    //         </div>
                    //     </div>
                    // </td>


                    let fldid = records[i].lawfield_id;
                    let catname = records[i].lawcategory_name;
                    let catphoto = records[i].lawcategory_photo;
                    if (catphoto == "n/a") {
                        catphoto = "res/legal/none.png";
                    }
                    let fldname = records[i].lawfield_name;
                    if (fldname.length > 18) {
                        fldname = fldname.substring(0,18) + "...";
                    }
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
                    let fldtags = records[i].lawfield_tags;
                    if (fldtags.indexOf(",") != -1) {
                        fldtagsArr = fldtags.split(",");
                    }
                    else if (fldtags != "n/a") {
                        fldtagsArr = [fldtags];
                    }
                    let htmTagStream = "";
                    let randomAlreadyBadge = [];
                    let randomAlreadyTags = [];

                    console.log(fldtagsArr.length, fldtagsArr);
                    if (fldtagsArr.length > 0) {
                        let maxout = fldtagsArr.length;
                        if (maxout > 3) {
                            maxout = 3;
                        }
                        for (let j = 0; j < maxout; j++) {
                            let val = 0;
                            while (true) {
                                val = Math.floor(Math.random() * badges.length); console.log(j +" @#@#@# 1 " + maxout, val);
                                if(val == badges.length){ val -= 1; } // important to remove hang up
                                if (!randomAlreadyBadge.includes(val)) {
                                    randomAlreadyBadge.push(val);
                                    break;
                                }
                            }
                            let b = badges[val];
    
                            val = 0;
                            while (true) {
                                val = Math.floor(Math.random() * fldtagsArr.length); console.log(j + " @#@#@# 2 " + maxout, val);
                                if(val == fldtagsArr.length){ val -= 1; } // important to remove hang up
                                if (!randomAlreadyTags.includes(val)) {
                                    randomAlreadyTags.push(val);
                                    break;
                                }
                            }
                            let t = fldtagsArr[val].trim();
    
                            htmTagStream += "<span class='" + b + " me-1'>" + t + "</span>";
                        }
                        htmTagStream += "...";
                    }
                    else {
                        htmTagStream += fldtags;
                    }


                    let datesaved = records[i].lawfield_datesaved;

                    stream += "<tr>" +
                                    "<td><strong>" + fldname + "</strong></td>" +
                                    "<td>" +
                                        "<ul class='list-unstyled users-list m-0 avatar-group d-flex align-items-center'>" +
                                            "<li data-bs-toggle='tooltip' data-popup='tooltip-custom' data-bs-placement='top' " +
                                                "class='avatar pull-up' title='Christina Parker'>" +
                                                "<img src='" +catphoto+ "' alt='Avatar' class='rounded-circle' />" +
                                            "</li>" +
                                        "</ul>" +
                                    "</td>" +
                                    "<td>" + catname + "</span></td>" +
                                    "<td>" + htmTagStream + "</td>" +
                                    "<td>" + datesaved + "</td>" +
                                    "<td>" +
                                        "<div class='dropdown'>" +
                                            "<button type='button' class='btn p-0 dropdown-toggle hide-arrow' data-bs-toggle='dropdown'>" +
                                                "<i class='bx bx-dots-vertical-rounded'></i>" +
                                            "</button>" +
                                            "<div class='dropdown-menu'>" +
                                                "<a class='dropdown-item' href='javascript:getLawFldInfo(" +fldid+ ");'>" +
                                                    "<i class='bx bx-edit-alt me-1'></i> Edit</a>" +
                                                "<a class='dropdown-item' href='javascript:delLawFldInfo("+ fldid +");'>" +
                                                    "<i class='bx bx-trash me-1'></i> Delete</a>" +
                                            "</div>" +
                                        "</div>" +
                                    "</td>" +
                                "</tr>";

                    tbl.innerHTML = stream;
                }
            }

        }
    };
}

