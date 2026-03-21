// import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export const sendWhatsapp = async ({ to, message }) => {
//   try {
//     await client.messages.create({
//       from: "whatsapp:+14155238886", 
//       to: `whatsapp:${to}`,
//       body: message,
//     });
//   } catch (error) {
//     console.error("WhatsApp send error:", error.message);
//   }
// };

import axios from "axios";

export const sendWhatsapp = async ({ to, message }) => {
  try {
    const response = await axios.post(
      "https://api.gupshup.io/sm/api/v1/msg",
      new URLSearchParams({
        channel: "whatsapp",
        source: process.env.GUPSHUP_SOURCE, // your business number
        destination: to, // without whatsapp:
        message: JSON.stringify({
          type: "text",
          text: message,
        }),
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey: process.env.GUPSHUP_API_KEY,
        },
      }
    );

    console.log("WhatsApp sent:", response.data);
  } catch (error) {
    console.error(
      "Gupshup WhatsApp error:",
      error.response?.data || error.message
    );
  }
};