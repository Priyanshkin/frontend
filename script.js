const qrType = document.getElementById("qrType");

const qrData = document.getElementById("qrData");

const inputLabel = document.getElementById("inputLabel");

const errorMessage = document.getElementById("errorMessage");

const qrImage = document.getElementById("qrImage");

const downloadBtn = document.getElementById("downloadBtn");

const placeholder = document.getElementById("placeholder");


/*
Change input label and placeholder
when QR type changes
*/

qrType.addEventListener("change", function () {

    const type = qrType.value;


    if (type === "WEBSITE") {

        inputLabel.innerText = "Enter Website URL";

        qrData.placeholder = "https://example.com";
    }


    else if (type === "TEXT") {

        inputLabel.innerText = "Enter Your Text";

        qrData.placeholder = "Hello World";
    }


    else if (type === "PHONE") {

        inputLabel.innerText = "Enter Phone Number";

        qrData.placeholder = "9876543210";
    }


    else if (type === "EMAIL") {

        inputLabel.innerText = "Enter Email Address";

        qrData.placeholder = "example@gmail.com";
    }


    qrData.value = "";

});

async function generateQR() {

    const type = qrType.value;
    const data = qrData.value.trim();

    errorMessage.style.display = "none";


    // Empty validation
    if (data === "") {

        errorMessage.innerText =
            "Please enter some information.";

        errorMessage.style.display = "block";

        return;
    }


    // PHONE validation
    if (type === "PHONE") {

        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(data)) {

            errorMessage.innerText =
                "Please enter a valid 10-digit phone number.";

            errorMessage.style.display = "block";

            return;
        }
    }


    // EMAIL validation
    if (type === "EMAIL") {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(data)) {

            errorMessage.innerText =
                "Please enter a valid email address.";

            errorMessage.style.display = "block";

            return;
        }
    }


    // WEBSITE validation
    if (type === "WEBSITE") {

        try {

            new URL(data);

        } catch (error) {

            errorMessage.innerText =
                "Please enter a valid website URL.";

            errorMessage.style.display = "block";

            return;
        }
    }


    // If validation passes, call API
    try {

        const response = await fetch(

            "https://demo-production-755d.up.railway.app/api/qr",

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    type: type,
                    url: data
                })

            }
        );


        if (!response.ok) {

            throw new Error(
                "QR generation failed"
            );
        }


        const imageBlob = await response.blob();

        const imageUrl =
            URL.createObjectURL(imageBlob);


        qrImage.src = imageUrl;

        qrImage.style.display = "block";

        placeholder.style.display = "none";

        downloadBtn.style.display = "block";

    }

    catch (error) {

        errorMessage.innerText =
            "Something went wrong. Please try again.";

        errorMessage.style.display = "block";

        console.error(error);
    }
}
function downloadQR() {

    const link =
        document.createElement("a");


    link.href = qrImage.src;

    link.download = "my-qr-code.png";


    link.click();
}