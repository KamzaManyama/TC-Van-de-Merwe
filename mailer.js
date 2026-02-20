require('dotenv').config();
const express  = require('express');
const nodemailer = require('nodemailer');
const cors     = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://tc-van-de-merwe.onrender.com', methods: ['GET', 'POST'] }));




app.use(express.static(__dirname));


const path = require('path');

// Gmail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// Helper — formatted South Africa timestamp
function getSATimestamp() {
    return new Date().toLocaleString('en-ZA', {
        timeZone: 'Africa/Johannesburg',
        weekday: 'long',
        year:    'numeric',
        month:   'long',
        day:     'numeric',
        hour:    '2-digit',
        minute:  '2-digit',
        hour12:  false
    }) + ' (SAST)';
}

// Internal notification email (to TC Van de Merwe staff)
function buildInternalEmail(name, email, phone, message) {
    const timestamp = getSATimestamp();
    return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
    <tr><td align="center">

      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#111111;padding:24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;vertical-align:middle;margin-right:10px;">
                    <img src="cid:company-logo" alt="TC Van de Merwe Logistics" style="height:32px;width:auto;display:inline-block;vertical-align:middle;border:0;outline:none;text-decoration:none;">
                  </span>
                  <span style="color:#ffffff;font-size:16px;font-weight:300;letter-spacing:1px;vertical-align:middle;">
                    TC VAN DE MERWE <span style="color:#FF9736;">LOGISTICS</span>
                  </span>
                </td>
                <td align="right">
                  <span style="color:#888888;font-size:11px;letter-spacing:1px;text-transform:uppercase;">New Enquiry</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Accent stripe -->
        <tr><td style="height:4px;background:linear-gradient(to right,#FF7A00,#FFBC7D);"></td></tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">

            <p style="margin:0 0 24px 0;color:#999999;font-size:12px;letter-spacing:0.5px;">
              &#128344;&nbsp; Received: <strong style="color:#666666;">${timestamp}</strong>
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:28px;">
              <tr>
                <td style="padding:12px 16px;background:#f8f8f8;border-top:1px solid #eeeeee;width:28%;vertical-align:top;">
                  <span style="font-size:11px;color:#888888;text-transform:uppercase;letter-spacing:0.8px;font-weight:bold;">Full Name</span>
                </td>
                <td style="padding:12px 16px;border-top:1px solid #eeeeee;vertical-align:top;">
                  <span style="font-size:15px;color:#111111;font-weight:600;">${name}</span>
                </td>
              </tr>

              <tr>
                <td style="padding:12px 16px;background:#f8f8f8;border-top:1px solid #eeeeee;vertical-align:top;">
                  <span style="font-size:11px;color:#888888;text-transform:uppercase;letter-spacing:0.8px;font-weight:bold;">Email</span>
                </td>
                <td style="padding:12px 16px;border-top:1px solid #eeeeee;vertical-align:top;">
                  <a href="mailto:${email}" style="color:#FF7A00;text-decoration:none;font-size:14px;">${email}</a>
                </td>
              </tr>

              <tr>
                <td style="padding:12px 16px;background:#f8f8f8;border-top:1px solid #eeeeee;vertical-align:top;">
                  <span style="font-size:11px;color:#888888;text-transform:uppercase;letter-spacing:0.8px;font-weight:bold;">Phone</span>
                </td>
                <td style="padding:12px 16px;border-top:1px solid #eeeeee;vertical-align:top;">
                  <a href="tel:${phone}" style="color:#333333;text-decoration:none;font-size:14px;">${phone}</a>
                </td>
              </tr>

              <tr>
                <td style="padding:12px 16px;background:#f8f8f8;border-top:1px solid #eeeeee;border-bottom:1px solid #eeeeee;vertical-align:top;">
                  <span style="font-size:11px;color:#888888;text-transform:uppercase;letter-spacing:0.8px;font-weight:bold;">Message</span>
                </td>
                <td style="padding:12px 16px;border-top:1px solid #eeeeee;border-bottom:1px solid #eeeeee;vertical-align:top;">
                  <p style="margin:0;font-size:14px;color:#333333;line-height:1.7;white-space:pre-line;">${message}</p>
                </td>
              </tr>
            </table>

            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#FF7A00;border-radius:3px;">
                  <a href="mailto:${email}?subject=Re: Your enquiry to TC Van de Merwe Logistics"
                     style="display:inline-block;padding:12px 28px;color:#ffffff;font-size:13px;font-weight:bold;text-decoration:none;letter-spacing:0.8px;">
                    REPLY TO ${name.toUpperCase()}
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f8f8;border-top:1px solid #eeeeee;padding:20px 32px;">
            <p style="margin:0;font-size:11px;color:#aaaaaa;line-height:1.6;">
              TC Van de Merwe Logistics (Pty) Ltd &nbsp;&middot;&nbsp; Midrand Glen, Gauteng &nbsp;&middot;&nbsp; South Africa<br>
              This notification was generated automatically via the website contact form.
            </p>
          </td>
        </tr>

      </table>

    </td></tr>
  </table>

</body>
</html>`;
}

// Auto-reply email (to the person who submitted)
function buildAutoReply(name) {
    const timestamp = getSATimestamp();
    return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
    <tr><td align="center">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#111111;padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;vertical-align:middle;margin-right:10px;">
                    <img src="cid:company-logo" alt="TC Van de Merwe Logistics" style="height:32px;width:auto;display:inline-block;vertical-align:middle;border:0;outline:none;text-decoration:none;">
                  </span>
                  <span style="color:#ffffff;font-size:17px;font-weight:300;letter-spacing:1px;vertical-align:middle;">TC VAN DE MERWE <span style="color:#FF9736;">LOGISTICS</span></span><br>
                  <span style="color:#666666;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Precision. Reliability. Integrity.</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Orange stripe -->
        <tr><td style="height:4px;background:linear-gradient(to right,#FF7A00,#FFBC7D);"></td></tr>

        <!-- Hero message -->
        <tr>
          <td style="padding:40px 32px 28px 32px;text-align:center;">
            <div style="width:56px;height:56px;background:#FFF3E0;border-radius:50%;margin:0 auto 20px auto;line-height:56px;font-size:26px;">&#10003;</div>
            <h1 style="margin:0 0 10px 0;color:#111111;font-size:24px;font-weight:300;letter-spacing:0.5px;">Thank you, ${name}.</h1>
            <p style="margin:0;color:#777777;font-size:15px;line-height:1.7;">We have received your enquiry and one of our team<br>members will be in touch with you shortly.</p>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #eeeeee;"></td></tr>

        <!-- What happens next -->
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0 0 20px 0;font-size:13px;font-weight:bold;color:#888888;text-transform:uppercase;letter-spacing:1px;">What happens next</p>
            <table width="100%" cellpadding="0" cellspacing="0">

              <tr>
                <td style="padding:10px 0;vertical-align:top;width:36px;">
                  <div style="width:28px;height:28px;background:#FF7A00;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:13px;font-weight:bold;">1</div>
                </td>
                <td style="padding:10px 0 10px 12px;vertical-align:top;border-bottom:1px solid #f2f2f2;">
                  <p style="margin:0;font-size:14px;color:#333333;font-weight:600;">Review</p>
                  <p style="margin:4px 0 0 0;font-size:13px;color:#888888;">Your message is being reviewed by our logistics team.</p>
                </td>
              </tr>

              <tr>
                <td style="padding:10px 0;vertical-align:top;">
                  <div style="width:28px;height:28px;background:#FF9736;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:13px;font-weight:bold;">2</div>
                </td>
                <td style="padding:10px 0 10px 12px;vertical-align:top;border-bottom:1px solid #f2f2f2;">
                  <p style="margin:0;font-size:14px;color:#333333;font-weight:600;">Response</p>
                  <p style="margin:4px 0 0 0;font-size:13px;color:#888888;">We will respond within 1 business day during operating hours.</p>
                </td>
              </tr>

              <tr>
                <td style="padding:10px 0;vertical-align:top;">
                  <div style="width:28px;height:28px;background:#FFBC7D;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:13px;font-weight:bold;">3</div>
                </td>
                <td style="padding:10px 0 10px 12px;vertical-align:top;">
                  <p style="margin:0;font-size:14px;color:#333333;font-weight:600;">Solution</p>
                  <p style="margin:4px 0 0 0;font-size:13px;color:#888888;">We'll tailor a freight or logistics solution to your needs.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #eeeeee;"></td></tr>

        <!-- Operating hours + contact info -->
        <tr>
          <td style="padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:50%;vertical-align:top;padding-right:16px;">
                  <p style="margin:0 0 10px 0;font-size:11px;font-weight:bold;color:#888888;text-transform:uppercase;letter-spacing:1px;">Operating Hours</p>
                  <p style="margin:0;font-size:13px;color:#444444;line-height:1.9;">
                    Mon – Fri: 07:00 – 18:00<br>
                    Saturday: 08:00 – 14:00<br>
                    Sunday: Closed<br>
                    <span style="color:#FF7A00;font-weight:bold;">24/7 Dispatch Support</span>
                  </p>
                </td>
                <td style="width:50%;vertical-align:top;padding-left:16px;border-left:1px solid #eeeeee;">
                  <p style="margin:0 0 10px 0;font-size:11px;font-weight:bold;color:#888888;text-transform:uppercase;letter-spacing:1px;">Contact Us</p>
                  <p style="margin:0;font-size:13px;color:#444444;line-height:1.9;">
                    <a href="mailto:info@tcvdmlogistics.co.za" style="color:#FF7A00;text-decoration:none;">info@tcvdmlogistics.co.za</a><br>
                    (0)11 000 0000<br>
                    Dispatch: (0)11 111 1111<br>
                    Midrand Glen, Gauteng
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Timestamp -->
        <tr>
          <td style="padding:0 32px 20px 32px;">
            <p style="margin:0;font-size:11px;color:#cccccc;">&#128344; Submitted: ${timestamp}</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#111111;padding:20px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0;font-size:11px;color:#555555;line-height:1.7;">
                    &copy; ${new Date().getFullYear()} TC Van de Merwe Logistics (Pty) Ltd. All rights reserved.<br>
                    Midrand Glen, Gauteng, South Africa &nbsp;&middot;&nbsp; VAT Registered
                  </p>
                </td>
                <td align="right">
                  <span style="font-size:20px;color:#FF7A00;letter-spacing:-2px;font-weight:bold;">&#9650;&#9650;&#9650;</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      <!-- /Card -->

    </td></tr>
  </table>

</body>
</html>`;
}

app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    const logoAttachment = {
        filename: 'logoipsum-248.svg',
        path: path.join(__dirname, 'images', 'logoipsum-248.svg'),
        cid: 'company-logo'
    };

    const internalMail = {
        from:    `"TC Van de Merwe Website" <${process.env.GMAIL_USER}>`,
        to:      process.env.RECIPIENT_EMAIL,
        replyTo: email,
        subject: `New Enquiry from ${name} — TC Van de Merwe Logistics`,
        html:    buildInternalEmail(name, email, phone, message),
        attachments: [logoAttachment]
    };

    const autoReply = {
        from:    `"TC Van de Merwe Logistics" <${process.env.GMAIL_USER}>`,
        to:      email,
        subject: `We received your enquiry — TC Van de Merwe Logistics`,
        html:    buildAutoReply(name),
        attachments: [logoAttachment]
    };

    try {
        await transporter.sendMail(internalMail);
        await transporter.sendMail(autoReply);
        res.status(200).json({ success: true, message: 'Message sent successfully.' });
    } catch (err) {
        console.error('Mailer error:', err);
        res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`TC Van de Merwe Mailer running on port ${PORT}`);
});
