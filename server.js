const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const bookingRoutes = require("./routes/booking"); // لازم يكون اسم الملف صحيح
app.use("/booking", bookingRoutes);

// ✅ السماح للسيرفر بتحميل ملفات `front/`
app.use(express.static(path.join(__dirname, "front")));

// ✅ حل مشكلة "Cannot GET /" بإرسال `interface.html` عند فتح الصفحة الرئيسية
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "front", "interface.html"));
});


const port = 5000;
app.listen(5000,"0.0.0.0", () => {
  console.log(`server has been started http://localhost:${port} `);
});
