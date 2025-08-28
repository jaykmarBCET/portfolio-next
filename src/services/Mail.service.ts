import {MailtrapClient} from "mailtrap"

const client  = new MailtrapClient({
    token:process.env.MAILTRAP_TOKEN!
})



export const SendMail = ({ message, name,email }: { message: string; name: string,email:string }) => {
  const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };
  const recipients = [
    {
      email: "jaykumar2dear@gmail.com",
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: name,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
            
            <div style="background: linear-gradient(90deg, #4f46e5, #6366f1); padding: 16px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px; color: #fff;">📜 New Message Notification</h2>
            </div>
            
            <div style="padding: 20px;">
              <h3 style="margin-top: 0; color: #111827;">Hello,</h3>
              <p style="color: #374151; line-height: 1.6;">You received a new message from <strong>${name}</strong>.</p>
              
              <div style="background: #f3f4f6; border-left: 4px solid #4f46e5; padding: 12px; margin: 16px 0; border-radius: 6px;">
                <p style="margin: 0; color: #111827; font-size: 14px;">${message}</p>
              </div>
              
              ${email}
              <p style="color: #6b7280; font-size: 12px;">This is an automated email. Please do not reply.</p>
            </div>
            <div style="background: #f9fafb; padding: 12px; text-align: center; font-size: 12px; color: #9ca3af;">
              © ${new Date().getFullYear()} Mailtrap Test. All rights reserved.
            </div>
          </div>
        </div>
      `,
      category: "Integration Test",
    })
    .then(console.log, console.error);
};
