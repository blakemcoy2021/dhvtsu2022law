function getLawCatCtr() {
    let route = "services/back/php/lawcategory/ctr_lawcategory.php";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "INDEX: GetLawContentCtr - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            lbl_ctrlawcat.innerHTML = "0";

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

            lbl_ctrlawcat.innerHTML = d.success;

        }
    };
}

function getLawyersCtr() {
    let route = "services/back/php/dashboard/ctr_users.php?role=3";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", route, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let tag = "INDEX: GetLawyersCtr - ";
            let respo = xhttp.responseText; console.log(tag, respo);

            lbl_ctrlawyers.innerHTML = 0;

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

            lbl_ctrlawyers.innerHTML = d.success;

        }
    };
}