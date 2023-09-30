import type { APIRoute } from "astro";

import sendGrid from '@sendgrid/mail'

const FROM_EMAIL = 'support@psybitcoin.com'
const TO_EMAIL = 'psycarlo1@gmail.com'

const EMAIL_VALID_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

sendGrid.setApiKey(import.meta.env.SENDGRID_API_KEY)

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  const responseMessage = []

  if (!name || (typeof name === 'string' && name.length < 2)) {
    responseMessage.push('error/name')
  }

  if (!email || (typeof email === 'string') && !EMAIL_VALID_REGEX.test(email)) {
    responseMessage.push('error/email')
  }

  if (!message || (typeof message === 'string' && message.length < 2)) {
    responseMessage.push('error/message')
  }

  if (responseMessage.length > 0) {
    return new Response(
      JSON.stringify({
        message: responseMessage,
      }),
      { status: 400 }
    )
  }
  
  const emailData = {
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `Contact form submission from ${name}`,
    text: `${name} | ${email} : ${message}`
  }

  try {
    await sendGrid.send(emailData)
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "error/remote",
      }),
      { status: 400 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "success"
    }),
    { status: 200 }
  );
};