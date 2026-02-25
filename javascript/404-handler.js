// ================================================
// TC Van de Merwe Logistics — 404 Error Handler
// Handles client-side 404 errors and redirects
// ================================================

(function() {
    'use strict';

    // Check if current page is 404
    function check404() {
        // If we're already on 404.html, don't do anything
        if (window.location.pathname.includes('404.html')) {
            return;
        }

        // Check for common 404 indicators
        const bodyText = document.body ? document.body.innerText.toLowerCase() : '';
        const common404Phrases = [
            '404',
            'page not found',
            'not found',
            'does not exist',
            'cannot be found'
        ];

        const is404Page = common404Phrases.some(phrase => bodyText.includes(phrase));
        
        // If page seems to be a 404 but we're not on 404.html, redirect
        if (is404Page && !window.location.pathname.includes('404.html')) {
            window.location.href = '/404.html';
            return;
        }
    }

    // Handle broken image links
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            // Replace broken images with placeholder or hide them
            e.target.style.display = 'none';
        }
    }, true);

    // Handle fetch errors (for API calls)
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        return originalFetch.apply(this, args)
            .then(response => {
                if (response.status === 404) {
                    console.warn('404 error detected:', args[0]);
                    // Optionally redirect to 404 page for API 404s
                    // window.location.href = '/404.html';
                }
                return response;
            })
            .catch(error => {
                console.error('Fetch error:', error);
                throw error;
            });
    };

    // Run check on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', check404);
    } else {
        check404();
    }
})();
