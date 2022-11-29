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

                    let lawyerphoto = records[i].user_photo;
                    let rmcache = new Date();
                    if (lawyerphoto != "n/a") {
                        lawyerphoto = lawyerphoto + "?nc=" + rmcache.getMilliseconds();
                    }
                    else {
                        lawyerphoto = "res/legal/none.png";
                    }

                    let lawyername = records[i].user_lastname + ", " + records[i].user_firstname + " - " + records[i].lawcategory_name;
                    if (lawyername.length > 40) {
                        lawyername = lawyername.substring(0,40) + "...";
                    }

                    let contactnum = records[i].contact_phone;

                    let monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    let dtstamp = records[i].app_datesched;
                    let dt = new Date(dtstamp);
                    let tmstamp = records[i].app_timesched;
                    let app_dt = monthsArr[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear() + " - " + tmstamp;

                    stream += "<div class='card mb-3'>" +
                                    "<div class='card-body'>" +
                                        "<div class='d-flex row'>" +
                                            "<div class='col-sm-3'>" +
                                                "<img src='"+lawyerphoto+"' class='rounded-circle' style='width: 100%'>" +
                                            "</div>" +
                                            "<div class='col-sm-9'>" +
                                                "<h5 class='card-title m-1'>"+lawyername+"</h5>" +
                                                "<p class='card-text m-0'>"+app_dt+"</p>" +
                                                "<p class='card-text m-0'>+63 "+contactnum+"</p>" +
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