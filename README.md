# TC Van de Merwe Logistics — Website

## Project Structure

```
/
├── index.html          # Home page
├── about-us.html       # About Us page
├── map.html            # Coverage & Routes page
├── mailer.js           # Node.js Gmail mailer backend
├── package.json        # Node dependencies
├── .env.example        # Environment variable template
├── images/             # Logo and assets
├── styles/
│   ├── homeStyles.css  # Home page specific styles
│   ├── about-us.css    # About page specific styles
│   └── maps.css        # Map page specific styles
└── javascript/
    ├── main.js         # Shared JS — used on ALL pages (AOS, navbar, parallax)
    ├── contactForm.js  # Contact form POST handler
    └── Maps Initialization.js  # Leaflet map init (map.html only)
```

## Setting Up the Gmail Mailer

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create your `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. **Configure Gmail App Password:**
   - Enable 2-Factor Authentication on your Gmail account
   - Go to: https://myaccount.google.com/apppasswords
   - Generate a new App Password (select "Mail" + device)
   - Copy the 16-character password into `.env`

4. **Fill in `.env`:**
   ```
   GMAIL_USER=your@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   RECIPIENT_EMAIL=info@tcvdmlogistics.co.za
   PORT=3000
   ```

5. **Run the mailer:**
   ```bash
   npm start
   ```

6. **Update the frontend:** In `javascript/contactForm.js`, change `MAILER_URL` to your deployed backend URL:
   ```js
   const MAILER_URL = 'https://yourdomain.co.za/send-email';
   ```

## Deployment Notes

- The mailer backend (`mailer.js`) is a Node.js Express server — deploy on a VPS, Railway, Render, or similar.
- The HTML files are static and can be hosted on any web host (Netlify, Vercel, cPanel, etc.).
- Ensure the `MAILER_URL` in `contactForm.js` points to your live backend URL.
- Contact form submissions use **POST** — no data appears in the URL.

## Company

**TC Van de Merwe Logistics (Pty) Ltd**  
Midrand Glen, Gauteng, South Africa  
info@tcvdmlogistics.co.za
