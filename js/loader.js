let [loadingDiv] = [
    document.getElementById('loading')
];

function showSpinner() {
    loadingDiv.style.visibility = 'visible';
    // console.log(loadingDiv.style)
}

function hideSpinner() {
    loadingDiv.style.visibility = 'hidden';
}