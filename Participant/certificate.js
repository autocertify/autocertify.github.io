var [certificateChild] = [document.getElementById("certificate-child")];
const urlParams = new URLSearchParams(window.location.search);
console.log(window.location.search)
// Extract the values
const fullName = urlParams.get('fullName');
const middleName = urlParams.get('middleName');
const certificateNumber = urlParams.get('certificateNumber');
const trainingCategory = urlParams.get('trainingCategory');
const trainingName = urlParams.get('trainingCategory');
const certifiedDate = urlParams.get('certificationDate');
var certificateRecipient = middleName === "null" ? fullName :`${fullName} ${middleName}`
console.log(fullName, middleName, trainingCategory);
certificateChild.innerHTML +=`<div class="mid_and_bottom">
<div class="mb-top">
    <div class="head">
        <p class="head-text">Approved Centre</p>
        <p class="centre">
            CENTRE OF HEALTHCARE TRAINING
        </p>
        <p class="training">
            ${trainingCategory}
        </p>
    </div>
    <div class="cert-info">
        <p class="award-text">This Certificate Has Been Awarded To</p>
        <p class="name" id="name">${certificateRecipient}</p>
        <p class="attend">who attended and completed the training:</p>
        <p class="training-text">${trainingName}</p>
        <p class="date-text">training certificate issued on this date:</p>
    </div>
    <div class="date">
        ${certifiedDate}
    </div>
</div>
<div class="mb-bottom">
    <div class="trainer-info-and-logo">
        <div class="trainer-info-and-cert">
            <div class="trainer">
                <p class="rt">Registered Trainer</p>
                <p class="rtn">Derick Bamiebu</p>
                <p class="rts">bkderick</p>
            </div>
            <div class="cert-details">
                <span class="cn">Certificate No:</span><span class="cert-num">${certificateNumber}</span>
            </div>
        </div>

        <img src="../images/layout_img/tc.png" alt="" class="logo">

    </div>
    <div class="end-text">
        <p class="area">
            Areas covered by the training are contained on the reverse of this certificate. This accredited certificate
            <br> is issued under the <strong>Trainer Courses Ltd External Quality Assured Moderation Process</strong>.
        </p>
        <p class="issue">Certificate requires update 1 year from date of issue.</p>

    </div>
</div>
</div>
<button class="btn cur-p view-btn btn-outline-primary" id="print-btn"><i class="fa fa-print"></i>Print</button>

</div>
`

var printButton = document.getElementById("print-btn");
printButton.addEventListener("click", () => {
    window.print()
})