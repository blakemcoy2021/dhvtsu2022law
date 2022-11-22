function getLogsCtr() {
    let route = "services/back/php/logs/ctr_logs.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LOGS: GetLogsCtr - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            ctrlabel.innerHTML = "There are 0 log(s).";

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

            ctrlabel.innerHTML = "There are " + d.success + " log(s).";

        }
    };
}

function getLogs() {
    let route = "services/back/php/logs/get_logs.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "LOGS: GetLogs - ";
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
                    //     <td><strong>Done_By</strong></td>
                    //     <td><strong>Full_Name_Here</strong></td>
                    //     <td>Web_Page</td>
                    //     <td>Transaction_Here</td>
                    //     <th>Affected</th>
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

                    let log_id = records[i].id;
                    let usertype = records[i].usertype;
                    let fullname = records[i].fullname;
                    let webpage = records[i].webpage;
                    let transaction = records[i].transaction;
                    let datesaved = records[i].datesaved;
                    let affected = records[i].affected;

                    stream += "<tr>" +
                                    "<td><strong>" + usertype + "</strong></td>" +
                                    "<td><strong>" + fullname + "</strong></td>" +
                                    "<td>" + webpage +"</td>" +
                                    "<td>" + transaction + "</span></td>" +
                                    "<td>" + affected + "</span></td>" +
                                    "<td>" + datesaved + "</td>" +
                                    "<td>" +
                                        "<div class='dropdown'>" +
                                            "<button type='button' class='btn p-0 dropdown-toggle hide-arrow' data-bs-toggle='dropdown'>" +
                                                "<i class='bx bx-dots-vertical-rounded'></i>" +
                                            "</button>" +
                                            "<div class='dropdown-menu'>" +
                                                "<a class='dropdown-item' href='javascript:delLogInfo("+ log_id +");'>" +
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

