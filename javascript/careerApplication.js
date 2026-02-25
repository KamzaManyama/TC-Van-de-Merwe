// ================================================
// TC Van de Merwe Logistics — Career Application Form
// Handles form submission with file upload
// ================================================

const CAREER_API_URL = '/submit-career-application';

const form = document.getElementById('careerApplicationForm');
const statusText = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form elements
        const name = document.getElementById('applicantName');
        const email = document.getElementById('applicantEmail');
        const phone = document.getElementById('applicantPhone');
        const position = document.getElementById('position');
        const coverLetter = document.getElementById('coverLetter');
        const resumeFile = document.getElementById('resumeFile');

        // Reset errors
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.classList.add('hidden');
            msg.textContent = '';
        });
        [name, email, phone, position, coverLetter, resumeFile].forEach(field => {
            field.classList.remove('border-red-500');
        });
        statusText.classList.add('hidden');
        statusText.className = 'text-sm text-center mt-4 hidden';

        // Validation
        let isValid = true;

        if (name.value.trim().length < 2) {
            showError(name, 'Please enter your full name');
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.match(emailPattern)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        const phonePattern = /^(\+?\d{1,3}[- ]?)?\d{9,12}$/;
        if (!phone.value.match(phonePattern)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        if (!position.value) {
            showError(position, 'Please select a position');
            isValid = false;
        }

        if (coverLetter.value.trim().length < 20) {
            showError(coverLetter, 'Please provide a cover letter (minimum 20 characters)');
            isValid = false;
        }

        // File validation
        if (!resumeFile.files || resumeFile.files.length === 0) {
            showError(resumeFile, 'Please upload your CV/resume');
            isValid = false;
        } else {
            const file = resumeFile.files[0];
            const maxSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

            if (file.size > maxSize) {
                showError(resumeFile, 'File size must be less than 5MB');
                isValid = false;
            } else if (!allowedTypes.includes(file.type)) {
                showError(resumeFile, 'Please upload a PDF, DOC, or DOCX file');
                isValid = false;
            }
        }

        if (!isValid) {
            statusText.textContent = 'Please correct the errors above.';
            statusText.classList.remove('hidden');
            statusText.classList.add('text-red-400');
            return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append('name', name.value.trim());
        formData.append('email', email.value.trim());
        formData.append('phone', phone.value.trim());
        formData.append('position', position.value);
        formData.append('message', coverLetter.value.trim());
        formData.append('resume', resumeFile.files[0]);

        // Loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'SUBMITTING...';
        statusText.textContent = 'Submitting your application...';
        statusText.classList.remove('hidden');
        statusText.classList.add('text-stone-400');

        try {
            const response = await fetch(CAREER_API_URL, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                statusText.textContent = 'Application submitted successfully! We will contact you within 5 business days.';
                statusText.classList.remove('text-stone-400');
                statusText.classList.add('text-green-400');
                form.reset();
                
                // Scroll to status message
                statusText.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                throw new Error(data.error || 'Server error');
            }
        } catch (err) {
            console.error('Application submission error:', err);
            statusText.textContent = 'Something went wrong. Please try again or email us directly at careers@tcvdmlogistics.co.za';
            statusText.classList.remove('text-stone-400');
            statusText.classList.add('text-red-400');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'SUBMIT APPLICATION';
        }
    });
}

function showError(field, message) {
    field.classList.add('border-red-500');
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
    }
}
