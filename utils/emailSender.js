const nodemailer = require('nodemailer');

exports.sendEmail = (reciverEmail, subject, textContent, htmlContent, pdfFileName, pdfFilePath) => {
    // setup email data with unicode symbols
    // the from property is the env variable set in the config.env file called EMAIL_USER and the password is the env variable called EMAIL_PASSWORD

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: reciverEmail,
        subject: subject,
        text: textContent,
        html: htmlContent
   
    };

    if (pdfFileName && pdfFilePath) {
        mailOptions.attachments = [
            {
                filename: pdfFileName,
                path: pdfFilePath
            }
        ];
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return error;
        } else {
            return info.response;
            console.log('Email sent: ' + info.response);
        }
    });
}
