function getAppointmentsCtr() {
    let route = "services/back/php/admappoint/ctr_appointments.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "APPOINTMENTS: GetAppointmentsCtr - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            ctrlabel.innerHTML = "There are 0 appointment(s).";

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

            ctrlabel.innerHTML = "There are " + d.success + " appointment(s).";

        }
    };
}

function getAppointments() {
    let route = "services/back/php/admappoint/get_appointments.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "APPOINTMENTS: GetAppointments - ";
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
                    //     <td><strong>Client_Photo</strong></td>
                    //     <td><strong>Client_Name</strong></td>
                    //     <td><strong>Lawyer_Photo</strong></td>
                    //     <td><strong>Lawyer_Name</strong></td>
                    //     <td>Date_Time</td>
                    //     <td>Status</td>
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

                    let app_id = records[i].id;
                    let clientphoto = records[i].clientphoto;
                    if (clientphoto == "n/a") {
                        clientphoto = "res/legal/none.png";
                    }
                    let clientname = records[i].clientname;
                    let lawyerphoto = records[i].lawyerphoto;
                    if (lawyerphoto == "n/a") {
                        lawyerphoto = "res/legal/none.png";
                    }
                    let lawyername = records[i].lawyername;
                    let datetime = records[i].datetime;
                    let status = records[i].status;
                    let datesaved = records[i].datesaved;

                    stream += "<tr>" +
                                    "<td><strong>" + 
                                        "<ul class='list-unstyled users-list m-0 avatar-group d-flex align-items-center'>" +
                                            "<li data-bs-toggle='tooltip' data-popup='tooltip-custom' data-bs-placement='top' " +
                                                "class='avatar pull-up' title='Christina Parker'>" +
                                                "<img src='" +clientphoto+ "' alt='Avatar' class='rounded-circle' />" +
                                            "</li>" +
                                        "</ul>" +
                                    "</strong></td>" +
                                    "<td><strong>" + clientname + "</strong></td>" +
                                    "<td><strong>" + 
                                        "<ul class='list-unstyled users-list m-0 avatar-group d-flex align-items-center'>" +
                                            "<li data-bs-toggle='tooltip' data-popup='tooltip-custom' data-bs-placement='top' " +
                                                "class='avatar pull-up' title='Christina Parker'>" +
                                                "<img src='" +lawyerphoto+ "' alt='Avatar' class='rounded-circle' />" +
                                            "</li>" +
                                        "</ul>" +
                                    "</strong></td>" +
                                    "<td><strong>" + lawyername + "</strong></td>" +
                                    "<td>" + datetime +"</td>" +
                                    "<td>" + status + "</span></td>" +
                                    "<td>" + datesaved + "</td>" +
                                    "<td>" +
                                        "<div class='dropdown'>" +
                                            "<button type='button' class='btn p-0 dropdown-toggle hide-arrow' data-bs-toggle='dropdown'>" +
                                                "<i class='bx bx-dots-vertical-rounded'></i>" +
                                            "</button>" +
                                            "<div class='dropdown-menu'>" +
                                                "<a class='dropdown-item' href='javascript:delLogInfo("+ app_id +");'>" +
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

