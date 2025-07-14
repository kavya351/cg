document.addEventListener("DOMContentLoaded", () => {
  const selectedDate = localStorage.getItem("selectedBookingDate") || new Date().toISOString().split("T")[0];
  const storageKey = `bookedSeats_${selectedDate}`;

  const list = document.getElementById("bookedList");
  const stored = localStorage.getItem(storageKey);
  const bookedSeats = stored ? JSON.parse(stored) : {};

  const heading = document.getElementById("dateHeading");
  heading.textContent = `Booked Seats for ${selectedDate}`;

  if (Object.keys(bookedSeats).length === 0) {
    list.innerHTML = "<li>No seats have been booked for this date.</li>";
  } else {
    for (const [seat, name] of Object.entries(bookedSeats)) {
      const li = document.createElement("li");
      li.textContent = `${seat} - Booked by ${name}`;
      list.appendChild(li);
    }
  }
});
