import { Contact } from "../models/contact.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { STATUS_CODE, MESSAGES } from "../constants.js";

const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, phone, message } = req.body;

  const contactSave = await Contact.create({
    user: req.user?._id || null,
    name,
    email,
    subject,
    phone,
    message,
  });

  // 1️⃣ Email to Admin (You)
  const adminHtmlContent = `
  <div style="max-width:600px;margin:30px auto;padding:30px;background:#f4f6f8;border-radius:12px;font-family:'Segoe UI',Roboto,sans-serif;color:#2c3e50;box-shadow:0 10px 25px rgba(0,0,0,0.07);">
    
    <div style="text-align:center;margin-bottom:30px;">
      <h1 style="margin:0;font-size:24px;color:#2d3436;">🚀 New Contact Request</h1>
      <p style="margin-top:8px;color:#636e72;">A new message just landed in your inbox ✉️</p>
    </div>

    <div style="background:#ffffff;border-radius:10px;padding:25px;border:1px solid #e0e0e0;">
      <p style="margin:0 0 15px;"><strong style="color:#0984e3;">👤 Name:</strong> ${name}</p>
      <p style="margin:0 0 15px;"><strong style="color:#0984e3;">📧 Email:</strong> ${email}</p>
      <p style="margin:0 0 15px;"><strong style="color:#0984e3;">📱 Phone:</strong> ${phone}</p>
      <p style="margin:0 0 15px;"><strong style="color:#0984e3;">📝 Subject:</strong> ${subject}</p>

      <div style="margin-top:25px;">
        <p style="margin:0 0 8px;"><strong style="color:#0984e3;">💬 Message:</strong></p>
        <div style="background:#f1f2f6;padding:15px;border-left:4px solid #0984e3;border-radius:6px;color:#2d3436;line-height:1.5;">
          ${message}
        </div>
      </div>
    </div>

    <div style="text-align:center;margin-top:30px;font-size:12px;color:#b2bec3;">
      <p style="margin:5px 0;">This message was sent from your portfolio contact form.</p>
      <p style="margin:0;">Copyright © ${new Date().getFullYear()} | All rights reserved.</p>
    </div>
  </div>
`;

  const userHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You!</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family:'Segoe UI', Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.07);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 30px 20px;">
              <img src="https://res.cloudinary.com/dxh0utdjd/image/upload/v1751391499/eblggfznzxahwakhrw8g.png" alt="Kunal Wadile Logo" style="max-height: 40px;" />
              <h2 style="margin: 20px 0 10px; color:#111827; font-size: 24px;">Thanks for Getting in Touch!</h2>
              <p style="margin: 0; color: #6b7280; font-size: 15px;">
                Hi <strong style="color:#4c4c4c;">${name}</strong>, I truly appreciate you contacting me via my portfolio website.
              </p>
            </td>
          </tr>

          <!-- Acknowledgment -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border:none; border-top:1px solid #e5e7eb; margin: 20px 0;" />
              <p style="color:#374151; font-size:15px; line-height:1.6;">
                I’ve received your message and I’ll get back to you as soon as possible. In the meantime, feel free to check out more about my work, skills, and journey below.
              </p>
            </td>
          </tr>

          <!-- About Me -->
          <tr>
            <td style="background-color:#f9fafb; padding: 20px 40px;">
              <h3 style="margin: 0 0 10px; color:#111827;">👋 About Me</h3>
              <p style="margin: 0 0 8px; color:#4b5563; font-size: 15px; line-height: 1.6;">
                I’m <strong>Kunal Wadile</strong>, a passionate Full Stack Developer working at <strong>Appristine Technologies</strong>. I specialize in building modern, scalable web applications using technologies like Node.js, React, MongoDB, Firebase, and Next.js.
              </p>
              <p style="margin: 10px 0 0; color:#4b5563; font-size: 15px;">
                From clean UIs to robust backend APIs, I love turning ideas into production-ready apps.
              </p>
            </td>
          </tr>

          <!-- Visit Portfolio -->
          <tr>
            <td align="center" style="padding: 30px 40px;">
              <a href="https://kunalwadile.netlify.app/" style="display:inline-block; padding: 12px 24px; background-color:#2563eb; color:#ffffff; border-radius:8px; font-size:16px; text-decoration:none;">
                🌐 Visit My Portfolio
              </a>
            </td>
          </tr>

          <!-- Social Links -->
         <tr>
  <td align="center" style="padding: 0 40px 30px;">
    <p style="margin: 0 0 12px; color:#111827;">Let’s Stay Connected</p>
    <div>
      <a href="https://www.linkedin.com/in/kunal-wadile-773706258/"
         style="margin: 0 8px; text-decoration: none; color: transparent;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" width="24" />
      </a>
      <a href="https://github.com/kunalwadile-4442/"
         style="margin: 0 8px; text-decoration: none; color: transparent;">
       <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width="24" />
      </a>
      <a href="https://www.instagram.com/_kunal.wadile_/"
         style="margin: 0 8px; text-decoration: none; color: transparent;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="24" />
      </a>
    </div>
  </td>
</tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f4f4f4; padding: 20px 40px; text-align:center; font-size:13px; color:#9ca3af;">
              <p style="margin:0;">You’re receiving this email because you submitted a message on my portfolio website.</p>
              <p style="margin:5px 0 0;">© ${new Date().getFullYear()} <a href="https://kunalwadile.netlify.app/" style="color:#6b7280; text-decoration:none;">Kunal Wadile</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

  // Send email to admin (your inbox)
  await sendEmail({
    to: process.env.MAIL_TO_SEND,
    subject: `Contact Form: ${subject}`,
    html: adminHtmlContent,
  });

  // Send thank-you email to user
  await sendEmail({
    to: email,
    subject: `Thanks for contacting me, ${name}!`,
    html: userHtmlContent,
  });

  return res
    .status(STATUS_CODE.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODE.CREATED,
        { contactSave },
        MESSAGES.MAIL_SEND_SUCCESFULL
      )
    );
});

export { submitContactForm };
