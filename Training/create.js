const [BaseUrl, selectInput, form, submitBtn] = ["https://localhost:7294", document.querySelector("#select"),
    document.querySelector("#trainingForm"), document.querySelector("#button")
];
let [trainingCategories] = [
    []
];




axios.get(`${BaseUrl}/api/TrainingCategory/getall`)
    .then(response => {
        console.log(response);
        trainingCategories = Array.from(response.data.data);
        trainingCategories.forEach(tC => {
            selectInput.innerHTML += `<option value=${tC.id}>${tC.name}</option>`
        })
    })
    .catch(error => {
        console.log(error);
    });
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    var dateString = formData.get("dateOfCertificateIssuance");
    var dateParts = dateString.split(" ");
    var day = dateParts[1];
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var month = monthNames.indexOf(dateParts[2]) + 1;
    var year = parseInt(dateParts[3]);

    // create a new Date object with the extracted date parts
    var dateObj = new Date(year, month - 1, parseInt(day)).toISOString();
    console.log(dateObj);
    // format the date string as desired
    // var formattedDate = (dateObj.getDate()) + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();


    submitBtn.style.cursor = "progress";
    axios.post(`${BaseUrl}/api/Training/create`, {
            "name": formData.get("name"),
            "trainingCategoryId": formData.get("trainingCategoryId"),
            "dateOfCertificateIssuance": dateObj,

        })
        .then(response => {

            if (response.data.succeeded) {
                hideSpinner();
                showNotification("bg-black", response.data.messages[0], "top", "right", "animated lightSpeedIn", "animated lightSpeedOut");
            }

        }).catch(error => {
            console.error(error);
            var prop = "name"
            if (error.hasOwnProperty(prop)) {
                hideSpinner();
                showNotification("bg-red", error.response.data.messages[0], "top", "right", "animated lightSpeedIn", "animated lightSpeedOut");

            }
        })
})