btn_search.onclick = () => {
    let txtval = inp_searchlawyer.value;
    if (txtval == "") {
        txtval = "n-a";

    }
    if (txtval == "n-a") {
        if (slct_lawcategory.value == "0") {
            getLawCategoryCover();
            getLawyers();
            slctPopulateLawCat();
            return;
        }
    }

    let lawcatid = slct_lawcategory.value;
    let route = "services/back/php/legal-lawyer/get_lawyer_search.php?name=" + txtval + "&catid=" + lawcatid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LEGAL LAWYERS: GetLawyerSearch - ";
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
                        records[i].user_midname.substring(0, 1) + ".";
                    if (lawyername.length > 44) {
                        lawyername = lawyername.substring(0, 44) + "...";
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
                    let lawyerId = records[i].lawyer_id;

                    // let link_str = "legal-lawyers.html?lfid=" + records[i].lawfield_id;
                    stream += "<a onclick='checkLoginRedirect("+lawyerId+", this);' href='#' class='list-group-item list-group-item-action' aria-current='true' id='rowId"+lawyerId+"'>" +
                                    "<div class='d-flex'>" +
                                        "<div style='margin-right: 20px'>" +
                                            "<img src='" + records[i].user_photo + "' class='rounded-circle' width='90' height='90'>" +
                                        "</div>" +
                                        "<div>" +
                                            "<div class='d-flex w-100 justify-content-between'>" +
                                                "<h5 class='mb-1'>" + lawyername + "</h5>" +
                                            "</div>" +
                                            "<p class='mb-1'>" + lawyer_days + "&nbsp;&nbsp;<b>Open-Close Time: </b>" + lawyer_time + "</p>" +
                                            "<div style='width: 70%'>" +
                                                "<h5>Lawyer Expertise: <u>"+records[i].lawcategory_name+"</u></h5>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                "</a>";

                    if (lawcatid != 0) {
                        cover_lawphoto.style.backgroundImage = "url('" + records[0].lawcategory_cover + "')";
                        lbl_lawtitle.innerHTML = records[0].lawcategory_name;
                        lbl_lawdetails.innerHTML = records[0].lawcategory_details1;
                    }

                    div_listlawyers.innerHTML = stream;
                    clearSelection();
                }
            }

        }
    };
}

function clearSelection() {
    window.sessionStorage.setItem("pickId", 0);
    window.sessionStorage.setItem("prevPicked", "");
}

htmBtnMtClose.onclick = () => {
    htmBtnMtCloseHid.click();

}

function checkLoginRedirect(lawyerid, element) {

    let role = window.localStorage.getItem("role"); /* uid, fname*/

    if (role == "2") {  /* appointment modal show */

        element.classList.add("picked");
        let pickId = "rowId" + lawyerid.toString();
        window.sessionStorage.setItem("pickId", lawyerid);
        let prev_pick = window.sessionStorage.getItem("prevPicked");
        if (prev_pick != "") {
            document.getElementById(prev_pick).classList.remove("picked");
        }
        window.sessionStorage.setItem("prevPicked", pickId);

        btn_modalToggle.click();
        let route = "services/back/php/legal-lawyer/get_lawyer_info.php?lawyerid=" + lawyerid;
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", route, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let tag = "LEGAL LAWYERS: GetLawyerInfo - ";
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

                let uploadphoto = records.user_photo;
                let rmcache = new Date();
                if (uploadphoto != "n/a") {
                    img_infoLawyer.src = uploadphoto + "?nc=" + rmcache.getMilliseconds();
    
                }

                let fullname = records.user_lastname + ", " + records.user_firstname;
                let expertise = records.lawcategory_name;
                let lbl_lawyer = fullname + " - " + expertise;
                if (lbl_lawyer.length > 33) {
                    lbl_lawyer = lbl_lawyer.substring(0, 33) + "...";
                }
                lbl_infoLawyerName.innerHTML = lbl_lawyer;

                let address = records.lawyer_mapaddr;
                address = address.replaceAll("_", "\"", address);
                let jsonmap;
                try {
                    jsonmap = JSON.parse(address);
                } catch (e) {
                    console.log("gmap parse error", e);
                    return;
                }
                lbl_infoLawyerAddr.innerHTML = jsonmap.place;

                let coordinates = {
                    lat: jsonmap.lat, lng: jsonmap.lng
                }
                gmap = new google.maps.Map(document.getElementById("htmGoogleMap"), {
                    zoom: 18,
                    center: coordinates,
                });
                let opts = {
                    position: coordinates,
                    map: gmap
                }
                let htm = "<h6 style='cursor: pointer;'>Lawyer's Office: " + jsonmap.place + "</h6>"; 
                marker = new google.maps.Marker(opts);
                info = new google.maps.InfoWindow({content: htm});
                info.open(gmap, marker);


                let daysArr = [records.days_issun, records.days_ismon,
                                records.days_istue, records.days_iswed,
                                records.days_isthu, records.days_isfri, records.days_issat];
                for (let j = 0; j < daysArr.length; j++) {
                    let id_str = "inlineCheckbox" + (j + 1).toString();2320
                    let element = document.getElementById(id_str);
                    element.checked = false;
                    if (daysArr[j] == "1") {
                        element.checked = true;
                    }
                }

                let operationsTime = "<b>Open Time:</b> [" + records.lawyer_opentime + "] <b>Close Time:</b> [" +records.lawyer_closetime+"]";
                lbl_infoLawyerTime.innerHTML = operationsTime;
                let contactinfo = "<b>Phone: </b>[+63 " + records.contact_phone + "] <b>Email: </b>[" + records.contact_email + "]";
                lbl_infoLawyerContact.innerHTML = contactinfo;

                let lawcatid = records.lawcategory_id;
                loadLawPdf(lawcatid);
            }
        };
    }
    else {
        alert('You need to sign in as client.');
        let route = "services/back/php/common/logout.php?page=lawyerslegal";
            route += "&uid=0";
            window.location.href = route;
    }
}

function loadLawPdf(catId) {
    let route = "services/back/php/legal-lawyer/get_lawyer_cat.php?catid=" + catId;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LEGAL LAWYERS: GetLawyerCategory - ";
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

                let css = "style='text-align: center; width: 100%; margin-top: 15%;'";
                let htm = "<h5 "+css+">There is no designated file for this Law</h5>";
                div_pdf.innerHTML = htm;
                tab_photos.click();
                tab_pdf.click();

                return;
            }

            var records;
            try {
                records = JSON.parse(d.success);
            } catch (e) {
                console.log(tag, e)
                return;
            } console.log(tag, records);

            PDFObject.embed(records.law_attachfile, "#pdfviewer_area");
            tab_photos.click();
            tab_pdf.click();
        }
    };
}

btn_modalAppoint.onclick = () => {

    let route = "services/back/php/legal-lawyer/get_user_validate.php?luid=" + window.localStorage.getItem("uid");
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LEGAL LAWYERS: GetUserVerified - ";
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

            if (records.login_verified != 1) {
                alert("You are yet to be verified.");
                return;
            }

            btn_modalToggle2nd.click();
            showCalendar();
        }
    };


}

function showCalendar() {
    var calendarEl = document.getElementById('htmFullCalendar');

    var dtnow = new Date();
    var dtnow_str = dtnow.getFullYear().toString();
    var dtnow_month = dtnow.getMonth() + 1;
    dtnow_str += "-";
    if (dtnow_month < 10) {
        dtnow_str += "0" + dtnow_month.toString();
    }
    else {
        dtnow_str += dtnow_month.toString();
    }
    var dtnow_days = dtnow.getDate();
    dtnow_str += "-";
    if (dtnow_days < 10) {
        dtnow_str += "0" + dtnow_days.toString();
    }
    else {
        dtnow_str += dtnow_days.toString();
    }

    let lawyerId = window.sessionStorage.getItem("pickId"); 
    let route = "services/back/php/legal-lawyer/get_appoint.php?lawyerId=" +lawyerId;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LEGAL LAWYERS: GetAppointments - ";
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

            // {
            //     title: 'Long Event',
            //     start: '2022-11-07',
            //     end: '2022-11-10'
            // }

            let calevents = [];

            if (records.length > 0) {
                for (let i = 0; i < records.length; i++) {
                    let txt = "Reserved Appointment";
                    let u = window.localStorage.getItem("uid");
                    if (u == records[i].app_userid) {
                        txt = "YOUR appointment";
                    }
                    let dt = records[i].app_datesched;
                    let tm = records[i].app_timesched;
                    let startTime = dt + "T" + tm;
                    let startTimeArr = tm.split(":");
                    let endHour = (parseInt(startTimeArr[0])+1);
                    if (endHour < 10) {
                        endHour = "0" + endHour.toString();
                    }
                    let endTime = dt + "T" + endHour + ":" + startTimeArr[1] + ":00";

                    let appointment = {
                        title : txt,
                        start : startTime,
                        end : endTime
                    };

                    calevents.push(appointment);
                    existSched.push(startTime);
                }
            }

            xcalendar = new FullCalendar.Calendar(
                calendarEl, {
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },
                    initialDate: dtnow_str,
                    navLinks: true, // can click day/week names to navigate views
                    selectable: true,
                    selectMirror: true,
                    select: function (arg) {

                        let month = arg.start.getMonth() + 1;
                        let day = arg.start.getDate();
                        let year = arg.start.getFullYear();
                        let daystr = day.toString();
                        if (day < 10) {
                            daystr = "0" + daystr;
                        }
                        let monthstr = month.toString();
                        if (month < 10) {
                            monthstr = "0" + monthstr;
                        }
                        dtstr = year.toString() + "-" + monthstr + "-" + daystr;
                        if (dtnow_str == dtstr) {
                            alert(dtnow_str + " is equal to " + dtstr +". Cannot appoint on same day!");
                            dtstr = "";
                            return;
                        }
                        let datediff = dateDiffInDays(new Date(dtstr), new Date(dtnow_str));
                        if (datediff >= 0) {
                            alert("Appointment date must be ahead from today and past date is not applicable!");
                            dtstr = "";
                            return;
                        }
                        btn_modalTimeAppoint.click();
        
                        // alert(arg.start.getMonth()); // 2022-11-11T16:00:00
                    
                        // var title = prompt('Set Appointed Time:');
                        // if (title) {
                        //     calendar.addEvent({
                        //         title: title,
                        //         start: arg.start,
                        //         end: arg.end,
                        //         allDay: arg.allDay
                        //     })
                        // }
                        xcalendar.unselect()
                    },
                    eventClick: function (arg) {
                        // if (confirm('Are you sure you want to delete this event?')) {
                        //     arg.event.remove()
                        // }
                    },
                    editable: false, // true
                    dayMaxEvents: true, // allow "more" link when too many events
                    events: calevents
                }
            );
        
            xcalendar.render();


        }
    };

};

btn_modalTimeApply.onclick = () => {
    if (inp_modalInpTimeStart.value == "") {
        alert("Enter Time Schedule");
        return;
    }
    if (inp_modalReason.value == "") {
        alert("Enter Reason of Appointment");
        return;
    }
    // let startTimeArr = inp_modalInpTimeStart.value.split(":");
    // let endTimeArr = inp_modalInpTimeEnd.value.split(":");
    // if (parseInt(startTimeArr[0]) > parseInt(endTimeArr[0])) {
    //     alert("Selected Schedule Start Time cannot be late compare to End Time");
    //     return;
    // }
    // else if (parseInt(startTimeArr[0]) == parseInt(endTimeArr[0])) {
    //     if (parseInt(startTimeArr[1]) > parseInt(endTimeArr[1])) {
    //        alert("Selected Schedule Start Time cannot be late compare to End Time");
    //        return;
    //     }
    //     else {
    //         let minutesDiff = parseInt(startTimeArr[1]) - parseInt(endTimeArr[1]);
    //         if (minutesDiff < 60) {
    //             alert("Selected Schedule cannot be less than one (1) hour.");
    //             return;
    //         }
    //     }
    // }

    let timesched = inp_modalInpTimeStart.value;
    let lawyerId = window.sessionStorage.getItem("pickId"); // or picked
    let uid = window.localStorage.getItem("uid");

    let alreadyTaken = false;
    let chosenDtstr = dtstr + "T" + timesched + ":00";
    let chosenDt = new Date(chosenDtstr); console.log("Chosen " + chosenDtstr, chosenDt);
    for (let i = 0; i < existSched.length; i++) {
        let d = new Date(existSched[i]);  console.log("Existing " + existSched[i], d);
        let diff = Math.abs(chosenDt.getTime() - d.getTime()); // console.log("@#@#@#", diff);
        if (diff < 3600000) {
            alreadyTaken = true;
            break;
        }
    }
    if (alreadyTaken) {
        alert("Chosen Date Time for Appointment conflicts to existing appointments. Make sure it is later or ahead an hour to the existing schedules.");
        return;
    } //return;

    

    let data = new FormData();
    data.append("startT", timesched + ":00");
    data.append("lawId", lawyerId);
    data.append("uid", uid);
    data.append("dtsched", dtstr);
        data.append("reason", inp_modalReason.value);
    // data.append("closeT", inp_modalInpTimeEnd.value + ":00");

    let route = "services/back/php/legal-lawyer/add_appoint.php";
    let tag = "LEGAL LAWYER: AddAppointment - ";
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
                alert(d.message);
                console.log(tag, e)
                return;
            } console.log(tag, d.success);

            if (d.success == false) {
                alert(d.message);
                console.log(tag, d.message);
                return;
            }

            /** populate the calendar here */
            btn_modalCloseAppoint.click();

            showCalendar();

            inp_modalReason.value = "";
            inp_modalInpTimeStart.value = "";
        }
    };
}

function getAppointments() {
    let route = "services/back/php/legal-lawyer/get_appointment.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LEGAL LAWYER: GetAppointment - ";
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



        }
    };
}

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}