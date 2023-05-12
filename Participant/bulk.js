let [bulkholder, importparticipantsCertificate] = [document.getElementById("bulk-holder"), localStorage.getItem("importparticipantsCertificate")]

$(document).ready(() =>{
    showSpinner();
    bulkholder.style.display ="none"
});
var certificates = JSON.parse(importparticipantsCertificate);
certificates.forEach(certificate => {
    createCertificates(certificate)
})

setTimeout(() => {
    hideSpinner();
 bulkholder.style.display ="initial";
 window.print();
}, 5000)

