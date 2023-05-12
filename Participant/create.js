const [BaseUrl, selectInput, form, submitBtn] = ["https://localhost:7294", document.querySelector("#select"),
    document.querySelector("#participantForm"), document.getElementById("button")
];


axios.get(`${BaseUrl}/api/Training/getall`)
    .then(response => {
        trainings = Array.from(response.data.data);
        trainings.forEach(train => {
            selectInput.innerHTML += `<option value=${train.id}>${train.trainingName}</option>`
        })
    })
    .catch(error => {
        console.log(error);
    });
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    submitBtn.style.cursor = "not-allowed";
    axios.post(`${BaseUrl}/api/Participant/create`, {
            "firstName": formData.get("firstName"),
            "lastName": formData.get("lastName"),
            "middleName": formData.get("middleName"),
            "trainingId": formData.get("trainingId"),
        })
        .then(response => {

            if (response.data.succeeded) {
                hideSpinner();
                showNotification("bg-black", response.data.messages[2], "top", "right", "animated lightSpeedIn", "animated lightSpeedOut");
                showNotification("bg-black", response.data.messages[0], "top", "right", "animated lightSpeedIn", "animated lightSpeedOut");

            }

        }).catch(error => {
            var prop = "name"
            if (error.hasOwnProperty(prop)) {
                hideSpinner();
                showNotification("bg-red", error.response.data.messages[0], "top", "right", "animated lightSpeedIn", "animated lightSpeedOut");
            }
            console.error(error);
        })
});