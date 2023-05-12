const [BaseUrl, participantTable, tablebody] = ["https://localhost:7294/api/", document.querySelector('#participanttable'),
    document.querySelector("#tablebody")];
let [checkedboxes, bulk] = [[], document.getElementById("bulk")]


$(document).ready(function () {
  showSpinner();
    axios.get(`${BaseUrl}Participant/getall`)
        .then(response => {
            if(response.data.succeeded){
                hideSpinner()
                $('#participanttable').DataTable({
                    order: [[1, 'asc']],
                    dom: 'Bfrtip',
                    responsive: true,
                    buttons: [
                        {
                            extend: 'copy',
                            text: 'Copy Data',
                            title: '',
                            exportOptions: {
                                columns: [1, 2, 3, 4, 5, 6, 7, 8] 
                            }
                        },
                        {
                            extend: 'print',
                            text: 'Print Data',
                            title: '',
                            exportOptions: {
                                columns: [1, 2, 3, 4, 5, 6, 7, 8]
                            }
                        },
                        {
                            extend: 'excelHtml5',
                            text: 'Export to Excel',
                            title: '',
                            exportOptions: {
                                columns: [1, 2, 3, 4, 5, 6, 7, 8]
                            }
                        },
                        {
                            extend: 'csvHtml5',
                            text: 'Export to CSV',
                            title: '',
                            exportOptions: {
                                columns: [1, 2, 3, 4, 5, 6, 7, 8]
                            }
                        }
                    ],
                    data: response.data.data,
                    columns: [
                        {
                            data: 'fullName',
                            render: function (data, type, row) {
                                return `<input type="checkbox" background-color="black" id="${data}" class="checkbox">`
                            },
                            title: 'Select'
                        },
                        { title: 'Certificate Number', data: `${"certificateNumber"}` },
                        { title: 'Full Name', data: `${"fullName"}` },
                        { title: 'First Name', data: `${"firstName"}` },
                        { title: 'Middle Name', data: `${"middleName"}` },
                        { title: 'Last Name', data: `${"lastName"}` },
                        { title: 'Training', data: `${"training.trainingName"}` },
                        { title: 'Training Category', data: `${"trainingCategory.name"}` },
                        {
                            data: 'training.dateOfCertificateIssuance',
                            render: function (data, type, row) {
                                return dateformatter(row.training.dateOfCertificateIssuance);
                            },
                            title: 'Date Certified'
                        },
                        {
                            title: 'Edit',
                            data: 'fullName',
                            render: function (data, type, row) {
                                return `<button class="btn cur-p edit-btn btn-outline-success" data-toggle="modal" id="${data}" data-target="#editparticipant"><i class="fa fa-pencil"></i>Edit</button>`;
                            }
                        },
                        {
    
                            title: 'View Certificate',
                            data: 'fullName',
                            render: function (data, type, row) {
                                return `<button class="btn cur-p view-btn btn-outline-primary" id="${data}"><i class="fa fa-eye"></i>View</button>`;
                            }
                        },
                        {
                            title: 'Delete',
                            data: 'fullName',
                            render: function (data, type, row) {
                                return `<button class="btn cur-p delete-btn btn-outline-danger" data-toggle="modal" id="${data}" data-target="#deleteparticipant"><i class="fa fa-trash"></i>Delete</button>`;
                            }
                        }
                    ],
                    "drawCallback": function (settings) {
                        EditParticipant()
                        DeleteParticipant();
                        ViewCertificate();
                        MakeBulk(Array.from(response.data.data))
                    }
    
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

})

function EditParticipant() {
    var elements = document.getElementsByClassName("edit-btn");
    Array.from(elements).forEach(element => {
        element.addEventListener("click", (e) => {
            var id = e.target.id;
            var form = document.querySelector("#participantForm")
            console.log(id)
            axios.get(`${BaseUrl}Participant/name?fullName=${id}`)
                .then(response => {
                 form.innerHTML = `
                    <div class="form-group form-float col-md-12">
                        <div class="form-line">
                            <input type="text" id="edit-fullName" placeholder=${response.data.data.fullName} value="${response.data.data.fullName}" name="existingFullName" class="form-control" required readonly>
                        </div>
                   </div>
                    <div class="form-group form-float col-md-12">
                        <div class="form-line">
                            <input type="text" id="firstName" placeholder="${response.data.data.firstName}" value="${response.data.data.firstName}"  name="firstName" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-group form-float col-md-12">
                        <div class="form-line">
                            <input type="text" id="middleName" placeholder="${response.data.data.middleName}" value="${response.data.data.middleName}" name="middleName" class="form-control">
                        </div>
                    </div>
                    <div class="form-group form-float col-md-12">
                        <div class="form-line">
                            <input type="text" id="lastName" name="lastName" class="form-control" placeholder="${response.data.data.lastName}" value="${response.data.data.lastName}">
                        </div>
                    </div>
                    <button type="submit" id="button" class="btn btn-success m-t-15 waves-effect">Edit</button>
                    `
                })

                form.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const formData = new FormData(form);
                    axios.put(`${BaseUrl}Participant/update`, {
                        "existingFullName": formData.get("existingFullName"),
                        "firstName": formData.get("firstName"),
                        "lastName": formData.get("lastName"),
                        "middleName": formData.get("middleName"),
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

function DeleteParticipant() {
    var elements = document.getElementsByClassName("delete-btn");
    console.log(elements.length)
    Array.from(elements).forEach(element => {
        element.addEventListener("click", (e) => {
            var id = e.target.id;
            var deleteform = document.querySelector("#deleteparticipantForm")
            console.log(id);
            deleteform.innerHTML = `<p><b> Sure To Delete <i> ${id}</i></b>?</p>
            <button type="submit" class="btn btn-danger">Delete</button>`
            deleteform.addEventListener("submit", (e) =>
            {
                console.log(e);
                e.preventDefault();
                axios.put(`${BaseUrl}Participant/delete`,{
                    "fullName": id
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
function ViewCertificate() {
    var elements = document.getElementsByClassName("view-btn");
    console.log(elements.length)
    Array.from(elements).forEach(element => {
        element.addEventListener("click", (e) => {
            var id = e.target.id;
            element.setAttribute("disabled","disabled");
            element.style.cursor = "not-allowed";
            axios.get(`${BaseUrl}Participant/name?fullName=${id}`)
                .then(response => {
                    if(response.data.succeeded)
                    {
                        location.href = `
                        certificate.html?certificateNumber=${response.data.data.certificateNumber}&fullName=${response.data.data.fullName}
                        &middleName=${response.data.data.middleName}&trainingName=${response.data.data.training.trainingName}
                        &trainingCategory=${response.data.data.trainingCategory.name}&certificationDate=${dateformatter(response.data.data.training.dateOfCertificateIssuance)}`
                    }
                })
            
            
        })
    })
}
function MakeBulk(participants){
    var elements = document.getElementsByClassName("checkbox");
    var participantsCertificate = [];
    Array.from(elements).forEach(checkbox => {
        checkbox.addEventListener("click", (e) =>{
            console.log(e.target.id);
            if(e.target.id !== null && e.target.id !== undefined)
            {
                checkedboxes.push(e.target.id);
                if(checkedboxes.length >= 2)
                {
                   bulk.style.display ="initial";
                   participantsCertificate = participants.filter(participant => checkedboxes.includes(participant.fullName));
                   console.log(participantsCertificate);
                }
            }
        })
    });
    console.log(checkedboxes.length);
    bulk.addEventListener("click", (e) =>{
      bulk.setAttribute("disabled","disabled");
      bulk.style.cursor = "not-allowed";
      console.log(participantsCertificate);
      localStorage.removeItem("participantsCertificate");
      localStorage.setItem("participantsCertificate", JSON.stringify(participantsCertificate));
      location.href="bulkcertificates.html"

    })
}
