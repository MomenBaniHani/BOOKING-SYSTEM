const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root12345",
  database: "booking_system",
});

//check connection db
db.connect((err) => {
  if (err) {
    console.error("Field Connection To DataBase", err); //هذا الكود يُستخدم لتتبع الأخطاء التي تحدث عند محاولة الاتصال بقاعدة البيانات، مما يساعد المطورين على تصحيح المشاكل بسرعة
  } else {
    console.log("Connection is Done");
  }
});

module.exports = db;
