const [BaseUrl, categoryTable, tablebody] = ["https://localhost:7294/api/", document.querySelector('#categorytable'),
    document.querySelector("#tablebody")];


$(document).ready(function () {
    showSpinner();
    axios.get(`${BaseUrl}TrainingCategory/getall`)
        .then(response => {
            if(response.data.succeeded){
                hideSpinner();
                $('#categorytable').DataTable({
                    order: [[0, 'asc']],
                    dom: 'Bfrtip',
                    responsive: true,
                    buttons: [
                        {
                            extend: 'copy',
                            text: 'Copy Data',
                            title: '',
                            exportOptions: {
                                columns: [0] 
                            }
                        },
                        {
                            extend: 'print',
                            text: 'Print Data',
                            title: '',
                            exportOptions: {
                                columns: [0] 
                            }
                        },
                        {
                            extend: 'excelHtml5',
                            text: 'Export to Excel',
                            title: '',
                            exportOptions: {
                                columns: [0] 
                            }
                        },
                        {
                            extend: 'csvHtml5',
                            text: 'Export to CSV',
                            title: '',
                            exportOptions: {
                                columns: [0] 
                            }
                        }
                    ],
                    data: response.data.data,
                    columns: [
                        { title: 'Name', data: `${"name"}` },
                        
                        {
                            title: 'Edit',
                            data: 'name',
                            render: function (data, type, row) {
                                return `<button class="btn cur-p edit-btn btn-outline-success" data-toggle="modal" id="${data}" data-target="#editcategory"><i class="fa fa-pencil"></i>Edit</button>`;
                            }
                        },
                        {
                            title: 'Delete',
                            data: 'name',
                            render: function (data, type, row) {
                                return `<button class="btn cur-p delete-btn btn-outline-danger" data-toggle="modal" id="${data}" data-target="#deletecategory"><i class="fa fa-trash"></i>Delete</button>`;
                            }
                        }
                    ],
                    "drawCallback": function (settings) {
                        EditCategory()
                        DeleteCategory();
                    }
    
                });
            }

        })
        .catch(error => {
            console.log(error);
        });

})

function EditCategory() {
    var elements = document.getElementsByClassName("edit-btn");
    Array.from(elements).forEach(element => {
        element.addEventListener("click", (e) => {
            var id = e.target.id;
            var form = document.querySelector("#categoryForm")
            console.log(id)
            axios.get(`${BaseUrl}TrainingCategory/name?name=${id}`)
                .then(response => {
                 form.innerHTML = `
                    <div class="form-group form-float col-md-12">
                        <div class="form-line">
                            <input type="text"  placeholder="${response.data.data.name}" value="${response.data.data.name}" name="existingName" class="form-control" readonly>
                        </div>
                    </div>
                   
                    <div class="form-group form-float col-md-12">
                        <div class="form-line">
                            <input type="text"  name="name" class="form-control" placeholder="New Training Category Name" value="${response.data.data.name}">
                        </div>
                    </div>
                    <button type="submit" id="button" class="btn btn-success m-t-15 waves-effect">Edit</button>
                    `
                })

                form.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const formData = new FormData(form);
                    axios.put(`${BaseUrl}TrainingCategory/update`, {
                        "existingName": formData.get("existingName"),
                        "name": formData.get("name"),
                        
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

function DeleteCategory() {
    var elements = document.getElementsByClassName("delete-btn");
    console.log(elements.length)
    Array.from(elements).forEach(element => {
        element.addEventListener("click", (e) => {
            var id = e.target.id;
            var deleteform = document.querySelector("#deletecategoryForm")
            console.log(id);
            deleteform.innerHTML = `<p><b> Sure To Delete <i> ${id}</i></b>?</p>
            <button type="submit" class="btn btn-danger">Delete</button>`
            deleteform.addEventListener("submit", (e) =>
            {
                console.log(e);
                e.preventDefault();
                axios.put(`${BaseUrl}TrainingCategory/delete`,{
                    "trainingCategoryName": id
                })
                .then(response =>{
                    if (response.data.succeeded) {
                        hideSpinner();
                        console.log("hia")
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

