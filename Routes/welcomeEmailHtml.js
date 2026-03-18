const welcomeEmailHtml = (name) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f0edff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid rgba(139,92,246,0.15);box-shadow:0 20px 60px rgba(99,102,241,0.10);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%);padding:32px 36px;text-align:center;">
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 12px;">
              <tr>
                <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:12px;padding:10px;text-align:center;">
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
            <p style="margin:0 0 2px;font-size:24px;font-weight:700;color:#f8fafc;letter-spacing:-0.5px;">Serabo AI</p>
            <p style="margin:0;font-size:11px;color:#94a3b8;letter-spacing:3px;text-transform:uppercase;">Welcome Aboard</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 36px 28px;">

            <!-- Greeting -->
            <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1e1b4b;">
              Hey ${name}! 👋
            </h2>
            <p style="margin:0 0 24px;font-size:14px;color:#64748b;line-height:1.7;">
              Welcome to <strong style="color:#6366f1;">Serabo AI</strong> — your intelligent assistant built for research, analysis, and everything in between. We're thrilled to have you!
            </p>

            <!-- Features -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.06));border-radius:16px;border:1px solid rgba(99,102,241,0.12);padding:24px;">
                  <p style="margin:0 0 16px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#8b5cf6;">What you can do</p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid rgba(139,92,246,0.08);">
                        <span style="font-size:16px;">🧠</span>
                        <span style="font-size:13.5px;color:#1e1b4b;font-weight:500;margin-left:10px;">Ask anything — research, code, analysis</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid rgba(139,92,246,0.08);">
                        <span style="font-size:16px;">💬</span>
                        <span style="font-size:13.5px;color:#1e1b4b;font-weight:500;margin-left:10px;">Save and manage chat sessions</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;">
                        <span style="font-size:16px;">⚡</span>
                        <span style="font-size:13.5px;color:#1e1b4b;font-weight:500;margin-left:10px;">Get instant intelligent responses</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- CTA Button -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="https://sereboaai-two.vercel.app/chat" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;text-decoration:none;border-radius:12px;font-size:14.5px;font-weight:600;letter-spacing:0.3px;box-shadow:0 4px 15px rgba(99,102,241,0.4);">
                    Start Chatting →
                  </a>
                </td>
              </tr>
            </table>

            <div style="height:24px;"></div>
            <div style="border-top:1px solid rgba(139,92,246,0.12);margin-bottom:24px;"></div>

            <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
              If you have any questions or need help getting started, just reply to this email. We're always here to help.
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

module.exports = welcomeEmailHtml
