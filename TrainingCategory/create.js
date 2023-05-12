const [BaseUrl, form, submitBtn] = ["https://localhost:7294",
    document.querySelector("#trainingCategoryForm"), document.querySelector("#button")
];
let [loadingDiv] = [document.querySelector('#loading')];

function showSpinner() {
    loadingDiv.style.visibility = 'visible';
}

function hideSpinner() {
    loadingDiv.style.visibility = 'hidden';
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    submitBtn.style.cursor = "progress";
    axios.post(`${BaseUrl}/api/TrainingCategory/create`, {
            "name": formData.get("name")
        })
        .then(response => {

            if (response.data.succeeded) {
                hideSpinner();
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