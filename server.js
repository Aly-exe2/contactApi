const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alybnraslan@gmail.com',
    pass: 'wxlmvuqzdgzxrmor',
  },
});

// Contact endpoint
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'alibnraslan@gmail.com', // Sends to yourself
      subject: `New message from ${name} (Portfolio)`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});