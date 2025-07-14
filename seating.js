const rows = ['A', 'B', 'C', 'D'];
const seatsPerRow = 10;
const allSeats = [];

rows.forEach(row => {
  for (let i = 1; i <= seatsPerRow; i++) {
    allSeats.push(`${row}${i}`);
  }
});

let bookedSeats = {};
const selectedDate = localStorage.getItem("selectedBookingDate") || new Date().toISOString().split("T")[0];
const storageKey = `bookedSeats_${selectedDate}`;

function loadBookings() {
  const stored = localStorage.getItem(storageKey);
  bookedSeats = stored ? JSON.parse(stored) : {};
}

function saveBookings() {
  localStorage.setItem(storageKey, JSON.stringify(bookedSeats));
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
  const loggedInUser = localStorage.getItem("loggedInUser");
  const allowedNames = [
    "Subash", "Raghav", "Gautham", "Daison", "Hari", "Rahul", "Arun Sandeep", "Sumithra",
    "Monalisa", "Mythili", "Debora", "Shamshath", "Shanthini", "Ramya", "Tejas", "Anand",
    "Harsha", "Ankan", "Kavya", "Nausheen", "Sneha", "Yukthi", "Karthik", "Dhinakar"
  ];

  if (!allowedNames.map(n => n.toLowerCase()).includes((loggedInUser || "").toLowerCase())) {
    alert("You are not allowed to access the seating system.");
    window.location.href = "employee_login.html";
    return;
  }

  document.getElementById("employeeNameDisplay").textContent = loggedInUser;

  loadBookings();

  const currentSeat = getUserSeat(loggedInUser);
  const seatForm = document.getElementById("seatForm");
  const currentSeatDisplay = document.getElementById("currentSeatDisplay");
  const editBtn = document.getElementById("editSeatBtn");

  if (currentSeat) {
    currentSeatDisplay.textContent = `Your current seat for ${selectedDate}: ${currentSeat}`;
    editBtn.style.display = "inline-block";
  } else {
    seatForm.style.display = "block";
    populateAvailableSeats("");
  }

  editBtn.addEventListener("click", () => {
    seatForm.style.display = "block";
    populateAvailableSeats(currentSeat);
    editBtn.style.display = "none";
    currentSeatDisplay.textContent = `You are editing your seat for ${selectedDate}: ${currentSeat}`;
  });

  seatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedSeat = document.getElementById("availableSeats").value;

    if (!selectedSeat) return alert("Please select a seat.");

    if (bookedSeats[selectedSeat] && bookedSeats[selectedSeat].toLowerCase() !== loggedInUser.toLowerCase()) {
      return alert(`Seat ${selectedSeat} is already booked by someone else.`);
    }

    const oldSeat = getUserSeat(loggedInUser);
    if (oldSeat) {
      delete bookedSeats[oldSeat];
    }

    bookedSeats[selectedSeat] = loggedInUser;
    saveBookings();

    alert(`Seat changed to ${selectedSeat} for ${selectedDate}`);
    window.location.reload();
  });

  const viewBtn = document.getElementById("viewBooked");
  if (viewBtn) {
    viewBtn.addEventListener("click", () => {
      window.location.href = "booked.html";
    });
  }
});
