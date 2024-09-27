const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

const form = document.getElementById('signupForm');
const formSummary = document.getElementById('formSummary');
const summaryContent = document.getElementById('summaryContent');

// Function to update form summary
function updateFormSummary() {
    const formData = new FormData(form);
    let summaryHTML = '';
    for (let [key, value] of formData.entries()) {
        if (key !== 'password') {
            summaryHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }
    }
    summaryContent.innerHTML = summaryHTML;
    formSummary.style.display = 'block';
}

// Update form summary in real-time as user makes changes
form.addEventListener('input', updateFormSummary);


// Function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Function to validate age
function validateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= 18 && age <= 100;
}

// Function to display error message
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    input.classList.add('error');
}

// Function to clear error message
function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    input.classList.remove('error');
}

// Function to validate a specific input
function validateInput(input) {
    if (input.required && !input.value.trim()) {
        showError(input, 'This field is required');
        return false;
    } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
        showError(input, 'Please enter a valid email address');
        return false;
    } else if (input.type === 'tel' && input.value.trim() && !/^\d{10}$/.test(input.value)) {
        showError(input, 'Please enter a valid 10-digit phone number');
        return false;
    } else if (input.name === 'password' && input.value.trim() && input.value.length < 8) {
        showError(input, 'Password must be at least 8 characters long');
        return false;
    } else if (input.type === 'date' && input.value.trim() && !validateAge(input.value)) {
        showError(input, 'You must be between 18 and 100 years old');
        return false;
    } else {
        clearError(input);
        return true;
    }
}

form.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', function() {
        validateInput(this);
        updateFormSummary();
    });
});

// Function to validate a page
function validatePage(pageIndex) {
    const currentPage = document.querySelectorAll('.page')[pageIndex];
    const inputs = currentPage.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        if (input.required && !input.value) {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        } else if (!validateInput(input)) {
            isValid = false;
        }else {
            clearError(input);
        }
    });

    return isValid;
}

// Function to update form summary
function updateFormSummary() {
    const formData = new FormData(form);
    let summaryHTML = '';
    for (let [key, value] of formData.entries()) {
        if (key !== 'password') {
            summaryHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }
    }
    summaryContent.innerHTML = summaryHTML;
    formSummary.style.display = 'block';
}

// Event listeners for next buttons
nextBtnFirst.addEventListener("click", function(event){
    event.preventDefault();
    if (validatePage(0)) {
        slidePage.style.marginLeft = "-25%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
        updateFormSummary();
    }
});

nextBtnSec.addEventListener("click", function(event){
    event.preventDefault();
    if (validatePage(1)) {
        slidePage.style.marginLeft = "-50%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
        updateFormSummary();
    }
});

nextBtnThird.addEventListener("click", function(event){
    event.preventDefault();
    if (validatePage(2)) {
        slidePage.style.marginLeft = "-75%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
        updateFormSummary();
    }
});

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validatePage(3)) {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
        updateFormSummary();
        setTimeout(function(){
            alert("Hooray! You Have Successfully Signed up");
            // You can add code here to send the form data to a server if needed
        }, 800);
    }
});

// Event listeners for previous buttons
prevBtnSec.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "0%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});

prevBtnThird.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-25%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});

prevBtnFourth.addEventListener("click", function(event){
    event.preventDefault();
    slidePage.style.marginLeft = "-50%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});

// Real-time validation for email field
const emailInput = form.querySelector('input[name="email"]');
emailInput.addEventListener('input', function() {
    if (this.value && !validateEmail(this.value)) {
        showError(this, 'Please enter a valid email address');
    } else {
        clearError(this);
    }
});
// Real-time validation for date of birth field
const dobInput = form.querySelector('input[name="DOB"]');
dobInput.addEventListener('input', function() {
    validateInput(this);
});

// Update form summary in real-time as user makes changes
form.addEventListener('input', updateFormSummary);