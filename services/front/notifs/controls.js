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
            window.location.href = "dashboard.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
        } else {
            window.location.href = "home.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
        }

    }    
}