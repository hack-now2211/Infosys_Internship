const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');

// Regular expression for password validation (at least one uppercase, one lowercase, one special char, and one number)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Password validation on input change
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;

    if (!passwordRegex.test(password)) {
        passwordError.style.display = "block";
        passwordInput.classList.add("is-invalid");
    } else {
        passwordError.style.display = "none";
        passwordInput.classList.remove("is-invalid");
    }
});

// Submit form validation before allowing sign-up
document.querySelector('.sign-up-container form').addEventListener('submit', (event) => {
    const password = passwordInput.value;

    if (!passwordRegex.test(password)) {
        event.preventDefault();
        alert("Password doesn't meet the required criteria.");
    }
});