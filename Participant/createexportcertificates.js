function createCertificates(certificate) {
    var certificateRecipient =  (certificate['Middle Name'] === null || certificate['Middle Name'] === "null" || certificate['Middle Name'] === "") ? certificate["Full Name"] :`${certificate["Full Name"]} ${certificate["Middle Name"]}`
    bulkholder.innerHTML += `
    <div class="certificate-container">
        <div class="auto-certificate-container-child" id="certificate-child">
            <div class="top-section">

                <img src="../images/layout_img/trainercourses.png" alt="trainer courses" class="tc">
                <img src="../images/layout_img/coht.png" alt="COHT" class="coht">

            </div>
            <div class="mid_and_bottom">
                <div class="mb-top">
                    <div class="head">
                        <p class="head-text">Approved Centre</p>
                        <p class="centre">
                            CENTRE OF HEALTHCARE TRAINING
                        </p>
                        <p class="training">
                            ${certificate["Training Category"]}
                        </p>
                    </div>
                    <div class="cert-info">
                        <p class="award-text">This Certificate Has Been Awarded To</p>
                        <p class="name" id="name">${certificateRecipient}</p>
                        <p class="attend">who attended and completed the training:</p>
                        <p class="training-text">${certificate["Training"]}</p>
                        <p class="date-text">training certificate issued on this date:</p>
                    </div>
                    <div class="date">
                        ${certificate["Date Certified"]}
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
                                <span class="cn">Certificate No:</span><span class="cert-num">${certificate["Certificate Number"]}</span>
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
        </div>
    </div>
`
}