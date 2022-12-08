btn_lawsearch.onclick = () => {
    if (inp_lawsearch.value == "") {
        alert("Insert law to search.");
        return;
    }

    window.sessionStorage.setItem("searchlaw", inp_lawsearch.value); // this and below would need to be considered
    if (typeof (Storage) !== "undefined") {
        window.location.href = "legal-search.html";
    }
    else {    // no web storage
        console.log("**** No web storage.");
        window.location.href = "legal-search.html?search=" + inp_lawsearch.value;
    }
}

link_profile.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        if (hrole.value == 1) {
            window.location.href = "dashboard.html"; //dashboard
        } else {
            window.location.href = "home.html";
        }

    } else {    // no web storage
        console.log("**** No web storage.");

        if (d[2] == 1) {   //dashboard
            window.location.href = "dashboard.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        } else {
            window.location.href = "home.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        }

    }    
}
link_notifs.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        if (hrole.value == 1) {
            window.location.href = "dashboard.html"; //dashboard
        } else {
            window.location.href = "notifications.html";
        }

    } else {    // no web storage
        console.log("**** No web storage.");

        if (d[2] == 1) {   //dashboard
            window.location.href = "dashboard.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        } else {
            window.location.href = "notifications.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        }

    }    
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

    let loginid = window.localStorage.getItem("uid");
    let roleid = window.localStorage.getItem("role");
    let route = "services/back/php/appoint/get_appoint.php?luid=" +loginid+ "&roleid=" + roleid;
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

            let calevents = [];

            if (records.length > 0) {
                for (let i = 0; i < records.length; i++) {
                    let txt = "Reserved Appointment";
                    let u = window.localStorage.getItem("uid");
                    if (u == records[i].app_userid) {
                        txt = "YOUR appointment";
                    }

                    if (records[i].app_status == "done") {
                        txt = "DONE Appointment";
                    }
                    else if (records[i].app_status == "decline") {
                        txt = "DECLINE Appointment";
                    }
                    else if (records[i].app_status == "cancel") {
                        txt = "CANCEL Appointment";
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
                }
            }

            var xcalendar = new FullCalendar.Calendar(
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

function appointmentUpdate(msg) {
    let appid = window.sessionStorage.getItem("appid");
    let route = "services/back/php/appoint/upd_appoint.php?appid=" +appid+ "&msg=" + msg;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "APPOINTMENTS: UpdAppointments - ";
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

            window.sessionStorage.removeItem("appid");
            if (roletyp.innerHTML == "Client") {
                getAppointments(window.localStorage.getItem("uid"));
                showCalendar();
            }
            else {
                getAppointments(window.localStorage.getItem("uid"), true);
                showCalendar();
            }

        }
    }
}

btn_doneapplaw.onclick = () => {
    appointmentUpdate("done");
}

btn_declineapp.onclick = () => {
    appointmentUpdate("decline");
}

btn_cancelapp.onclick = () => {
    appointmentUpdate("cancel");
}

function seeAppOpts(appid) {
    window.sessionStorage.setItem("appid", appid);

    if (window.localStorage.getItem("role") == "3") {
        if (btn_doneapplaw.classList.contains("hideout")) {
            btn_doneapplaw.classList.remove("hideout");
        }
        if (btn_declineapp.classList.contains("hideout")) {
            btn_declineapp.classList.remove("hideout");
        }
        if (!btn_cancelapp.classList.contains("hideout")) {
            btn_cancelapp.classList.add("hideout");
        }
    }
    else {
        if (!btn_doneapplaw.classList.contains("hideout")) {
            btn_doneapplaw.classList.add("hideout");
        }
        if (!btn_declineapp.classList.contains("hideout")) {
            btn_declineapp.classList.add("hideout");
        }
        if (btn_cancelapp.classList.contains("hideout")) {
            btn_cancelapp.classList.remove("hideout");
        }
    }


    btn_appops.click();
}