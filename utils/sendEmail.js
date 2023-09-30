import nodeMailer from 'nodemailer';

const sendEmail = async (options) => {
  const transpoter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, // if secure false port = 587, if true port= 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'ecommerce@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transpoter.sendMail(mailOptions);
};

export default sendEmail;
