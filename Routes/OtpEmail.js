const otpEmailHtml = (otp) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">

        <!-- Header -->
        <tr>
          <td style="background:#0f172a;padding:28px 36px;text-align:center;">
            <span style="font-size:20px;font-weight:700;color:#f8fafc;letter-spacing:1px;">
              Your<span style="color:#60a5fa;">App</span>
            </span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 36px 28px;">
            <h2 style="margin:0 0 8px;font-size:20px;font-weight:600;color:#0f172a;font-family:Arial,sans-serif;">
              Verify your identity
            </h2>
            <p style="margin:0 0 28px;font-size:14px;color:#64748b;line-height:1.65;font-family:Arial,sans-serif;">
              Use the code below to complete your request. This code is valid for <strong>10 minutes</strong>.
            </p>

            <!-- OTP Box -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#f1f5f9;border-radius:12px;border:1px dashed #cbd5e1;padding:24px;text-align:center;margin-bottom:28px;">
                  <p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#94a3b8;font-family:Arial,sans-serif;">
                    YOUR ONE-TIME CODE
                  </p>
                  <p style="margin:0;font-size:42px;font-weight:700;letter-spacing:12px;color:#0f172a;font-family:'Courier New',monospace;">
                    ${otp}
                  </p>
                  <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;font-family:Arial,sans-serif;">
                    &#9201; Expires in 10 minutes
                  </p>
                </td>
              </tr>
            </table>

            <div style="height:24px;"></div>

            <!-- Divider -->
            <div style="border-top:1px solid #e2e8f0;margin-bottom:24px;"></div>

            <!-- Warning -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#fff7ed;border-radius:10px;border:1px solid #fed7aa;padding:14px 16px;">
                  <p style="margin:0;font-size:13px;color:#92400e;line-height:1.5;font-family:Arial,sans-serif;">
                    &#9888;&#65039; <strong>Never share this code</strong> with anyone. YourApp will never ask for this code via phone or chat.
                  </p>
                </td>
              </tr>
            </table>

            <div style="height:24px;"></div>

            <p style="margin:0;font-size:13px;color:#94a3b8;font-family:Arial,sans-serif;">
              If you didn't request this, you can safely ignore this email.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 36px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;font-family:Arial,sans-serif;">YourApp Inc. · 123 Main Street, City</p>
            <p style="margin:0;font-size:12px;font-family:Arial,sans-serif;">
              <a href="#" style="color:#60a5fa;text-decoration:none;">Unsubscribe</a>
              &nbsp;·&nbsp;
              <a href="#" style="color:#60a5fa;text-decoration:none;">Privacy Policy</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`