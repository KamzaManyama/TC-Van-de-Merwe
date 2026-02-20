// ================================================
// TC Van de Merwe Logistics — Contact Form JS
// Sends via POST to mailer.js backend (no data in URL)
// ================================================

// Update MAILER_URL to your deployed backend endpoint
const MAILER_URL = 'http://localhost:3000/send-email'; 

const form = document.getElementById('contactForm');
const statusText = document.getElementById('formStatus');

if (form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name    = document.getElementById('name');
        const email   = document.getElementById('email');
        const phone   = document.getElementById('phone');
        const message = document.getElementById('message');
        const btn     = form.querySelector('button[type="submit"]');

        // Reset
        [name, email, phone, message].forEach(f => f.classList.remove('border-red-500'));
        statusText.textContent = '';
        statusText.className = 'text-sm mt-4 text-center';

        let isValid = true;

        if (name.value.trim().length < 3) {
            name.classList.add('border-red-500');
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.match(emailPattern)) {
            email.classList.add('border-red-500');
            isValid = false;
        }

        const phonePattern = /^(\+?\d{1,3}[- ]?)?\d{9,10}$/;
        if (!phone.value.match(phonePattern)) {
            phone.classList.add('border-red-500');
            isValid = false;
        }

        if (message.value.trim().length < 10) {
            message.classList.add('border-red-500');
            isValid = false;
        }

        if (!isValid) {
            statusText.textContent = 'Please complete all fields correctly.';
            statusText.classList.add('text-red-400');
            return;
        }

        // Loading state
        btn.disabled = true;
        btn.textContent = 'SENDING...';
        statusText.textContent = 'Sending message...';
        statusText.classList.add('text-stone-400');

        try {
            const response = await fetch(MAILER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name:    name.value.trim(),
                    email:   email.value.trim(),
                    phone:   phone.value.trim(),
                    message: message.value.trim()
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                statusText.textContent = 'Message sent successfully. We will contact you shortly.';
                statusText.classList.remove('text-stone-400');
                statusText.classList.add('text-green-400');
                form.reset();
            } else {
                throw new Error(data.error || 'Server error');
            }
        } catch (err) {
            statusText.textContent = 'Something went wrong. Please try again or call us directly.';
            statusText.classList.remove('text-stone-400');
            statusText.classList.add('text-red-400');
        } finally {
            btn.disabled = false;
            btn.textContent = 'SEND MESSAGE';
        }
    });
}
