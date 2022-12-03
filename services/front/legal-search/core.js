function getLawSearch() {
    inp_lawsearch.value = search_value;
    lbl_searchinp.innerHTML = "" + search_value;

    let route = "services/back/php/legal-search/get_searchlaw.php?search=" + search_value;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LEGAL SEARCH: GetLegalSearch - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            div_listsearch.innerHTML = "<a href='#' class='list-group-item list-group-item-action' aria-current='true'>" +
                                            "<div class='d-flex w-100 justify-content-between'>" +
                                                "<h5 class='mb-1'>There are no match results found...</h5>" +
                                            "</div>" +
                                        "</a>";

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

            lbl_searchctr.innerHTML = records.length;

            if (records.length > 0) {
                let stream = "";
                for (let i = 0; i < records.length; i++) {
                    
                    // <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                    //     <div class="d-flex w-100 justify-content-between">
                    //         <h5 class="mb-1">List group item heading</h5>
                    //         <small>3 days ago</small>
                    //     </div>
                    //     <p class="mb-1">Some placeholder content in a paragraph.</p>
                    //     <small>And some small print.</small>
                    // </a>


                    let lawname = records[i].lawcategory_name + ": " + records[i].lawfield_name;
                    if (lawname.length > 44) {
                        lawname = lawname.substring(0,44) + "...";
                    }
                    let lawdetails = records[i].lawfield_details;
                    if (lawdetails.length > 240) {
                        lawdetails = lawdetails.substring(0,240) + "...";
                    }

                    let badges = [
                        "badge bg-primary",
                        "badge bg-secondary",
                        "badge bg-success",
                        "badge bg-danger",
                        "badge bg-warning text-dark",
                        "badge bg-info text-dark",
                        "badge bg-dark"
                    ]
                    let fldtags = records[i].lawfield_tags;
                    if (fldtags.indexOf(",") != -1) {
                        fldtagsArr = fldtags.split(",");
                    }
                    else if (fldtags != "n/a") {
                        fldtagsArr = [fldtags]
                    }
                    let htmTagStream = "";
                    let randomAlreadyTags = [];
                    if (fldtagsArr.length > 0) {
                        for (let j = 0; j < fldtagsArr.length; j++) {
                            fldtagsArr[j] = fldtagsArr[j].trim();
        
                            let val = 0;
                            val = Math.floor(Math.random() * badges.length);
                            let b = badges[val];
        
                            val = 0;
                            while (true) {
                                val = Math.floor(Math.random() * fldtagsArr.length);
                                if (!randomAlreadyTags.includes(val)) {
                                    randomAlreadyTags.push(val);
                                    break;
                                }
                            }
                            let t = fldtagsArr[val].trim();
        
                            htmTagStream += "<span style='cursor: pointer;' class='" + b + " m-1'>" + t + "</span>";
                        }
                        htmTagStream += "...";
                    }
                    else {
                        htmTagStream += fldtags;
                    }

                    let link_str = "legal-lawyers.html?lfid=" + records[i].lawfield_id;
                    stream += "<a href='"+link_str+"' class='list-group-item list-group-item-action' aria-current='true'>" +
                                    "<div class='d-flex w-100 justify-content-between'>" +
                                        "<h5 class='mb-1'>"+lawname+"</h5>" +
                                        // "<small>3 days ago</small>" +
                                    "</div>" +
                                    "<div style='width: 85%'>" +
                                        "<p class='mb-1'>"+lawdetails+"</p>" +
                                    "</div>" +
                                    "<div style='width: 50%'>" +
                                        "<small>"+htmTagStream+"</small>" +
                                    "</div>" +
                                "</a>";

                    div_listsearch.innerHTML = stream;
                }
            }

        }
    };
}

