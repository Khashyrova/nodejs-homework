const { BASE_URL, PORT } = process.env;
const createVerificationEmail = (verificationToken, email) => {
  const verifyLink = `${BASE_URL}:${PORT}/users/verify/${verificationToken}`;
  return {
    to: email,
    subject: "verification",
    html: verifyLink,
  };
};
module.exports = createVerificationEmail;
