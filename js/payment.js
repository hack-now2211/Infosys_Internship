const paymentMode = document.getElementById("payment-mode");
const upiIdContainer = document.getElementById("upi-id-container");
const upiQrContainer = document.getElementById("upi-qr-container");
const cardContainer = document.getElementById("card-container");
const cardNumberInput = document.getElementById("card-number");
const cardHolderInput = document.getElementById("card-holder");
const expiryDateInput = document.getElementById("expiry-date");
const amountInput = document.getElementById("amount");
const upiIdInput = document.getElementById("upi-id");
const verifyUpiBtn = document.getElementById("verify-upi-btn");
const payNowBtn = document.getElementById("pay-now-btn");
const verificationStatus = document.getElementById("verification-status");

let isUpiVerified = false;
let isTransactionImageUploaded = false;



const cardNumberPreview = document.getElementById("card-number-preview");
const cardHolderPreview = document.getElementById("card-holder-preview");
const expiryDatePreview = document.getElementById("expiry-date-preview");

const expiryDateError = document.getElementById("expiryDateError");

// Update the card number preview dynamically as user types
cardNumberInput.addEventListener("input", () => {
    let cardNumber = cardNumberInput.value.replace(/\D/g, ''); // Remove non-numeric characters
    cardNumber = cardNumber.substring(0, 16); // Limit to 16 characters

    // Format the card number as XXXX XXXX XXXX XXXX
    let formattedNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    cardNumberPreview.textContent = formattedNumber || "XXXX XXXX XXXX XXXX"; // Default text when no input
});

// Update the cardholder name preview dynamically as user types
cardHolderInput.addEventListener("input", () => {
    let cardHolder = cardHolderInput.value.trim();
    cardHolderPreview.textContent = cardHolder || "Cardholder Name"; // Default text when no input
});

// Update the expiry date preview dynamically as user types
expiryDateInput.addEventListener("input", () => {
    let expiryDate = expiryDateInput.value.trim();
    if (expiryDate.length === 2) {
        expiryDate = expiryDate + '/'; // Add slash after MM
    }
    expiryDatePreview.textContent = expiryDate || "MM/YY"; // Default text when no input
});

// Validate the expiry date for MM/YY format and ensure it's not expired
expiryDateInput.addEventListener("blur", () => {
    const expiryValue = expiryDateInput.value.trim();

    // Validate format MM/YY
    const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    const match = expiryValue.match(regex);

    if (!match) {
        expiryDateError.textContent = "Invalid date format. Use MM/YY.";
        expiryDateError.classList.remove("d-none");
        expiryDateInput.classList.add("is-invalid");
        return;
    }

    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10);

    // Get current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Get current month (1-based)

    // Ensure the year is not in the past
    const expiryYear = 2000 + year; // Convert YY to full year (20YY)

    if (expiryYear < currentYear || (expiryYear === currentYear && month < currentMonth)) {
        expiryDateError.textContent = "The expiry date cannot be in the past.";
        expiryDateError.classList.remove("d-none");
        expiryDateInput.classList.add("is-invalid");
    } else {
        expiryDateError.classList.add("d-none");
        expiryDateInput.classList.remove("is-invalid");
    }
});



// UPI ID Pattern (Simple validation)
const upiPattern = /^[\w.-]+@[\w]+$/;

// UPI ID verification
verifyUpiBtn.addEventListener("click", () => {
    const upiId = upiIdInput.value.trim();
    if (!upiPattern.test(upiId)) {
        verificationStatus.textContent = "Invalid UPI ID.";
        verificationStatus.style.color = "red";
        isUpiVerified = false;
    } else {
        verificationStatus.textContent = "Verifying...";
        setTimeout(() => {
            if (upiId === "edu@okaxis") {
                verificationStatus.textContent = "UPI ID Verified";
                verificationStatus.style.color = "green";
                isUpiVerified = true;
            } else {
                verificationStatus.textContent = "UPI ID not found.";
                verificationStatus.style.color = "red";
                isUpiVerified = false;
            }
        }, 1000);
    }
});

// Payment Mode Selection
paymentMode.addEventListener("change", function() {
    const selectedMode = this.value;
    resetForm();

    if (selectedMode === "upi-id") {
        upiIdContainer.classList.remove("d-none");
    } else if (selectedMode === "upi-qr") {
        upiQrContainer.classList.remove("d-none");
    } else if (selectedMode === "card") {
        cardContainer.classList.remove("d-none");
    }
});

// Real-time updates for the virtual card
cardNumberInput.addEventListener("input", () => {
    virtualCardNumber.textContent =
        cardNumberInput.value.padEnd(16, "X").match(/.{1,4}/g).join(" ") || "XXXX XXXX XXXX XXXX";
});

cardHolderInput.addEventListener("input", () => {
    virtualCardHolder.textContent = cardHolderInput.value || "Cardholder Name";
});

expiryDateInput.addEventListener("input", () => {
    virtualExpiryDate.textContent = expiryDateInput.value || "MM/YY";
});

// Reset form
function resetForm() {
    upiIdContainer.classList.add("d-none");
    upiQrContainer.classList.add("d-none");
    cardContainer.classList.add("d-none");
    verificationStatus.textContent = "";
    amountInput.value = "";
    payNowBtn.disabled = true;
    isUpiVerified = false;
    isTransactionImageUploaded = false;
}

// Amount field validation
amountInput.addEventListener("input", validateForm);
cardNumberInput.addEventListener("input", validateForm);
cardHolderInput.addEventListener("input", validateForm);
expiryDateInput.addEventListener("input", validateForm);
upiIdInput.addEventListener("input", validateForm);

// Form Validation function
function validateForm() {
    const amount = amountInput.value.trim();
    const cardNumber = cardNumberInput.value.trim();
    const cardHolder = cardHolderInput.value.trim();
    const expiryDate = expiryDateInput.value.trim();
    const upiId = upiIdInput.value.trim();

    let isValid = false;

    if (paymentMode.value === "upi-id") {
        isValid = upiId && isUpiVerified && amount;
    } else if (paymentMode.value === "upi-qr") {
        isValid = isTransactionImageUploaded && amount;
    } else if (paymentMode.value === "card") {
        isValid = cardNumber.length === 16 && cardHolder && expiryDate.length === 5 && amount;
    }

    payNowBtn.disabled = !isValid;
}

// Handle file upload for UPI QR
const fileInput = document.getElementById("transaction-image");
fileInput.addEventListener("change", () => {
    isTransactionImageUploaded = fileInput.files.length > 0;
    validateForm();
});

// Submit payment form
payNowBtn.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Payment Successful!");
});