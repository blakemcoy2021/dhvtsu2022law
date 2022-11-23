function delLogInfo(id) {
    alert("deletion by log id in process");
    return;
}

link_clients.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "dashboard.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "dashboard.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}
link_lawyers.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "lawyers.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "lawyers.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}
link_lawcategory.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "lawcategory.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "lawcategory.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}
link_lawfield.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "lawfield.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "lawfield.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}
link_lawcontent.onclick = () => {
    if (typeof (Storage) !== "undefined") {
        window.location.href = "lawcontent.html";

    } 
    else {    // no web storage
        console.log("**** No web storage.");

        window.location.href = "lawcontent.html?uid=" + huid + "&fname=" + hname + "&role=" + hrole;
    }     
}