import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const transporter = {
    auth: {
        // Update your SendGrid API key here
        api_key: process.env.SENDGRID_API_KEY
    }
}

const mailer = nodemailer.createTransport(sgTransport(transporter));

export default async (req, res) => {
    const {name, email, number, subject, text} = req.body;

    const data = {
        // Update your email here 2933cloudixsmokeshop@gmail.com
        to: '2933cloudixsmokeshop@gmail.com',
        from: 'contact.us@buymesmokes.com',
        subject: 'Hello, You have been contacted by your customer! Woot Woot',
        text: text,
        html: `
            <b>From:</b> ${name} <br /> 
            <b>Email:</b> ${email} <br /> 
            <b>Number:</b> ${number} <br /> 
            <b>Subject:</b> ${subject} <br /> 
            <b>Message:</b> ${text} 
        ` 
    };
    try {
        await mailer.sendMail(data);
        res.status(200).send("Email send successfully")
    } catch (error) {
        res.status(500).send("Error proccessing charge");
    }
}