const [BaseUrl] = ["https://localhost:7294/api/"];
let [checkedboxes, bulk] = [[], document.getElementById("bulk")]
let responseData = []
Dropzone.autoDiscover = false;
const myDropzone = new Dropzone("#my-dropzone", {
  url: `${BaseUrl}ExcelProcessor/processexcel`,
  paramName: 'file',
  maxFiles: 1,
  acceptedFiles: '.xlsx',
  dictDefaultMessage: 'Drop Excel file here or click to upload',
  init: function() {
    
    this.on('success', function(file, response) {
      console.log(response)
      responseData = Array.from(response)
      const dataTable = $('#participanttable').DataTable(
        {
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
                            columns: [1, 2, 3, 4, 5, 6, 7]
                        }
                    }
                ],
                data: response,
                columns: [
                    {
                        data: 'Full Name',
                        render: function (data, type, row) {
                            return `<input type="checkbox" background-color="black" id="${data}" class="checkbox">`
                        },
                        title: 'Select'
                    },
                    { title: 'Certificate Number', data: `${"Certificate Number"}` },
                    { title: 'Full Name', data: `${"Full Name"}` },
                    { title: 'First Name', data: `${"First Name"}` },
                    { title: 'Middle Name', data: `${"Middle Name"}` },
                    { title: 'Last Name', data: `${"Last Name"}` },
                    { title: 'Training', data: `${"Training"}` },
                    { title: 'Training Category', data: `${"Training Category"}` },
                    {
                        data: 'Date Certified',
                        title: 'Date Certified'
                    },
                    {

                        title: 'View Certificate',
                        data: 'Full Name',
                        render: function (data, type, row) {
                            return `<button class="btn cur-p view-btn btn-outline-primary" id="${data}"><i class="fa fa-eye"></i>View</button>`;
                        }
                    }
                ],
                "drawCallback": function (settings) {
                    ViewCertificate();
                     MakeBulk(response)
                }
                
        }
      );
    });
  }
});
function ViewCertificate() {
    var elements = document.getElementsByClassName("view-btn");
    console.log(elements.length)
    Array.from(elements).forEach(element => {
        element.addEventListener("click", (e) => {
            var id = e.target.id;
            console.log(id)
            element.setAttribute("disabled","disabled");
            element.style.cursor = "not-allowed";
            var data = responseData.find(obj => obj["Full Name"] === id);
            console.log(data["Date Certified"]);
            location.href = `
            certificate.html?certificateNumber=${data["Certificate Number"]}&fullName=${data["Full Name"]}
            &middleName=${data["Middle Name"]}&trainingName=${data["Training"]}
            &trainingCategory=${data["Training Category"]}&certificationDate=${data["Date Certified"]}`
        })
    })
}


function MakeBulk(participants){
    console.log(participants)
    var elements = document.getElementsByClassName("checkbox");
    var importparticipantsCertificate = [];
    Array.from(elements).forEach(checkbox => {
        checkbox.addEventListener("click", (e) =>{
            console.log(e.target.id);
            if(e.target.id !== null && e.target.id !== undefined)
            {
                checkedboxes.push(e.target.id);
                if(checkedboxes.length >= 2)
                {
                   bulk.style.display ="initial";
                   importparticipantsCertificate = participants.filter(participant => checkedboxes.includes(participant["Full Name"]));
                   console.log(importparticipantsCertificate);
                }
            }
        })
    });
    console.log(checkedboxes.length);
    bulk.addEventListener("click", (e) =>{
      bulk.setAttribute("disabled","disabled");
      bulk.style.cursor = "not-allowed";
      console.log(importparticipantsCertificate);
      localStorage.removeItem("importparticipantsCertificate");
      localStorage.setItem("importparticipantsCertificate", JSON.stringify(importparticipantsCertificate));
      location.href="bulk.html"

    })
}