import {mailtrapClient,sender} from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";


export const sendVerificationEmail = async (email, verificationToken) => {
   const recipient = [{email}]
   try{
    const response = await mailtrapClient.send({
        from: sender,
        to: recipient,
        subject: "Verify Your Email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
        category: "Email Verification",
    });
    console.log("Email sent successfully",response);
   }
   catch (error) {
    console.error(`Error sending verification`,error);
    console.log(`Error sending verification email: ${error}`);
   }
};