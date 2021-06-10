const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User')
const Message = require('../models/Message');
const { IgnorePlugin } = require('webpack');

const bcrypt = require('bcrypt')
const bcryptSalt = 10

const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

});


let emailSender = (emailData) => {

    let email = emailData.email;
    let subject = emailData.subject;
    let text = emailData.text;


    transporter.sendMail({
        from: '"Theo Calderon Wants You to Confirm" <myawesome@project.com>',
        to: email,
        subject: subject,
        text: text,
        // html: `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a{padding:0;}.ReadMsgBody{width:100%;}.ExternalClass{width:100%;}.ExternalClass *{line-height:100%;}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}table, td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}img{border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}p{display:block;margin:13px 0;}</style><style type="text/css">@media only screen and (max-width:480px){@-ms-viewport{width:320px;}@viewport{width:320px;}}</style><!--[if mso]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if lte mso 11]> <style type="text/css"> .outlook-group-fix{width:100% !important;}</style><![endif]--><style type="text/css">@media only screen and (min-width:480px){.mj-column-per-100{width:100% !important; max-width: 100%;}.mj-column-per-50{width:50% !important; max-width: 50%;}}</style><style type="text/css">@media only screen and (max-width:480px){table.full-width-mobile{width: 100% !important;}td.full-width-mobile{width: auto !important;}}</style></head><body style="background-color:#F4F4F4;"><div style="background-color:#F4F4F4;"><div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:30px;text-align:center;vertical-align:top;"><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:214px;"><img height="auto" src="https://66.media.tumblr.com/89d6b16f135762ff9b05114b25b19b01/tumblr_pilyguU4TY1u4bxgt_540.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="214"></td></tr></tbody></table></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:15px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575d;"><p style="text-align: center; margin: 10px 0;color:#151e23;font-size:14px;font-family:Georgia,Helvetica,Arial,sans-serif">Product | Concept | Contact</p></div></td></tr></table></div></td></tr></tbody></table></div><div style="Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;vertical-align:top;"><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:600px;"><img height="auto" src="https://66.media.tumblr.com/14c54be0fd3a15c16e38529ea12d2af5/tumblr_p4kuccgK1w1vp5j01o1_1280.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="600"></td></tr></tbody></table></td></tr></table></div></td></tr></tbody></table></div><div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:30px;text-align:center;vertical-align:top;"><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-top:10px;padding-bottom:10px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:30px;line-height:22px;text-align:left;color:#55575d;"><p style="line-height: 30px; margin: 10px 0; text-align: center; color:#151e23; font-size:30p; font-family:Georgia,Helvetica,Arial,sans-serif">- Meet My Dog -</p></div></td></tr></table></div></td></tr></tbody></table></div><div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;vertical-align:top;"><div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-right:30px;padding-bottom:20px;padding-left:30px;word-break:break-word;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:240px;"><img height="auto" src="https://66.media.tumblr.com/0364b0d40bbf93055b56f4950b4d0d5b/tumblr_oubdacQ7z41vp5j01o1_1280.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="240"></td></tr></tbody></table></td></tr></table></div><div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-right:40px;padding-bottom:0px;padding-left:40px;word-break:break-word;"><div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575d;"><p style="margin: 10px 0; color:#151e23; font-size:16px; font-family:Georgia,Helvetica,Arial,sans-serif"><b>Theo || Theo Calderon</b></p><p style="line-height: 16px; margin: 10px 0;font-size:14px; color:#151e23; font-family:Georgia,Helvetica,Arial,sans-serif; color:#354552">I like to piss Everywhere and sniff some Ass. Get at me!</p><p style="line-height: 16px; margin: 10px 0; color:#354552; font-size:14px; font-family:Georgia,Helvetica,Arial,sans-serif"><a href="http://localhost:3000/auth/confirm/">Confirm The Email</a></p></div></td></tr></table></div></td></tr></tbody></table></div><div style="background:#ffffff;background-color:#ffffff;Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:rtl;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;vertical-align:top;"><div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"></table></div><div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"><tr><td style="padding:4px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#3b5998;border-radius:3px;width:20px;"><tr><td style="font-size:0;height:20px;vertical-align:middle;width:20px;"><a href="https://www.facebook.com/sharer/sharer.php?u=[[SHORT_PERMALINK]]" target="_blank"><img height="20" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/facebook.png" style="border-radius:3px;" width="20"></a></td></tr></table></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"><tr><td style="padding:4px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#bd081c;border-radius:3px;width:20px;"><tr><td style="font-size:0;height:20px;vertical-align:middle;width:20px;"><a href="https://pinterest.com/pin/create/button/?url=[[SHORT_PERMALINK]]&media=&description=" target="_blank"><img height="20" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/pinterest.png" style="border-radius:3px;" width="20"></a></td></tr></table></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"><tr><td style="padding:4px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#3f729b;border-radius:3px;width:20px;"><tr><td style="font-size:0;height:20px;vertical-align:middle;width:20px;"><a href="[[SHORT_PERMALINK]]" target="_blank"><img height="20" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/instagram.png" style="border-radius:3px;" width="20"></a></td></tr></table></td></tr></table></td></tr></table></div></td></tr></tbody></table></div></div></body></html>`,
    })
        .then(info => console.log(`${info}YOU SENT AN EMAIL`))
        .catch(error => console.log(error));
}

//GET ROUTE TO GET ALL USERS AND MESSAGES

router.get('/', (req, res, next) => {
    console.log("PULLING USERS...");

    User.find({}).then(payload => {
        console.log('PULLED USERS : ', payload);
    }).catch(err => {
        if (err) {
            console.log("ERROR : ", err);
        }
    });


    console.log("PULLING MESSAGES..");
    Message.find({}).then(payload => {
        console.log('PULLED MESSAGES : ', payload);
    }).catch(err => {
        if (err) {
            console.log("ERROR : ", err)
        }
    })
})


//POST ROUTE THAT WILL BE CALLED WHEN USER SUBMITS CONTACT ME FORM - THIS WILL SAVE USER AUTOMATICALLY TO KEEP TRACK OF USER QUERIES AND USE DATA TO TRAIN AI 


router.post('/request', (req, res, next) => {
    const { name, email, phone, subject, text } = req.body

    console.log('request body: ', req.body)
    // const email = "hwek21@gmail.com";
    // const username = email;
    // const phone = "7866086021"
    const password = bcrypt.hashSync('aiNomads', bcrypt.genSaltSync(bcryptSalt));
    // const subject = "just saying test one";
    // const text = "please baby dont fuck up my vibe"


    User.findOne({ email }).then(user => {
        if (user != null) {
            // res.status(409).json({ message: "User already exist" });
            // return


            User.updateOne(
                { email: email },
                { $addToSet: { messages: [{ subject, text }] } },
                function (err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        // res.send(result);
                        console.log(result);
                    }
                }
            ).then(() => {
                let emailPayload = {
                    email, subject, text
                }
                emailSender(emailPayload);
               return  res.status(200).json({ message: "did a whole succesfull loop" });
            }).catch(err => {
                if (err) {
                    console.log('TENGO UN ERROR ', err
                    )
                }
            })


        } else {
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)
            const newUser = new User({
                username : name, password: hashPass, phone, email, messages: {
                    subject, text

                }
            });
            return newUser.save()
        }

    }).then(userSaved => {
        if(userSaved){
            console.log("USER SAVED: ", userSaved);
            let newUserEmailPayload = {
                email, subject, text
            }
            emailSender(newUserEmailPayload);
            res.status(200).json({ message: "did a whole succesfull loop" });
        }
        
    }).catch(err => {
        if (err) {
            console.log('ERROR : ', err);
            res.status(409).json({ message: err });
            return
        }
    })


});






module.exports = router