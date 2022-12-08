btn_search.onclick = () => {
    if (inp_search.value == "") {
        alert("Insert law to search.");
        return;
    }

    window.sessionStorage.setItem("searchlaw", inp_search.value); // this and below would need to be considered
    if (typeof (Storage) !== "undefined") {
        window.location.href = "legal-search.html";
    }
    else {    // no web storage
        console.log("**** No web storage.");
        window.location.href = "legal-search.html?search=" + inp_search.value;
    }
}

function showPublicNotaryPlaces() {
    btn_maptrigger.click();
    lbl_modaltitle.innerHTML = "Public Notary Places";
    
}