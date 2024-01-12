const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require("../models/appointmentModel");
const moment = require("moment");
const Blacklist = require("../models/blackList");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "Kullanıcı mevcut!", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "Kullanıcı başarıyla oluşturuldu!", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Kullanıcı oluşturulamadı!", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const email = user.email;

    if (!user) {
      return res
        .status(200)
        .send({ message: "Kullanıcı mevcut değil!", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Girilen bilgiler hatalı!", success: false });
    }

    let options = {
      maxAge: 20 * 60 * 1000, // would expire in 20minutes
      httpOnly: true, // The cookie is only accessible by the web server
      secure: true,
      sameSite: "None",
    };
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("SessionID", token, options);
    res.status(200).send({
      message: "Giriş Başarılı",
      success: true,
      token: token,
      email: email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Hata oluştu!", success: false, error });
  }
});

router.post("/logout", authMiddleware, async (req, res) => {
  try {
    const authHeader = req.headers["cookie"]; // get the session cookie from request header
    if (!authHeader) return res.sendStatus(204); // No content
    const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt token
    const accessToken = cookie.split(";")[0];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
    // if true, send a no content response.
    if (checkIfBlacklisted) return res.sendStatus(204);
    // otherwise blacklist token
    const newBlacklist = new Blacklist({
      token: accessToken,
    });
    await newBlacklist.save();
    // Also clear request cookie on client
    res.setHeader("Clear-Site-Data", '"cookies"');
    res.status(200).send({ message: "Çıkış başarılı!", success: true });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
  res.end();
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "Kullanıcı bulunamadı!", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});

router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
  try {
    const newdoctor = new Doctor({ ...req.body, status: "İşlemde" });
    await newdoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });

    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "yeni-doktor-başvurusu",
      message: `${newdoctor.firstName} ${newdoctor.lastName} tarafından doktor başvurusu yapıldı.`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctorslist",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Doktor başvurusu başarılı.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Başvuru tamamlanamadı!",
      success: false,
      error,
    });
  }
});

router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "Tüm bildirimler görüldü.",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Bildirimler okunamadı!",
        success: false,
        error,
      });
    }
  }
);

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Bildirimler silindi!",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Bildirimler silinemedi!",
      success: false,
      error,
    });
  }
});

router.get("/get-all-approved-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "Onaylandı" });
    res.status(200).send({
      message: "Doktorlar başarıyla listelendi.",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Doktorlar alınırken hata oluştu!",
      success: false,
      error,
    });
  }
});

router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    req.body.status = "İşlemde";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    //pushing notification to doctor based on his userid
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "yeni-randevu-bildirimi",
      message: `${req.body.userInfo.name} tarafından randevu talep edildi.`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Randevu alma başarılı.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Randevu alınamadı!",
      success: false,
      error,
    });
  }
});

router.post("/check-booking-avilability", authMiddleware, async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Uygun değil! ",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Randevu ugyun.",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Kontrol edilirken hata oluştu!",
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

    // Pushing notification to the doctor based on his userId
    const doctor = await Doctor.findOne({ _id: updatedAppointment.doctorId });

    if (!doctor) {
      return res.status(404).send({
        message: "Doktor bulunamadı!",
        success: false,
      });
    }

    const user = await User.findOne({ _id: doctor.userId });

    if (user) {
      user.unseenNotifications.push({
        type: "randevu-iptal",
        message: `Randevu ${updatedAppointment.userInfo.name} tarafınfan iptal edildi.`,
        onClickPath: "/doctor/appointments",
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

// Belirli bir tarih için time slots oluşturacak yardımcı fonksiyon

// router.post("/available-appointments", authMiddleware, async (req, res) => {
//   try {
//     const doctorId = req.body.doctorId;
//     const date = moment(req.body.date, "DD-MM-YYYY").toISOString();

//     // Doktorun bilgilerini al
//     const doctor = await Doctor.findOne({ _id: doctorId });

//     if (!doctor) {
//       return res.status(404).send({
//         message: "Doctor not found",
//         success: false,
//       });
//     }

//     // Doktorun çalışma saatlerini ve randevu süresini al
//     const workingHours = doctor.timings;
//     const maxAppointmentDuration = doctor.maxAppointmentDuration; // Maksimum randevu süresi dakika cinsinden

//     // Available time slots'u oluştur
//     const availableTimeSlots = await generateAvailableTimeSlots(
//       workingHours,
//       maxAppointmentDuration,
//       date,
//       doctorId
//     );

//     if (availableTimeSlots.length === 0) {
//       return res.status(200).send({
//         message: "No available time slots",
//         success: false,
//       });
//     }

//     return res.status(200).send({
//       message: "Available time slots retrieved successfully",
//       success: true,
//       timeSlots: availableTimeSlots,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error retrieving available time slots",
//       success: false,
//       error,
//     });
//   }
// });

// async function isTimeSlotAvailable(doctorId, date, startTime, endTime) {
//   const existingAppointments = await Appointment.find({
//     doctorId,
//     date,
//     $or: [
//       { $and: [{ time: { $gte: startTime, $lt: endTime } }] },
//       { $and: [{ time: { $lt: startTime }, endTime: { $gt: startTime } }] },
//       { $and: [{ time: { $gte: startTime }, time: { $lt: endTime } }] },
//       { $and: [{ time: { $lte: startTime }, endTime: { $gt: endTime } }] },
//     ],
//   });

//   return existingAppointments.length === 0;
// }

// async function generateAvailableTimeSlots(
//   workingHours,
//   maxAppointmentDuration,
//   date,
//   doctorId
// ) {
//   const startTime = moment(`${date} ${workingHours[0]}`, "YYYY-MM-DD HH:mm");
//   const endTime = moment(`${date} ${workingHours[1]}`, "YYYY-MM-DD HH:mm");
//   const timeSlots = [];

//   // Belirtilen saat aralığında time slots oluştur
//   let currentTime = startTime.clone();

//   while (currentTime.isBefore(endTime)) {
//     const slotEndTime = currentTime
//       .clone()
//       .add(maxAppointmentDuration, "minutes");
//     if (slotEndTime.isAfter(endTime)) {
//       break;
//     }

//     // Kontrol etmek için bu saatte başka bir randevu var mı?
//     const isSlotAvailable = await isTimeSlotAvailable(
//       doctorId,
//       date,
//       currentTime.toISOString(),
//       slotEndTime.toISOString()
//     );

//     if (isSlotAvailable) {
//       timeSlots.push(currentTime.format("HH:mm"));
//     }

//     currentTime.add(maxAppointmentDuration, "minutes");
//   }

//   return timeSlots;
// }

// router.post("/book-appointment", authMiddleware, async (req, res) => {
//   try {
//     const doctorId = req.body.doctorId;
//     const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
//     const time = moment(req.body.time, "HH:mm").toISOString();

//     // Check if the selected time is available
//     const isSlotAvailable = await Appointment.findOne({
//       doctorId,
//       date,
//       time,
//     });

//     if (isSlotAvailable) {
//       return res.status(200).send({
//         message: "Selected time slot is not available",
//         success: false,
//       });
//     }

//     // Create a new appointment
//     req.body.status = "pending";
//     req.body.date = date;
//     req.body.time = time;
//     const newAppointment = new Appointment(req.body);

//     await newAppointment.save();

//     // Pushing notification to the doctor based on his userId
//     const user = await User.findOne({ _id: req.body.doctorInfo.userId });
//     user.unseenNotifications.push({
//       type: "new-appointment-request",
//       message: `A new appointment request has been made by ${req.body.userInfo.name}`,
//       onClickPath: "/doctor/appointments",
//     });
//     await user.save();

//     res.status(200).send({
//       message: "Appointment booked successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error booking appointment",
//       success: false,
//       error,
//     });
//   }
// });

router.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId });
    res.status(200).send({
      message: "Randevular başarıyla listelendi.",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Listeleme hatası!",
      success: false,
      error,
    });
  }
});
module.exports = router;
