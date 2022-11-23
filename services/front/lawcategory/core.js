function getLawCategoryCtr() {
    let route = "services/back/php/lawcategory/ctr_lawcategory.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LAW CATEGORY: GetLawCategoryCtr - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            ctrlabel.innerHTML = "There are 0 law categories.";

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

            ctrlabel.innerHTML = "There are " + d.success + " law categories.";

        }
    };
}

function getLawCategory() {
    let route = "services/back/php/lawcategory/get_lawcategory.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LAWCATEGORY: GetLawCategory - ";
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
                    //     <td><strong>Category_Law_Name_Here</strong></td>
                    //     <td>
                    //         <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                    //             <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top"
                    //                 class="avatar avatar-xs pull-up" title="Christina Parker">
                    //                 <img src="../assets/img/avatars/7.png" alt="Avatar" class="rounded-circle" />
                    //             </li>
                    //         </ul>
                    //     </td>
                    //     <td>Cover_Here</td>
                    //     <td>Foreword_Here</td>
                    //     <td>Details_Here</td>
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


                    let catid = records[i].lawcategory_id;
                    let catname = records[i].lawcategory_name;
                    let catphoto = records[i].lawcategory_photo;
                    if (catphoto == "n/a") {
                        catphoto = "res/legal/none.png";
                    }
                    let catcover = records[i].lawcategory_cover;
                    if (catcover == "n/a") {
                        catcover = "res/legal/none2.png";
                    }
                    let catforeword = records[i].lawcategory_details1;
                    if (catforeword.length > 18) {
                        catforeword = catforeword.substring(0,18) + "...";
                    }
                    let catdetails = records[i].lawcategory_details2;
                    if (catdetails.length > 18) {
                        catdetails = catdetails.substring(0,18) + "...";
                    }
                    let datesaved = records[i].lawcategory_datesaved;

                    stream += "<tr>" +
                                    "<td><strong>" + catname + "</strong></td>" +
                                    "<td>" +
                                        "<ul class='list-unstyled users-list m-0 avatar-group d-flex align-items-center'>" +
                                            "<li data-bs-toggle='tooltip' data-popup='tooltip-custom' data-bs-placement='top' " +
                                                "class='avatar pull-up' title='Christina Parker'>" +
                                                "<img src='" +catphoto+ "' alt='Avatar' class='rounded-circle' />" +
                                            "</li>" +
                                        "</ul>" +
                                    "</td>" +
                                    "<td>" +
                                        "<img src='" +catcover+ "' alt='Avatar' height='40' width='80' />" +
                                    "</td>" +
                                    "<td>" + catforeword + "</span></td>" +
                                    "<td>" + catdetails + "</span></td>" +
                                    "<td>" + datesaved + "</td>" +
                                    "<td>" +
                                        "<div class='dropdown'>" +
                                            "<button type='button' class='btn p-0 dropdown-toggle hide-arrow' data-bs-toggle='dropdown'>" +
                                                "<i class='bx bx-dots-vertical-rounded'></i>" +
                                            "</button>" +
                                            "<div class='dropdown-menu'>" +
                                                "<a class='dropdown-item' href='javascript:getLawCatInfo(" +catid+ ");'>" +
                                                    "<i class='bx bx-edit-alt me-1'></i> Edit</a>" +
                                                "<a class='dropdown-item' href='javascript:delLawCatInfo("+ catid +");'>" +
                                                    "<i class='bx bx-trash me-1'></i> Delete</a>" +
                                                "<a class='dropdown-item' style='display: none' id='htmAncBackDropModal' data-bs-toggle='modal' data-bs-target='#backDropModal'>hidden_trigger</a>" +
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

