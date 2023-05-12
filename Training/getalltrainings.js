const [BaseUrl, trainingTable, tablebody] = ["https://localhost:7294/api/", document.querySelector('#trainingtable'),
    document.querySelector("#tablebody")];


$(document).ready(function () {
   showSpinner();
    axios.get(`${BaseUrl}Training/getall`)
        .then(response => {
            if(response.data.succeeded){
                hideSpinner();
                $('#trainingtable').DataTable({
                    order: [[0, 'asc']],
                    dom: 'Bfrtip',
                    responsive: true,
                    buttons: [
                        {
                            extend: 'copy',
                            text: 'Copy Data',
                            title: '',
                            exportOptions: {
                                columns: [0, 1, 2] 
                            }
                        },
                        {
                            extend: 'print',
                            text: 'Print Data',
                            title: '',
                            exportOptions: {
                                columns: [0, 1, 2] 
                            }
                        },
                        {
                            extend: 'excelHtml5',
                            text: 'Export to Excel',
                            title: '',
                            exportOptions: {
                                columns: [0, 1, 2] 
                            }
                        },
                        {
                            extend: 'csvHtml5',
                            text: 'Export to CSV',
                            title: '',
                            exportOptions: {
                                columns: [0, 1, 2] 
                            }
                        }
                    ],
                    data: response.data.data,
                    columns: [
                        { title: 'Name', data: `${"trainingName"}` },
                        {
                            data: 'training.dateOfCertificateIssuance',
                            render: function (data, type, row) {
                                return dateformatter(row.dateOfCertificateIssuance);
                            },
                            title: 'Date For Certification'
                        },
                        { title: 'Training Category', data: `${"trainingCategoryName"}` },
                        {
                            title: 'Edit',
                            data: 'trainingName',
                            render: function (data, type, row) {
                                return `<button class="btn cur-p edit-btn btn-outline-success" data-toggle="modal" id="${data}" data-target="#edittraining"><i class="fa fa-pencil"></i>Edit</button>`;
                            }
                        },
                        {
                            title: 'Delete',
                            data: 'trainingName',
                            render: function (data, type, row) {
                                return `<button class="btn cur-p delete-btn btn-outline-danger" data-toggle="modal" id="${data}" data-target="#deletetraining"><i class="fa fa-trash"></i>Delete</button>`;
                            }
                        }
                    ],
                    "drawCallback": function (settings) {
                        EditTraining()
                        DeleteTraining();
                    }
    
                });
            }
            
        })
        .catch(error => {
            console.log(error);
        });

})

function EditTraining() {
    var elements = document.getElementsByClassName("edit-btn");
    Array.from(elements).forEach(element => {
        element.addEventListener("click", (e) => {
            var id = e.target.id;
            var date = ""
            var form = document.querySelector("#trainingForm")
            console.log(id)
            axios.get(`${BaseUrl}Training/name?name=${id}`)
                .then(response => {
                    date = `${response.data.data.dateOfCertificateIssuance}`
                 form.innerHTML = `
                    <div class="form-group form-float col-md-12">
                        <div class="form-line">
                            <input type="text" id="middleName" placeholder="${response.data.data.trainingName}" value="${response.data.data.trainingName}" name="existingTrainingName" class="form-control" readonly>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="form-line">
                                <input type="date" class="form-control" name="dateOfCertificateIssuance" value="${response.data.data.dateOfCertificateIssuance}" id="date" placeholder="Change Date For Certification">
                            </div>
                        </div>
                   </div>
                    <div class="form-group form-float col-md-12">
                        <div class="form-line">
                            <input type="text" id="lastName" name="trainingName" class="form-control" placeholder="New Training Name" value="${response.data.data.trainingName}">
                        </div>
                    </div>
                    <button type="submit" id="button" class="btn btn-success m-t-15 waves-effect">Edit</button>
                    `
                })

                form.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const formData = new FormData(form);
                   
                    var dateString = formData.get("dateOfCertificateIssuance");
                    var dateValue = (dateString === "" || dateString === null || 
                    dateString === undefined) ? date : new Date(dateString).toISOString();
                    console.log(date)
                    console.log(dateValue)
                    axios.put(`${BaseUrl}Training/update`, {
                        "existingTrainingName": formData.get("existingTrainingName"),
                        "trainingName": formData.get("trainingName"),
                        "dateOfCertificateIssuance": dateValue,
                    })
                    .then(response => {
                        if (response.data.succeeded) {
                            hideSpinner();
                            showNotification("bg-black", response.data.messages[0], "bottom", "left", "animated lightSpeedIn", "animated lightSpeedOut");
                           return;
                        }
                           
                    })
                    .catch(error => {
                        var prop = "name";
                        console.error(error);
                        if (error.hasOwnProperty(prop)) {
                            hideSpinner();
                            showNotification("bg-red", error.response.data.messages[0], "bottom", "right", "animated lightSpeedIn", "animated lightSpeedOut");
                        }
                        
                    })  
                })

        })
    })
} 

function DeleteTraining() {
    var elements = document.getElementsByClassName("delete-btn");
    console.log(elements.length)
    Array.from(elements).forEach(element => {
        element.addEventListener("click", (e) => {
            var id = e.target.id;
            var deleteform = document.querySelector("#deletetrainingForm")
            console.log(id);
            deleteform.innerHTML = `<p><b> Sure To Delete <i> ${id}</i></b>?</p>
            <button type="submit" class="btn btn-danger">Delete</button>`
            deleteform.addEventListener("submit", (e) =>
            {
                console.log(e);
                e.preventDefault();
                axios.put(`${BaseUrl}Training/delete`,{
                    "trainingName": id
                })
                .then(response =>{
                    if (response.data.succeeded) {
                        hideSpinner();
                        console.log("hia")
                        showNotification("bg-black", response.data.messages[0], "bottom", "left", "animated lightSpeedIn", "animated lightSpeedOut");
                        // setTimeout((window.location.reload()),1000000)
                       return;
                    }
                })
                .catch(error => {
                    var prop = "name";
                    console.error(error);
                    if (error.hasOwnProperty(prop)) {
                        hideSpinner();
                        showNotification("bg-red", error.response.data.messages[0], "bottom", "right", "animated lightSpeedIn", "animated lightSpeedOut");
                    }
                    
                })  
            })
        })
    })
}

