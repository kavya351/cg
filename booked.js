function resetBookingsDaily() {
  const today = new Date().toISOString().split("T")[0];
  const lastReset = localStorage.getItem("lastResetDate");

  if (lastReset !== today) {
    localStorage.removeItem("bookedSeats");
    localStorage.setItem("lastResetDate", today);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  resetBookingsDaily();

  const list = document.getElementById("bookedList");
  const stored = localStorage.getItem("bookedSeats");
  const bookedSeats = stored ? JSON.parse(stored) : {};

  if (Object.keys(bookedSeats).length === 0) {
    list.innerHTML = "<li>No seats have been booked today.</li>";
  } else {
    for (const [seat, name] of Object.entries(bookedSeats)) {
      const li = document.createElement("li");
      li.textContent = `${seat} - Booked by ${name}`;
      list.appendChild(li);
    }
  }
});
