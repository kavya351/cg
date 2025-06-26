const rows = ['A', 'B', 'C', 'D'];
const seatsPerRow = 10;
const allSeats = [];

rows.forEach(row => {
  for (let i = 1; i <= seatsPerRow; i++) {
    allSeats.push(`${row}${i}`);
  }
});

let bookedSeats = {};

function resetBookingsDaily() {
  const today = new Date().toISOString().split("T")[0];
  const lastReset = localStorage.getItem("lastResetDate");

  if (lastReset !== today) {
    localStorage.removeItem("bookedSeats");
    bookedSeats = {};
    localStorage.setItem("lastResetDate", today);
  }
}

function loadBookings() {
  const stored = localStorage.getItem("bookedSeats");
  bookedSeats = stored ? JSON.parse(stored) : {};
}

function saveBookings() {
  localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
}

function getUserSeat(name) {
  const lower = name.toLowerCase();
  return Object.keys(bookedSeats).find(seat => bookedSeats[seat].toLowerCase() === lower);
}

function populateAvailableSeats(currentUserSeat = "") {
  const seatSelect = document.getElementById("availableSeats");
  seatSelect.innerHTML = '<option value="">Select an available seat</option>';

  const available = allSeats.filter(seat =>
    !bookedSeats[seat] || bookedSeats[seat].toLowerCase() === currentUserSeat.toLowerCase()
  );

  available.forEach(seat => {
    const option = document.createElement("option");
    option.value = seat;
    option.textContent = seat;
    seatSelect.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const allowedNames = [
    "Subash", "Raghav", "Gautham", "Daison", "Hari", "Rahul", "Arun Sandeep", "Sumithra",
    "Monalisa", "Mythili", "Debora", "Shamshath", "Shanthini", "Ramya", "Tejas", "Anand",
    "Harsha", "Ankan", "Kavya", "Nausheen", "Sneha", "Yukthi", "Karthik", "Dhinakar"
  ];

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!allowedNames.map(n => n.toLowerCase()).includes((loggedInUser || "").toLowerCase())) {
    alert("You are not allowed to access the seating system.");
    window.location.href = "employee_login.html";
    return;
  }

  document.getElementById("employeeNameDisplay").textContent = loggedInUser;

  resetBookingsDaily();
  loadBookings();

  const currentSeat = getUserSeat(loggedInUser);
  const seatForm = document.getElementById("seatForm");
  const currentSeatDisplay = document.getElementById("currentSeatDisplay");
  const editBtn = document.getElementById("editSeatBtn");

  if (currentSeat) {
    currentSeatDisplay.textContent = `Your current seat: ${currentSeat}`;
    editBtn.style.display = "inline-block";
  } else {
    seatForm.style.display = "block";
    populateAvailableSeats("");
  }

  editBtn.addEventListener("click", () => {
    seatForm.style.display = "block";
    populateAvailableSeats(currentSeat);
    editBtn.style.display = "none";
    currentSeatDisplay.textContent = `You are editing your seat: ${currentSeat}`;
  });

  seatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedSeat = document.getElementById("availableSeats").value;

    if (!selectedSeat) return alert("Please select a seat.");

    // If someone else booked it
    if (bookedSeats[selectedSeat] && bookedSeats[selectedSeat].toLowerCase() !== loggedInUser.toLowerCase()) {
      return alert(`Seat ${selectedSeat} is already booked by someone else.`);
    }

    // Release previous seat
    const oldSeat = getUserSeat(loggedInUser);
    if (oldSeat) {
      delete bookedSeats[oldSeat];
    }

    // Book new seat
    bookedSeats[selectedSeat] = loggedInUser;
    saveBookings();

    alert(`Seat changed to ${selectedSeat}`);
    window.location.reload(); // Refresh the UI
  });

  const viewBtn = document.getElementById("viewBooked");
  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      window.location.href = "booked.html";
    });
  }
});
