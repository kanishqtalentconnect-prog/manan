import axios from "axios";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await axios.post(process.env.GAS_EMAIL_URL, {
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Email failed", err?.response?.data || err.message);
  }
};
