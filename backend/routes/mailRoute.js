const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const sendEmail = require("../helpers/sendEmail");
const { consumers } = require("nodemailer/lib/xoauth2");

router.post("/send", authMiddleware, async (req, res) => {
  const { email } = req.body;
  const { baslik } = req.body;
  const { mesaj } = req.body;

  try {
    const send_to = process.env.EMAIL_TO;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = baslik;
    const message = mesaj;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).send({ success: true, message: "Mail Gönderildi" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
