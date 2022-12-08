function getAppointments(userid, islawyer = false) {
    
    let route = "services/back/php/appoint/get_user_appoints.php?uid=" + userid;
    if (islawyer) {
        route = "services/back/php/appoint/get_lawyer_appoints.php?uid=" + userid;
    }
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "APPOINTMENT: GetUserLawyerAppointment - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            // list_appoints.innerHTML = "<div class='card mb-3'><div class='card-body'>" +
            //                                 "<h5 class='card-title'>You have no Appointment(s) Yet.</h5>" +
            //                             "</div></div>";

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

            if (records.length > 0) {
                let stream = "";
                
                for (let i = 0; i < records.length; i++) {

                    // <div class="card mb-3">
                    //     <div class="card-body">
                    //         <div class="d-flex row">
                    //             <div class="col-sm-3">
                    //                 <img src="res/legal/none.png" style="width: 100%">
                    //             </div>
                    //             <div class="col-sm-9">
                    //                 <h5 class="card-title">Lawyer Name - Lawyer Category</h5>
                    //                 <p class="card-text m-0">Contact Number Here</p>
                    //                 <p class="card-text m-0">Schedule Here</p>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>

                    let userphoto = records[i].user_photo;
                    let rmcache = new Date();
                    if (userphoto != "n/a") {
                        userphoto = userphoto + "?nc=" + rmcache.getMilliseconds();
                    }
                    else {
                        userphoto = "res/legal/none.png";
                    }

                    let fullname = records[i].user_lastname + ", " + records[i].user_firstname;
                    if (!islawyer) {
                        fullname += " - " + records[i].lawcategory_name;
                    }
                    if (fullname.length > 40) {
                        fullname = fullname.substring(0,40) + "...";
                    }

                    let contactnum = records[i].contact_phone;

                    let monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    let dtstamp = records[i].app_datesched;
                    let dt = new Date(dtstamp);
                    let tmstamp = records[i].app_timesched;
                    let app_dt = monthsArr[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + tmstamp;

                    let clickable = "style='cursor: pointer' onclick='seeAppOpts("+records[i].app_id+")'";
                    let sign = "";
                    if (records[i].app_status == "done") {
                        sign = "<h5 class='card-text m-0' style='color: green'>DONE<h5>";
                        clickable = "";
                    }
                    else if (records[i].app_status == "decline") {
                        sign = "<h5 class='card-text m-0' style='color: red'>DECLINED<h5>";
                        clickable = "";
                    }
                    else if (records[i].app_status == "cancel") {
                        sign = "<h5 class='card-text m-0' style='color: orange'>CANCELLED<h5>";
                        clickable = "";
                    }

                    stream += "<div class='card mb-3' "+clickable+">" +
                                    "<div class='card-body'>" +
                                        "<div class='d-flex row'>" +
                                            "<div class='col-sm-3'>" +
                                                "<img src='"+userphoto+"' class='rounded-circle' style='width: 100%'>" +
                                            "</div>" +
                                            "<div class='col-sm-9'>" +
                                                "<h5 class='card-title m-1'>"+fullname+"</h5>" +
                                                "<p class='card-text m-0'>"+app_dt+"</p>" +
                                                "<p class='card-text m-0'>+63 "+contactnum+"</p>" +
                                                "<p class='card-text m-0'>Reason: "+records[i].app_remarks+"</p>" +
                                                sign +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>";

                    list_appoints.innerHTML = stream;
                }
            }

        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };
}