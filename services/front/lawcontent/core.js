function getLawContentCtr() {
    let route = "services/back/php/lawcontent/ctr_lawcontent.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LAW CONTENT: GetLawContentCtr - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            ctrlabel.innerHTML = "There are 0 law contents.";

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

            ctrlabel.innerHTML = "There are " + d.success + " law contents.";

        }
    };
}

function getLawContent() {
    let route = "services/back/php/lawcontent/get_lawcontent.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LAW CONTENT: GetLawContent - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            tbl.innerHTML = "";

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
                    
                    // <tr>
                    //     <td><strong>Law_Title_Here</strong></td>
                    //     <td>Details_Here</td>
                    //     <td>Category_Name_Here</td>
                    //     <td>
                    //          "<img src='Law_photo_here' alt='Avatar' height='40' width='80' />"
                    //     </td>
                    //     <td>Attached_File_Here</td>
                    //     <td>Date_Saved_Here</span></td>
                    //     <td>
                    //         <div class="dropdown">
                    //             <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                    //                 data-bs-toggle="dropdown">
                    //                 <i class="bx bx-dots-vertical-rounded"></i>
                    //             </button>
                    //             <div class="dropdown-menu">
                    //                 <a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#backDropModal">
                    //                     <i class="bx bx-edit-alt me-1"></i> Edit</a>
                    //                 <a class="dropdown-item" href="javascript:void(0);">
                    //                     <i class="bx bx-trash me-1"></i> Delete</a>
                    //             </div>
                    //         </div>
                    //     </td>
                    // </tr>


                    let lawid = records[i].law_id;
                    let lawtitle = records[i].law_title;
                    if (lawtitle.length > 18) {
                        lawtitle = lawtitle.substring(0,18) + "...";
                    }
                    let lawdetails = records[i].law_details;
                    if (lawdetails.length > 18) {
                        lawdetails = lawdetails.substring(0,18) + "...";
                    }
                    let lawcat = records[i].lawcategory_name;
                    let lawphoto = records[i].law_photo;
                    if (lawphoto == "n/a") {
                        lawphoto = "res/legal/none2.png";
                    }
                    let datesaved = records[i].law_datesaved;

                    let lawattach = records[i].law_attachfile;
                    if (lawattach != "n/a") {
                        let lawpdfArr = lawattach.split("/");
                        lawattach = lawpdfArr[lawpdfArr.length-1];
                        if (lawattach.length > 18) {
                            lawattach = lawattach.substring(0,18) + "...";
                        }
                    }


                    stream += "<tr>" +
                                    "<td><strong>" + lawtitle + "</strong></td>" +
                                    // "<td>" + lawdetails + "</td>" +
                                    "<td>" + lawcat + "</td>" +
                                    "<td>" +
                                        "<img src='" +lawphoto+ "' alt='Avatar' height='40' width='80' />" +
                                    "</td>" +
                                    "<td>" + lawattach + "</td>" +                                    
                                    "<td>" + datesaved + "</td>" +
                                    "<td>" +
                                        "<div class='dropdown'>" +
                                            "<button type='button' class='btn p-0 dropdown-toggle hide-arrow' data-bs-toggle='dropdown'>" +
                                                "<i class='bx bx-dots-vertical-rounded'></i>" +
                                            "</button>" +
                                            "<div class='dropdown-menu'>" +
                                                "<a class='dropdown-item' href='javascript:getLawContentInfo(" +lawid+ ");'>" +
                                                    "<i class='bx bx-edit-alt me-1'></i> Edit</a>" +
                                                "<a class='dropdown-item' href='javascript:delLawContentInfo("+ lawid +");'>" +
                                                    "<i class='bx bx-trash me-1'></i> Delete</a>" +
                                            "</div>" +
                                        "</div>" +
                                    "</td>" +
                                "</tr>";

                    tbl.innerHTML = stream;
                }
            }

        }
    };
}

