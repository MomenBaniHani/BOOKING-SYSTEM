const express = require("express");
const db = require("../config/db");
const router = express.Router();

// إضافة حجز جديد
router.post("/", (req, res) => {
  const { user_id, room, date, time } = req.body;
  const query = "INSERT INTO booking (user_id,room,date,time) VALUES(?,?,?,?)";
  db.query(query, [user_id, room, date, time], (err, result) => {
    if (err) {
      console.error("error in db", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "Booking Added Successfully",
      bookingId: result.insertId,
    }); //بعطيني ال id  الي تم انشاؤه
  });
});
//get all booking
router.get("/", (req, res) => {
  const query = "SELECT * FROM booking";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

//get by id
router.get("/id/:id", (req, res) => {
  const { id } = req.body;
  const query = "SELECT * FROM booking WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// تعديل الحجز
router.put("/:id", (req, res) => {
  const { room, date, time } = req.body;
  const bookingId = req.params.id;

  const query = "UPDATE booking SET room = ?, date = ?, time = ? WHERE id = ?";
  db.query(query, [room, date, time, bookingId], (err, result) => {
      if (err) {
          console.error("Error updating booking:", err);
          return res.status(500).json({ error: err.message });
      }
      res.json({ message: "The booking has been modified successfully." });
  });
});

//delete all
// حذف جميع الحجوزات
router.delete("/all", (req, res) => {
  const query = "DELETE FROM booking"; // حذف كل البيانات من الجدول
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Deleted All!" });
  });
});

//delete booking by id
router.delete("/:id", (req, res) => {
  const { id } = req.body;
  const query = "DELETE FROM booking WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Booking not found, not deleted" });
    }

    res.json({ message: "The Booking Has Been Deleted" });
  });
});
module.exports = router;
