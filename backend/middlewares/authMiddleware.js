const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blackList");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["cookie"];

    if (!authHeader) return res.sendStatus(401);
    const cookie = authHeader.split("=")[1];
    const accessToken = cookie.split(";")[0];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });

    if (checkIfBlacklisted)
      return res.status(200).send({
        message: "Oturum süreniz doldu, lütfen tekrar giriş yapın.",
        success: false,
      });

    jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Oturum süreniz doldu, lütfen tekrar giriş yapın.",
          success: false,
        });
      }
      req.body.userId = decoded.id;
      next();
    });
  } catch (error) {
    return res.status(401).send({
      message: "Kimlik doğrulama hatası!",
      success: false,
    });
  }
};
