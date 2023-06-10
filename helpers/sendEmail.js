const sendgrid = require("@sendgrid/mail");

const { SENDGRID_API_KEY, SENDGRID_FROM } = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY, SENDGRID_FROM);

const sendEmail = async (data, from = SENDGRID_FROM) => {
  try {
    const email = { ...data, from };
    await sendgrid.send(email);
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
module.exports = sendEmail;
