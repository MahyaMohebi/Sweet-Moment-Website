document.addEventListener("DOMContentLoaded", function () {
    setMinimumBookingDate();
    createImagePreview();
    createBackToTopButton();
});


/* =========================
   BOOKING DATE
========================= */

function setMinimumBookingDate() {
    const bookingDate = document.querySelector("#booking-date");
    const cakeDate = document.querySelector("#date-needed");

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const todayValue = `${year}-${month}-${day}`;

    if (bookingDate) {
        bookingDate.min = todayValue;
    }

    if (cakeDate) {
        cakeDate.min = todayValue;
    }
}


/* =========================
   CAKE IMAGE PREVIEW
========================= */

function createImagePreview() {
    const imageInput = document.querySelector("#reference-image");

    if (!imageInput) {
        return;
    }

    const previewContainer = document.createElement("div");
    previewContainer.classList.add("image-preview");

    imageInput.insertAdjacentElement("afterend", previewContainer);

    imageInput.addEventListener("change", function () {
        const selectedFile = imageInput.files[0];

        previewContainer.innerHTML = "";

        if (!selectedFile) {
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            alert("Please upload a JPG, PNG or WebP image.");
            imageInput.value = "";
            return;
        }

        const maximumSize = 5 * 1024 * 1024;

        if (selectedFile.size > maximumSize) {
            alert("The image must be smaller than 5MB.");
            imageInput.value = "";
            return;
        }

        const previewImage = document.createElement("img");

        previewImage.src = URL.createObjectURL(selectedFile);
        previewImage.alt = "Preview of the selected cake picture";

        previewImage.addEventListener("load", function () {
            URL.revokeObjectURL(previewImage.src);
        });

        previewContainer.appendChild(previewImage);
    });
}


/* =========================
   BACK TO TOP BUTTON
========================= */

function createBackToTopButton() {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("back-to-top");
    button.setAttribute("aria-label", "Return to the top of the page");
    button.textContent = "↑";

    document.body.appendChild(button);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
            button.classList.add("back-to-top-visible");
        } else {
            button.classList.remove("back-to-top-visible");
        }
    });

    button.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================
   FORM VALIDATION
========================= */ 

const forms = document.querySelectorAll(
    ".booking-form, .custom-order-form"
);

forms.forEach(function (form) {
    const phoneInput = form.querySelector('input[name="phone"]');
    const emailInput = form.querySelector('input[name="email"]');

    /*
     * Accepts common UK numbers beginning with:
     * 01, 02, 03, 07, 08 or +44
     */
    function validateUKPhone() {
        if (!phoneInput) {
            return true;
        }

        const phoneNumber = phoneInput.value
            .trim()
            .replace(/[\s()-]/g, "");

        const ukPhonePattern =
            /^(?:(?:\+44)|0)(?:1\d{8,9}|2\d{9}|3\d{9}|7\d{9}|8\d{9})$/;

        if (!ukPhonePattern.test(phoneNumber)) {
            phoneInput.setCustomValidity(
                "Please enter a valid UK phone number, such as 07123 456789 or +44 7123 456789."
            );

            return false;
        }

        phoneInput.setCustomValidity("");

        return true;
    }


    function validateEmail() {
        if (!emailInput) {
            return true;
        }

        const emailAddress = emailInput.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailPattern.test(emailAddress)) {
            emailInput.setCustomValidity(
                "Please enter a valid email address, such as name@example.com."
            );

            return false;
        }

        emailInput.setCustomValidity("");

        return true;
    }


    /* Remove the error while the customer corrects the field */

    if (phoneInput) {
        phoneInput.addEventListener("input", validateUKPhone);
    }

    if (emailInput) {
        emailInput.addEventListener("input", validateEmail);
    }


    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const phoneIsValid = validateUKPhone();
        const emailIsValid = validateEmail();

        if (
            !phoneIsValid ||
            !emailIsValid ||
            !form.checkValidity()
        ) {
            form.reportValidity();
            return;
        }

        alert(
            "Thank you! Your request has been received. " +
            "Sweet Moments will contact you to confirm the details."
        );

        /*
         * Remove event.preventDefault() and connect the form
         * to your backend when you are ready to receive bookings.
         */
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const dialog = document.querySelector("#pastry-dialog");

    const openButton = document.querySelector(
        "#open-pastry-preview"
    );

    const closeButton = document.querySelector(
        "#close-pastry-preview"
    );

    const statusMessage = document.querySelector(
        "#pastry-status-message"
    );

    const footerYear = document.querySelector(
        "#footer-year"
    );


    /* Update Footer Year */

    if (footerYear) {
        footerYear.textContent =
            new Date().getFullYear();
    }


    /* Open Preview Dialog */

    if (dialog && openButton) {
        openButton.addEventListener("click", function () {
            dialog.showModal();
        });
    }


    /* Close Preview Dialog */

    if (dialog && closeButton) {
        closeButton.addEventListener("click", function () {
            dialog.close();
        });
    }


    /* Close When Clicking Outside The Dialog */

    if (dialog) {
        dialog.addEventListener("click", function (event) {
            const dialogArea =
                dialog.getBoundingClientRect();

            const clickedOutside =
                event.clientX < dialogArea.left ||
                event.clientX > dialogArea.right ||
                event.clientY < dialogArea.top ||
                event.clientY > dialogArea.bottom;

            if (clickedOutside) {
                dialog.close();
            }
        });
    }


    /* Rotating Preparation Messages */

    const messages = [
        "Testing new flavours...",
        "Perfecting our pastry recipes...",
        "Planning the final collection...",
        "Something sweet is almost ready..."
    ];

    let messagePosition = 0;

    if (statusMessage) {
        setInterval(function () {
            messagePosition =
                (messagePosition + 1) %
                messages.length;

            statusMessage.textContent =
                messages[messagePosition];
        }, 3000);
    }
});