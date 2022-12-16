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
link_appoint.onclick = () => {
    if (verified != "1") {
        if (lawyer == "1") {
            lbl_userverify.innerHTML = "Lawyer Status Not Yet Verified";
        }
        else {
            lbl_userverify.innerHTML = "Not Yet Verified";
        }
        btn_notverified.click();
        return;
    }

    if (typeof (Storage) !== "undefined") {
        if (hrole.value == 1) {
            window.location.href = "dashboard.html"; //dashboard
        } else {
            window.location.href = "appointments.html";
        }

    } else {    // no web storage
        console.log("**** No web storage.");

        if (d[2] == 1) {   //dashboard
            window.location.href = "dashboard.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        } else {
            window.location.href = "appointments.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole + "&uname=" + uname.innerHTML;
        }

    }    
}

function requestReVerify(userid, roleid) {
    let route = "services/back/php/notifs/upd_user_reverify.php?uid=" + userid + "&role=" +roleid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "NOTIFICATIONS: ReVerifyUsersInfo - ";
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
            alert(d.message);

            getNotifications(userid);
        }
    };
}


function rateAndComment(lawyerid, appId) { // login_userid
    window.sessionStorage.setItem("appId", appId);
    let route = "services/back/php/notifs/get_appoint_rating.php?appid=" + appId;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "NOTIFICATIONS: ReVerifyUsersComment - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            let d;
            try { 
                d = JSON.parse(respo); 
            } catch (e) {
                console.log(tag, e)
                return; 
            }   console.log(tag, d.success);
            
            if (d.success == false) { 
                alert(d.message);
                return; 
            }
            // true
            btn_modalLauncher.click();


        }
    };
}

btn_modalStar1.onclick = () => {
    window.sessionStorage.setItem("starRate", 1);
    let btnStarArr = [btn_modalStar2, btn_modalStar3, btn_modalStar4, btn_modalStar5];
    for (let i = 0; i < btnStarArr.length; i++) {
        if (btnStarArr[i].classList.contains("bxs-star")) {
            btnStarArr[i].classList.remove("bxs-star");
            btnStarArr[i].classList.add("bx-star");
        }
    }
    if (btn_modalStar1.classList.contains("bx-star")) {
        btn_modalStar1.classList.remove("bx-star");
        btn_modalStar1.classList.add("bxs-star");
    }
}
btn_modalStar2.onclick = () => {
    window.sessionStorage.setItem("starRate", 2);
    let btnStarArr = [btn_modalStar3, btn_modalStar4, btn_modalStar5];
    for (let i = 0; i < btnStarArr.length; i++) {
        if (btnStarArr[i].classList.contains("bxs-star")) {
            btnStarArr[i].classList.remove("bxs-star");
            btnStarArr[i].classList.add("bx-star");
        }
    }
    if (btn_modalStar1.classList.contains("bx-star")) {
        btn_modalStar1.classList.remove("bx-star");
        btn_modalStar1.classList.add("bxs-star");
    }
    if (btn_modalStar2.classList.contains("bx-star")) {
        btn_modalStar2.classList.remove("bx-star");
        btn_modalStar2.classList.add("bxs-star");
    }
}
btn_modalStar3.onclick = () => {
    window.sessionStorage.setItem("starRate", 3);
    let btnStarArr = [btn_modalStar1, btn_modalStar2, btn_modalStar3];
    for (let i = 0; i < btnStarArr.length; i++) {
        if (btnStarArr[i].classList.contains("bx-star")) {
            btnStarArr[i].classList.remove("bx-star");
            btnStarArr[i].classList.add("bxs-star");
        }
    }
    
    if (btn_modalStar4.classList.contains("bxs-star")) {
        btn_modalStar4.classList.remove("bxs-star");
        btn_modalStar4.classList.add("bx-star");
    }
    if (btn_modalStar5.classList.contains("bxs-star")) {
        btn_modalStar5.classList.remove("bxs-star");
        btn_modalStar5.classList.add("bx-star");
    }
}
btn_modalStar4.onclick = () => {
    window.sessionStorage.setItem("starRate", 4);
    let btnStarArr = [btn_modalStar1, btn_modalStar2, btn_modalStar3, btn_modalStar4];
    for (let i = 0; i < btnStarArr.length; i++) {
        if (btnStarArr[i].classList.contains("bx-star")) {
            btnStarArr[i].classList.remove("bx-star");
            btnStarArr[i].classList.add("bxs-star");
        }
    }
    if (btn_modalStar5.classList.contains("bxs-star")) {
        btn_modalStar5.classList.remove("bxs-star");
        btn_modalStar5.classList.add("bx-star");
    }
}
btn_modalStar5.onclick = () => {
    window.sessionStorage.setItem("starRate", 5);
    let btnStarArr = [btn_modalStar1, btn_modalStar2, btn_modalStar3, btn_modalStar4, btn_modalStar5];
    for (let i = 0; i < btnStarArr.length; i++) {
        if (btnStarArr[i].classList.contains("bx-star")) {
            btnStarArr[i].classList.remove("bx-star");
            btnStarArr[i].classList.add("bxs-star");
        }
    }

}

btn_ratesave.onclick = () => {
    if (inp_comment.value == "" || inp_comment.value == "n/a") {
        alert("Enter comment to proceed.");
        return;
    }
    let star = window.sessionStorage.getItem("starRate");
    if (star == null) {
        alert("You must rate it with a star to proceed.");
        return;
    }

    let appId = window.sessionStorage.getItem("appId");
    
    let route = "services/back/php/notifs/upd_appoint_rate.php?appId=" + appId + "&rate=" +star + "&comment=" + inp_comment.value;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "NOTIFICATIONS: RateAppointment - ";
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
            alert(d.message);

            window.sessionStorage.removeItem("starRate");
            window.sessionStorage.removeItem("appId");
            getNotifications(window.localStorage.getItem("uid"));
            btn_modalCommentClose.click();
        }
    };

}