import nodemailer from "nodemailer";
// Create a transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "temperchecksarv@gmail.com", 
    pass: "cewnhcuewcgo", 
  },
});

// Define the email options
const mailOptions = {
  from: "temperchecksarv@gmail.com",
  to: "recipient@example.com", 
  subject: "Hello from Nodemailer", 
  text: "This is a test email sent using Nodemailer!",
};

// Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

export {transporter, mailOptions}