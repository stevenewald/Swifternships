const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://swifternships-default-rtdb.firebaseio.com/",
});

const ACC_SID = functions.config().twilio.acc_sid2;
const AUTH_TOKEN = functions.config().twilio.auth_token2;
const twilio_client = require("twilio")(ACC_SID, AUTH_TOKEN);
const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance(); 

let studentRef = admin.database().ref("students");
let businessRef = admin.database().ref("employers");
exports.beforeAcc = functions.auth.user().beforeCreate(async (user) => {
  await businessRef.child(user.uid).set({
    signed_up: false,
    email: user.email,
  });
  if (user.email.includes("northwestern.edu")) {
    await studentRef.child(user.uid).set({
      signed_up: false,
      email: user.email,
    });
  }
  return true;
});

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: functions.config().sendinblue.user,
    pass: functions.config().sendinblue.password,
  },
});

exports.createApplicationEmail = functions.https.onCall(
  async (data, context) => {
    const mailOptions = {
      from: "Swifternships <jobs@swifternships.tech>",
      to: data.email,
      subject: "Applications submitted for " + data.jobTitle,
      html:
        '<doctype html><html>  <head>    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">    <title>Job Applications Submitted</title>    <style>@media only screen and (max-width: 620px) {  table.body h1 {    font-size: 28px !important;    margin-bottom: 10px !important;  }  table.body p,table.body ul,table.body ol,table.body td,table.body span,table.body a {    font-size: 16px !important;  }  table.body .wrapper,table.body .article {    padding: 10px !important;  }  table.body .content {    padding: 0 !important;  }  table.body .container {    padding: 0 !important;    width: 100% !important;  }  table.body .main {    border-left-width: 0 !important;    border-radius: 0 !important;    border-right-width: 0 !important;  }  table.body .btn table {    width: 100% !important;  }  table.body .btn a {    width: 100% !important;  }  table.body .img-responsive {    height: auto !important;    max-width: 100% !important;    width: auto !important;  }}@media all {  .ExternalClass {    width: 100%;  }  .ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {    line-height: 100%;  }  .apple-link a {    color: inherit !important;    font-family: inherit !important;    font-size: inherit !important;    font-weight: inherit !important;    line-height: inherit !important;    text-decoration: none !important;  }  #MessageViewBody a {    color: inherit;    text-decoration: none;    font-size: inherit;    font-family: inherit;    font-weight: inherit;    line-height: inherit;  }  .btn-primary table td:hover {    background-color: #34495e !important;  }  .btn-primary a:hover {    background-color: #34495e !important;    border-color: #34495e !important;  }}</style>  </head>  <body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">    <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">View submitted applications.</span>    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">      <tr>        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">            <!-- START CENTERED WHITE CONTAINER -->            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">              <!-- START MAIN CONTENT AREA -->              <tr>                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">                    <tr>                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Hello,</p>                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Students have submitted new applications for your job posting, ' +
        data.jobTitle +
        '.</p>                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">                          <tbody>                            <tr>                              <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">                                  <tbody>                                    <tr>                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #3498db;" valign="top" align="center" bgcolor="#3498db"> <a href="https://www.swifternships.tech/employer" target="_blank" style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #3498db; border-color: #3498db; color: #ffffff;">Review Applications</a> </td>                                    </tr>                                  </tbody>                                </table>                              </td>                            </tr>                          </tbody>                        </table>                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Please contact support@swifternships.tech if you have any further questions.</p><br>                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Sincerely,<br>The Swifternships Team</p>                      </td>                    </tr></table></td></tr></table></div></td></tr></table></body></html>',
    };
    await transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        console.log(erro.toString());
      } else {
        console.log("Sent dropped email to " + data.email + "\n");
      }
    });
  }
);

exports.sendApplicationText = functions.https.onCall(async (data, context) => {
  console.log(functions.config().twilio.acc_sid)
  console.log(functions.config().twilio.auth_token)
  const text = "You've successfully submitted an application for " +
  data.jobTitle +
  " at " +
  data.companyName + 
  "! You can view your application at swifternships.tech/student. You'll receive further SMS messages when your application is reviewed."
  console.log(text);
  await twilio_client.messages.create({
    body: text,
    from: "+17579193238",
    to: "+1" + phoneUtil.parse(data.phone, "US").getNationalNumber(),
  }).catch((err) => {console.log(err)});
  console.log("Sent text to " + phoneUtil.parse(data.phone, "US").getNationalNumber());
});
