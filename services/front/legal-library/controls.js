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

function showLaws(catid) {
    
    btn_modalLauncher.click();

    let route = "services/back/php/legal-library/get_sublaws.php?catid=" +catid;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tag = "LEGAL LIBRARY: GetSubLaws - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            mdl_contentAccord.innerHTML = "<div><h3>No Saved Laws For this Law Category</h3></div>"

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


            if (records.length > 0) {
                let stream = "";
                for (let i = 0; i < records.length; i++) {
                    
                    // <div class="accordion-item">
                    //     <h2 class="accordion-header" id="headingOne">
                    //         <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    //             data-bs-target="#collapseOne" aria-expanded="true"
                    //             aria-controls="collapseOne">
                    //             Accordion Item #1
                    //         </button>
                    //     </h2>
                    //     <div id="collapseOne" class="accordion-collapse collapse show"
                    //         aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    //         <div class="accordion-body">
                    //             <strong>This is the first item's accordion body.</strong> It is shown by
                    //             default, until the collapse plugin adds the appropriate classes that we use
                    //             to style each element. These classes control the overall appearance, as well
                    //             as the showing and hiding via CSS transitions. You can modify any of this
                    //             with custom CSS or overriding our default variables. It's also worth noting
                    //             that just about any HTML can go within the <code>.accordion-body</code>,
                    //             though the transition does limit overflow.
                    //         </div>
                    //     </div>
                    // </div>

                    let ctr = i;
                    stream += "<div class='accordion-item'>" +
                                    "<h2 class='accordion-header' id='heading"+ctr+"'>" +
                                        "<button class='accordion-button' type='button' data-bs-toggle='collapse'" +
                                            "data-bs-target='#collapse"+ctr+"' aria-expanded='true'" +
                                            "aria-controls='collapse"+ctr+"'>" +
                                            records[i].lawfield_name +
                                        "</button>" +
                                    "</h2>" +
                                    "<div id='collapse"+ctr+"' class='accordion-collapse collapse show'" +
                                        "aria-labelledby='heading"+ctr+"' data-bs-parent='#accordionExample'>" +
                                        "<div class='accordion-body'>" +
                                            records[i].lawfield_details +
                                        "</div>" +
                                    "</div>" +
                                "</div>";

                    mdl_contentAccord.innerHTML = stream;
                }
            }

        }
    };
}

