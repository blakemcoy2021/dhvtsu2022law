function getLawList() {
    let route = "services/back/php/legal-library/get_lawlibrary.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LEGAL LIBRARY: GetLegalLibrary - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            div_listlaw.innerHTML = "<div class='col-lg-4'>" +
                                        "<h2>There are no law listed in the law library.</h2>" +
                                    "</div>";

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

            // lbl_searchctr.innerHTML = records.length;

            if (records.length > 0) {
                let stream = "";
                for (let i = 0; i < records.length; i++) {
                    
                    // <div class="col-lg-4">
                    //     <img class="rounded-circle" src="../res/legal/politics.jpg" width="140" height="140">
                    //     <h2>Political Law</h2>
                    //     <p>Law which deals with the organization and operation of the governmental organs of the
                    //         State and define the relations of the state with the inhabitants of its territory.</p>
                    //     <p><a class="btn btn-primary" href="#">View details &raquo;</a></p>
                    // </div>


                    let lawcat = records[i].lawcategory_name;
                    if (lawcat.length > 44) {
                        lawcat = lawcat.substring(0,44) + "...";
                    }
                    let lawdetails = records[i].lawcategory_details1;
                    if (lawdetails.length > 240) {
                        lawdetails = lawdetails.substring(0,240) + "...";
                    }

                    let lawphoto = records[i].lawcategory_photo;

                    let id = records[i].lawcategory_id;

                    stream +=  "<div class='col-lg-4'>" +
                                    "<img class='rounded-circle' src='"+lawphoto+"' width='140' height='140'>" +
                                    "<h2>"+lawcat+"</h2>" +
                                    "<p>"+lawdetails+"</p>" +
                                    "<p><a class='btn btn-primary' href='javascript:void(0);' onclick='showLaws("+id+")'>View details &raquo;</a></p>" +
                                "</div>";

                    div_listlaw.innerHTML = stream;
                }
            }

        }
    };
}

