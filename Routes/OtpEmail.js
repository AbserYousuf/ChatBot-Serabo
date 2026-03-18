const otpEmailHtml = (otp) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f0edff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid rgba(139,92,246,0.15);box-shadow:0 20px 60px rgba(99,102,241,0.10);">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%);padding:32px 36px;text-align:center;">
            <!-- Logo Icon -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 12px;">
              <tr>
                <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:12px;padding:10px;width:40px;height:40px;text-align:center;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" fill="white" opacity="0.9"/>
                    <circle cx="12" cy="4" r="1.8" fill="white" opacity="0.6"/>
                    <circle cx="12" cy="20" r="1.8" fill="white" opacity="0.6"/>
                    <circle cx="4" cy="12" r="1.8" fill="white" opacity="0.6"/>
                    <circle cx="20" cy="12" r="1.8" fill="white" opacity="0.6"/>
                    <line x1="12" y1="5.8" x2="12" y2="9" stroke="white" stroke-width="1.3" opacity="0.7"/>
                    <line x1="12" y1="15" x2="12" y2="18.2" stroke="white" stroke-width="1.3" opacity="0.7"/>
                    <line x1="5.8" y1="12" x2="9" y2="12" stroke="white" stroke-width="1.3" opacity="0.7"/>
                    <line x1="15" y1="12" x2="18.2" y2="12" stroke="white" stroke-width="1.3" opacity="0.7"/>
                  </svg>
                </td>
              </tr>
            </table>
            <!-- Brand Name -->
            <p style="margin:0 0 2px;font-size:24px;font-weight:700;color:#f8fafc;letter-spacing:-0.5px;">
              Serabo <span style="background:linear-gradient(135deg,#818cf8,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">AI</span>
            </p>
            <p style="margin:0;font-size:11px;color:#94a3b8;letter-spacing:3px;text-transform:uppercase;">
              Identity Verification
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 36px 28px;">
            <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1e1b4b;">
              Verify your identity
            </h2>
            <p style="margin:0 0 28px;font-size:14px;color:#64748b;line-height:1.65;">
              Use the code below to complete your password reset request. This code expires in <strong style="color:#6366f1;">10 minutes</strong>.
            </p>

            <!-- OTP Box -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.06));border-radius:16px;border:1.5px dashed rgba(99,102,241,0.3);padding:28px;text-align:center;">
                  <p style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#8b5cf6;">
                    YOUR ONE-TIME CODE
                  </p>
                  <p style="margin:0;font-size:48px;font-weight:700;letter-spacing:14px;color:#1e1b4b;font-family:'Courier New',monospace;">
                    ${otp}
                  </p>
                  <p style="margin:14px 0 0;font-size:12px;color:#94a3b8;">
                    &#9201; Expires in 10 minutes
                  </p>
                </td>
              </tr>
            </table>

            <div style="height:24px;"></div>
            <div style="border-top:1px solid rgba(139,92,246,0.12);margin-bottom:24px;"></div>

            <!-- Warning -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#fff7ed;border-radius:12px;border:1px solid #fed7aa;padding:14px 16px;">
                  <p style="margin:0;font-size:13px;color:#92400e;line-height:1.5;">
                    &#9888;&#65039; <strong>Never share this code</strong> with anyone. Serabo AI will never ask for this code via phone or chat.
                  </p>
                </td>
              </tr>
            </table>

            <div style="height:24px;"></div>
            <p style="margin:0;font-size:13px;color:#94a3b8;">
              If you didn't request this, you can safely ignore this email. Your account remains secure.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:linear-gradient(135deg,#f8f7ff,#f0edff);border-top:1px solid rgba(139,92,246,0.12);padding:20px 36px;text-align:center;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#6366f1;">Serabo AI</p>
            <p style="margin:0 0 4px;font-size:11px;color:#94a3b8;">Your intelligent AI assistant</p>
            <p style="margin:0;font-size:11px;">
              <a href="#" style="color:#8b5cf6;text-decoration:none;">Unsubscribe</a>
              &nbsp;·&nbsp;
              <a href="#" style="color:#8b5cf6;text-decoration:none;">Privacy Policy</a>
              &nbsp;·&nbsp;
              <a href="#" style="color:#8b5cf6;text-decoration:none;">Help Center</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`

module.exports = otpEmailHtml
