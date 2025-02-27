document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", (event) => {
    let searchText = event.target.value.toLowerCase();
    let doctors = document.querySelectorAll(".doctor");

    doctors.forEach((doctor) => {
      if (doctor.innerText.toLowerCase().includes(searchText)) {
        doctor.style.display = "block";
      } else {
        doctor.style.display = "none";
      }
    });
  });
});

document
  .getElementById("appointmentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const userId = 1; // افترضنا أنك تحجز لمستخدم ID = 1
    const room = document.getElementById("room").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const bookingData = { user_id: userId, room, date, time };

    fetch("/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("message").innerText = "Booking Successfully";
        document.getElementById("appointmentForm").reset(); // مسح المدخلات بعد الحجز
      })
      .catch((error) => {
        document.getElementById("message").innerText =
          "An error occurred while booking.";
        console.error("Error:", error);
      });
  });

// عرض الحجوزات
function fetchBookings() {
  fetch("/booking")
    .then((response) => response.json())
    .then((data) => {
      const bookingList = document.getElementById("booking-list");
      bookingList.innerHTML = ""; // مسح المحتوى القديم

      data.forEach((booking) => {
        const bookingItem = document.createElement("div");
        bookingItem.className = "booking-item";
        bookingItem.innerHTML = `
          <p>Room: ${booking.room}</p>
          <p>Date: ${booking.date}</p>
          <p>Time: ${booking.time}</p>
          <button class="edit-btn" onclick="editBooking(${booking.id})">Edit</button>
        `;
        bookingList.appendChild(bookingItem);
      });
    })
    .catch((err) => console.error("Error:", err));
}

function editBooking(id) {
  const room = prompt("Enter new room :");
  const date = prompt("Enter new date :");
  const time = prompt("Enter new time :");

  fetch(`/booking/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ room, date, time }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      fetchBookings(); // تحديث القائمة
    })
    .catch((err) => console.error("Error:", err));
}


// استدعاء الحجوزات عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", fetchBookings);
