let [bulkholder, participantsCertificate] = [document.getElementById("bulk-holder"), localStorage.getItem("participantsCertificate")]

$(document).ready(() =>{
    showSpinner();
    bulkholder.style.display ="none"
});
var certificates = JSON.parse(participantsCertificate);
certificates.forEach(certificate => {
    createCertificates(certificate)
})

setTimeout(() => {
    hideSpinner();
 bulkholder.style.display ="initial";
 window.print();
}, 5000)

