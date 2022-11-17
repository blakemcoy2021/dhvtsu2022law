document.addEventListener('DOMContentLoaded',
    function () {
        var calendarEl = document.getElementById('htmFullCalendar');

        var dtnow = new Date();
        var dtnow_str = dtnow.getFullYear().toString();
        var dtnow_month = dtnow.getMonth() + 1;
        if (dtnow_month < 10) {
            dtnow_str += "0" + dtnow_month.toString();
        }
        else {
            dtnow_str += dtnow_month.toString();
        }
        var dtnow_days = dtnow.getDate();
        if (dtnow_days < 10) {
            dtnow_str += "0" + dtnow_days.toString();
        }
        else {
            dtnow_str += dtnow_days.toString();
        }

        var calendar = new FullCalendar.Calendar(calendarEl,
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
                    // var title = prompt('Event Title:');
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
    });

function getAppointments(userid) {
    let route = "services/back/php/appoint/get_user_appoints.php?uid=" + userid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "APPOINTMENT: GetUserAppointment - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            list_appoints.innerHTML = "<div class='card mb-3'><div class='card-body'>" +
                                            "<h5 class='card-title'>You have no Appointment(s) Yet.</h5>" +
                                        "</div></div>";

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

            // if (records.length > 0) {
            //     let stream = "";
                
            //     let uploadphoto = records[0].user_photo;
            //     let rmcache = new Date();
            //     if (uploadphoto != "n/a") {
            //         photo_usersm.src = uploadphoto + "?nc=" + rmcache.getMilliseconds();
            //     }

            //     for (let i = 0; i < records.length; i++) {

            //         // <div class="card mb-3">
            //         //     <div class="card-body">
            //         //         <h5 class="card-title">Special title treatment</h5>
            //         //         <p class="card-text">With supporting text below as a natural lead-in to
            //         //             additional content.</p>
            //         //         <a href="javascript:void(0)" class="btn btn-primary">Go somewhere</a>
            //         //     </div>
            //         // </div>

            //         let monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            //         let dtstamp = records[i].log_datesaved;
            //         let dt = new Date(dtstamp);
            //         let notif_dt = "<span style='font-size: x-small'><u>" + monthsArr[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + "</u></span>";

            //         let notifs = records[i].log_transaction;
            //         let notif_title = "";
            //         let notif_message = "";
            //         let options = "";

            //         if (notifs.includes("verify")) {
            //             if (notifs.includes("verified")) {
            //                 notif_title = "Congratulations! 🎉 Your Account has been Verified! - " + notif_dt;
            //                 notif_message = "Your account is now eligible to request appointment(s) to lawyers.";
            //             }
            //             else if (notifs.includes("declined")) {
            //                 notif_title = "Sorry! ❌ Your Account has been Declined! - " + notif_dt;
            //                 notif_message = "Your account has not passed to the verification ";
            //                 notif_message += "process due to suspicious/inconsistent information given ";
            //                 notif_message += "specially if ID uploaded is not matched to your account.";
            //                 options += "<a href='javascript: requestReVerify(" + userid + ")' class='btn btn-primary'>Request Again</a>";
            //             }
            //         }


            //         stream += "<div class='card mb-3'>" +
            //                         "<div class='card-body'>" +
            //                             "<h4 class='card-title'>" + notif_title + "</h4>" +
            //                             "<p class='card-text'>" + notif_message + "</p>" +
            //                             options +
            //                         "</div>" +
            //                     "</div>";

            //         list_notifs.innerHTML = stream;
            //     }
            // }

        }
        else if (this.readyState == 4) {
            alert("Server Unreachable. Possible Slow Internet Connection..!");
        }
    };
}