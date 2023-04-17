const nodemailer = require("nodemailer");
const Config = require("../../config/config");
// sending mail using mailtrap
// const sendEmail = async (options={}) => {
//     try {
//         var transport = nodemailer.createTransport({
//             host: Config.SMTP_HOST,
//             port: Config.SMTP_PORT,
//             secure: Config.SMTP_TLS,
//             auth: {
//                 user: Config.SMTP_USER,
//                 pass: Config.SMTP_PASSWORD
//             }
//         });

//         let mail = await transport.sendMail({
//             from: Config.SMTP_FROM,
//             ...options
//         })
//         return mail
//     }catch(exep) {
//         console.log("Mail: "+ exep)
//         return null
//     }

// }


// sending mail using real gmail
const sendEmail = async(options={}) => {
    try{
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user:Config.GMAIL_USER,
                pass: Config.GMAIL_PASS
            }
        })
        let mail = await transporter.sendMail({
            from: Config.GMAIL_USER,
            ...options
        })
        return mail
    }catch(exep) {
        console.log("Mail: "+ exep)
        return null
    }
}

module.exports=sendEmail