btn_search.onclick = () => {
    if (inp_searchlawyer.value == "") {
        getLawCategoryCover();
        getLawyers();
        slctPopulateLawCat();
        return;
    }

    let lawcatid = slct_lawcategory.value;
    let route = "services/back/php/legal-lawyer/get_lawyer_search.php?name=" + inp_searchlawyer.value + "&catid=" + lawcatid;
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


                    // let link_str = "legal-lawyers.html?lfid=" + records[i].lawfield_id;
                    stream += "<a href='#' class='list-group-item list-group-item-action' aria-current='true'>" +
                        "<div class='d-flex'>" +
                        "<div style='margin-right: 20px'>" +
                        "<img src='" + records[i].user_photo + "' class='rounded-circle' width='90' height='90'>" +
                        "</div>" +
                        "<div>" +
                        "<div class='d-flex w-100 justify-content-between'>" +
                        "<h5 class='mb-1'>" + lawyername + "</h5>" +
                        // "<small>3 days ago</small>" +
                        "</div>" +
                        "<p class='mb-1'>" + lawyer_days + "&nbsp;&nbsp;<b>Open-Close Time: </b>" + lawyer_time + "</p>" +
                        "</div>" +
                        "</div>" +
                        "</a>";

                    if (lawcatid != 0) {
                        cover_lawphoto.style.backgroundImage = "url('" + records[0].lawcategory_cover + "')";
                        lbl_lawtitle.innerHTML = records[0].lawcategory_name;
                        lbl_lawdetails.innerHTML = records[0].lawcategory_details1;
                    }

                    div_listlawyers.innerHTML = stream;
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

    // clearSelection();
    // getLawyers();
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
                lbl_infoLawyerAddr.innerHTML = address;

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
        window.location.href = "login.html";
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
        }
    };
}

btn_modalAppoint.onclick = () => {
    btn_modalToggle2nd.click();
    showCalendar();
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

    calendar = new FullCalendar.Calendar(calendarEl,
        {
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
                dtstr = year.toString() + "-" + month.toString() + "-" + day.toString();
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
                calendar.unselect()
            },
            eventClick: function (arg) {
                // if (confirm('Are you sure you want to delete this event?')) {
                //     arg.event.remove()
                // }
            },
            editable: false, // true
            dayMaxEvents: true, // allow "more" link when too many events
            events: [
                // {
                //     title: 'All Day Event',
                //     start: '2022-11-01'
                // },
                // {
                //     title: 'Long Event',
                //     start: '2022-11-07',
                //     end: '2022-11-10'
                // },
                // {
                //     groupId: 999,
                //     title: 'Repeating Event',
                //     start: '2022-11-11T16:00:00'
                // },
                // {
                //     groupId: 999,
                //     title: 'Repeating Event',
                //     start: '2022-11-16T16:00:00'
                // },
                // {
                //     title: 'Conference',
                //     start: '2022-11-11',
                //     end: '2022-11-13'
                // },
                // {
                //     title: 'Meeting',
                //     start: '2022-11-12T10:30:00',
                //     end: '2022-11-12T12:30:00'
                // },
                // {
                //     title: 'Lunch',
                //     start: '2022-11-12T12:00:00'
                // },
                // {
                //     title: 'Meeting',
                //     start: '2022-11-12T14:30:00'
                // },
                // {
                //     title: 'Happy Hour',
                //     start: '2022-11-12T17:30:00'
                // },
                // {
                //     title: 'Dinner',
                //     start: '2022-11-12T20:00:00'
                // },
                // {
                //     title: 'Birthday Party',
                //     start: '2022-11-13T07:00:00'
                // },
                // {
                //     title: 'Click for Google',
                //     url: 'http://google.com/',
                //     start: '2022-11-28'
                // }
            ]
        });

    calendar.render();
};

btn_modalTimeApply.onclick = () => {
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

    let data = new FormData();
    data.append("startT", timesched + ":00");
    //data.append("closeT", inp_modalInpTimeEnd.value + ":00");

    let lawyerId = window.sessionStorage.getItem("prevPicked");
    lawyerId = lawyerId.split("rowId")[1];
    data.append("lawId", lawyerId);

    let uid = window.localStorage.getItem("uid");
    data.append("uid", uid);

    data.append("dtsched", dtstr);

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
                console.log(tag, e)
                return;
            } console.log(tag, d.success);

            if (d.success == false) {
                console.log(tag, d.message);
                return;
            }
            alert(d.message);

            /** populate the calendar here */
            btn_modalCloseAppoint.click();

            // 2022-11-11T16:00:00
            let startTime_str = dtstr+"T"+timesched;
            let endTime_str = dtstr+"T"+(parseInt(timesched.split(":")[0]) + 1).toString();
                console.log(startTime_str, endTime_str);

            calendar.addEvent({
                title: 'Your Appointment',
                start: startTime_str,
                end: endTime_str
            })
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