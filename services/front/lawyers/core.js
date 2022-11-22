function getLawyersCtr() {
    let route = "services/back/php/dashboard/ctr_users.php?role=3";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LAWYER: GetLawyersCtr - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            ctrlabel.innerHTML = "There are 0 registered lawyer(s).";

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

            ctrlabel.innerHTML = "There are " + d.success + " registered lawyer(s).";

        }
    };
}

function getLawyers() {
    let route = "services/back/php/dashboard/get_users.php?role=3";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LAWYERS: GetLawyers - ";
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
                    //     <td><strong>Full_Name_Here</strong></td>
                    //     <td>Contact_Here</td>
                    //     <td>Email_Here</td>
                    //     <td><span class="badge bg-label-primary me-1">Status_Here</span></td>
                    //     <td>Date_Saved_Here</span></td>
                    //     <td>
                    //         <div class="dropdown">
                    //             <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                    //                 data-bs-toggle="dropdown">
                    //                 <i class="bx bx-dots-vertical-rounded"></i>
                    //             </button>
                    //             <div class="dropdown-menu">
                    //                 <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#backDropModal">
                    //                     <i class="bx bx-edit-alt me-1"></i> Edit</a>
                    //                 <a class="dropdown-item" href="javascript:void(0);">
                    //                     <i class="bx bx-trash me-1"></i> Delete</a>
                    //             </div>
                    //         </div>
                    //     </td>

                    // </tr>

                    let fullname = records[i].user_lastname + ", " + records[i].user_firstname;
                    if (fullname.length > 18) {
                        fullname = fullname.substring(0, 18) + "...";
                    }
                    let contact = records[i].contact_phone;
                    let contactemail = records[i].contact_email;

                    if (contact.length > 18) {
                        contact = contact.substring(0, 18) + "...";
                    }
                    if (contactemail.length > 18) {
                        contactemail = contactemail.substring(0, 18) + "...";
                    }

                    let verified = "<span class='badge bg-label-success me-1'>New";
                    if (records[i].login_verified == 1) {
                        verified = "<span class='badge bg-label-primary me-1'>Verified";
                    }
                    else if (records[i].login_verified == -1) {
                        verified = "<span class='badge bg-label-danger me-1'>Unapproved";
                    }
                    else if (records[i].login_verified == 2) {
                        verified = "<span class='badge bg-label-warning me-1'>Reverify";
                    }
                    let role = records[i].role_name;
                    let usertype = role.charAt(0).toUpperCase() + role.slice(1);

                    stream += "<tr>" +
                                    "<td><strong>" + fullname + "</strong></td>" +
                                    "<td>" + contact +"</td>" +
                                    "<td>" + contactemail + "</span></td>" +
                                    "<td>" + verified + "</span></td>" +
                                    "<td>" + records[i].user_datesaved + "</td>" +
                                    "<td>" +
                                        "<div class='dropdown'>" +
                                            "<button type='button' class='btn p-0 dropdown-toggle hide-arrow' data-bs-toggle='dropdown'>" +
                                                "<i class='bx bx-dots-vertical-rounded'></i>" +
                                            "</button>" +
                                            "<div class='dropdown-menu'>" +
                                                "<a class='dropdown-item' href='javascript:getLawyerInfo(" + records[i].user_id+ ",\"" +usertype+ "\");'>" +
                                                    "<i class='bx bx-edit-alt me-1'></i> Edit</a>" +
                                                "<a class='dropdown-item' href='javascript:delUserInfo("+ records[i].user_id +");'>" +
                                                    "<i class='bx bx-trash me-1'></i> Delete</a>" +
                                                "<a class='dropdown-item' style='display: none' id='htmAncBackDropModal' data-bs-toggle='modal' data-bs-target='#backDropModal'>hidden_trigger</a>" +
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

