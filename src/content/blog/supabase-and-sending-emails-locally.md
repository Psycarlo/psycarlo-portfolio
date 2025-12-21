---
title: 'Use Supabase Mailpit to send emails locally'
pubDate: 2025-12-21
description: 'A quick guide on how to use Supabase with Mailpit to test and preview emails locally during development'
heroImage: '../../assets/blog/supabase-mailpit.png'
---

For a local environment, you might want to send emails to your local inbucket that supabase provides.

```ts
const transporter = nodemailer.createTransport({
  host: 'inbucket',
  port: 1025,
  secure: false,
  auth: null
})

await transporter.sendMail({
  from: FROM_EMAIL,
  to: data.to,
  subject: data.subject,
  text: data.text
})
```

If you are using previous versions of supabase, change port from 1025 to 2500.
