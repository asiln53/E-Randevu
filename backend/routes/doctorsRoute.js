const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

router.post("/get-doctor-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doktor Bilgileri Alma Başarılı",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Doktor bilgileri alınamadı!", success: false, error });
  }
});

router.post("/get-doctor-info-by-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Doktor Bilgileri Alma Başarılı",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Doktor bilgileri alınamadı!", success: false, error });
  }
});

router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Doktor Bilgileri Güncelleme Başarılı",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "İşlem Sırasında Hata oluştu!", success: false, error });
  }
});

router.get(
  "/get-appointments-by-doctor-id",
  authMiddleware,
  async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ userId: req.body.userId });
      const appointments = await Appointment.find({ doctorId: doctor._id });
      res.status(200).send({
        message: "Randevu Listeleme Başarılı",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Randevular alınamadı!",
        success: false,
        error,
      });
    }
  }
);

router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    let isActive = true;

    // Eğer status "rejected" içeriyorsa isActive'ı false olarak ayarla
    if (status.toLowerCase().includes("onaylanmadı")) {
      isActive = false;
    }

    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
      isActive, // isActive'ı güncelle
    });

    const user = await User.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Randevunuz ${status}`,
      onClickPath: "/appointments",
    });

    await user.save();

    res.status(200).send({
      message: "Randevu güncelleme başarılı",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Randevu güncelleme yapılamadı!",
      success: false,
      error,
    });
  }
});

router.put("/cancel-appointment/:id", authMiddleware, async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { isActive: false, status: "İptal Edildi" } },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).send({
        message: "Randevu bulunamadı!",
        success: false,
      });
    }

    const user = await User.findOne({ _id: updatedAppointment.userId });

    if (user) {
      user.unseenNotifications.push({
        type: "randevu-iptal",
        message: "Randevu  iptal edildi.",
        onClickPath: "/appointments",
      });

      await user.save();
    }

    res.status(200).send({
      message: "Randevu iptal edildi",
      success: true,
      data: updatedAppointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Randevu iptal edilirken hata oluştu.",
      success: false,
      error,
    });
  }
});

module.exports = router;
