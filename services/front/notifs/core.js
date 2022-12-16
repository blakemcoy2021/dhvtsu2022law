function getNotifications(userid) {
    let route = "services/back/php/notifs/get_user_notifs.php?uid=" + userid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "NOTIFS: GetNotifs - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            list_notifs.innerHTML = "<div class='card mb-3'><div class='card-body'>" +
                                        "<h5 class='card-title'>You have no Notifications Yet.</h5>" +
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
                console.log(tag, e);
                return;
            } console.log(tag, records);

            if (records.length > 0) {
                let stream = "";
                
                let uploadphoto = records[0].user_photo;
                let rmcache = new Date();
                if (uploadphoto != "n/a") {
                    photo_usersm.src = uploadphoto + "?nc=" + rmcache.getMilliseconds();
                }
                verified = records[0].login_verified;
                let roleid = records[0].login_roleid;
                
                if (roleid == 3) {
                    lawyer = "1";
                }

                for (let i = 0; i < records.length; i++) {

                    // <div class="card mb-3">
                    //     <div class="card-body">
                    //         <h5 class="card-title">Special title treatment</h5>
                    //         <p class="card-text">With supporting text below as a natural lead-in to
                    //             additional content.</p>
                    //         <a href="javascript:void(0)" class="btn btn-primary">Go somewhere</a>
                    //     </div>
                    // </div>

                    let monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    let dtstamp = records[i].log_datesaved;
                    let dt = new Date(dtstamp);
                    let notif_dt = "<span style='font-size: x-small'><u>" + 
                                        monthsArr[dt.getMonth()] + 
                                        " " + dt.getDate() +
                                        ", " + dt.getFullYear() + 
                                        " " + dt.getHours() +
                                        ":" + dt.getMinutes() +
                                        ":" + dt.getSeconds() +
                                    "</u></span>";

                    let notifs = records[i].log_transaction;
                    let notif_title = "";
                    let notif_message = "";
                    let options = "";

                    if (notifs.includes("verify")) {
                        if (notifs.includes("lawyer verified")) {
                            notif_title = "Congratulations! ⚖️🎉 You are now a Verified Lawyer! - " + notif_dt;
                            notif_message = "Your can now set and accept appointment(s) from client(s).";
                        }
                        else if (notifs.includes("verified")) {
                            notif_title = "Congratulations! 🎉 Your Account has been Verified! - " + notif_dt;
                            notif_message = "Your account is now eligible to request appointment(s) to lawyers.";
                        }
                        else if (notifs.includes("lawyer declined")) {
                            notif_title = "Sorry! ⚖️❌ You have been Declined as a Lawyer! - " + notif_dt;
                            notif_message = "Your lawyer credibility has not passed the verification ";
                            notif_message += "process due to suspicious/inconsistent information given ";
                            notif_message += "specially if PRC ID uploaded is not valid.";
                            if (verified != "1") {
                                options += "<a href='javascript: requestReVerify("+userid+","+roleid+");' class='btn btn-primary'>Request Again</a>";
                            }
                        }
                        else if (notifs.includes("declined")) {
                            notif_title = "Sorry! ❌ Your Account has been Declined! - " + notif_dt;
                            notif_message = "Your account has not passed the verification ";
                            notif_message += "process due to suspicious/inconsistent information given ";
                            notif_message += "specially if ID uploaded is not matched to your account.";
                            if (verified != "1") {
                                options += "<a href='javascript: requestReVerify("+userid+","+roleid+");' class='btn btn-primary'>Request Again</a>";
                            }
                        }
                    }
                    else if (notifs.includes("appointment update")) {
                        if (notifs.includes("done")) {
                            let processArr = notifs.split(" ");
                            let appId = processArr[processArr.length-1];
                            notif_title = "Great! ⚖️🎉 Your Appointment now has been finished! - " + notif_dt;
                            notif_message = "Your can now set and accept appointment(s) to other lawyer(s).";
                            options += "<a href='javascript: rateAndComment("+records[i].log_postuid+","+appId+");' class='btn btn-primary'>Rate Lawyer Experience</a>";
                        }
                        else if (notifs.includes("decline")) {
                            notif_title = "Sorry! 🎉 Your Appointment has been declined! - " + notif_dt;
                            notif_message = "Try to request appointment(s) to lawyer(s) again.";
                        }
                        else if (notifs.includes("cancel")) {
                            notif_title = "Sorry! ⚖️❌ The Appointment had been cancelled by the client! - " + notif_dt;
                            notif_message = "Your client cancelled it. ";
                        }
                    }


                    stream += "<div class='card mb-3'>" +
                                    "<div class='card-body'>" +
                                        "<h4 class='card-title'>" + notif_title + "</h4>" +
                                        "<p class='card-text'>" + notif_message + "</p>" +
                                        options +
                                    "</div>" +
                                "</div>";

                    list_notifs.innerHTML = stream;
                }
            }

        }
    };
}

