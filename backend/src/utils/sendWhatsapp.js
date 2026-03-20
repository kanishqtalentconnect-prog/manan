import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsapp = async ({ to, message }) => {
  try {
    await client.messages.create({
      from: "whatsapp:+14155238886", 
      to: `whatsapp:${to}`,
      body: message,
    });
  } catch (error) {
    console.error("WhatsApp send error:", error.message);
  }
};