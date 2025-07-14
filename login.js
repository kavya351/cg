const allowedEmployees = [
  { id: "Emp001", name: "Subash" },
  { id: "Emp002", name: "Raghav" },
  { id: "Emp003", name: "Gautham" },
  { id: "Emp004", name: "Daison" },
  { id: "Emp005", name: "Hari" },
  { id: "Emp006", name: "Rahul" },
  { id: "Emp007", name: "Arun Sandeep" },
  { id: "Emp008", name: "Sumithra" },
  { id: "Emp009", name: "Monalisa" },
  { id: "Emp010", name: "Mythili" },
  { id: "Emp011", name: "Debora" },
  { id: "Emp012", name: "Shamshath" },
  { id: "Emp013", name: "Shanthini" },
  { id: "Emp014", name: "Ramya" },
  { id: "Emp015", name: "Tejas" },
  { id: "Emp016", name: "Anand" },
  { id: "Emp017", name: "Harsha" },
  { id: "Emp018", name: "Ankan" },
  { id: "Emp019", name: "Kavya" },
  { id: "Emp020", name: "Nausheen" },
  { id: "Emp021", name: "Sneha" },
  { id: "Emp022", name: "Yukti" },
  { id: "Emp023", name: "Karthik" },
  { id: "Emp024", name: "Dhinakar" }
];

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const bookSeatBtn = document.getElementById("bookSeatBtn");
  const errorMsg = document.getElementById("errorMsg");
  const bookingDateInput = document.getElementById("bookingDate");
  const totalSeatsEl = document.getElementById("totalSeats");
  const bookedSeatsEl = document.getElementById("bookedSeats");
  const availableSeatsEl = document.getElementById("availableSeats");
  const seatsChartCanvas = document.getElementById("seatsChart");
  const weeklyChartCanvas = document.getElementById("weeklyChart");

  // Set today's date by default
  const today = new Date().toISOString().split("T")[0];
  bookingDateInput.value = today;

  // ----- Login Form -----
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const empId = document.getElementById("employeeId").value.trim();
    const empName = document.getElementById("employeeName").value.trim();

    if (empId && empName) {
      localStorage.setItem("loggedInEmployee", JSON.stringify({ id: empId, name: empName }));
      errorMsg.textContent = "";
      bookSeatBtn.style.display = "block";
    } else {
      errorMsg.textContent = "Please enter both Employee ID and Name.";
    }
  });

  // ----- Book Seat Button -----
  bookSeatBtn.addEventListener("click", () => {
    window.location.href = "seating.html";
  });

  // Auto-show book seat if already logged in
  const storedEmployee = localStorage.getItem("loggedInEmployee");
  if (storedEmployee) {
    bookSeatBtn.style.display = "block";
  }

  // ----- Load Stats -----
  function updateStats(date) {
    const storageKey = `bookedSeats_${date}`;
    const stored = localStorage.getItem(storageKey);
    const booked = stored ? Object.keys(JSON.parse(stored)).length : 0;
    const totalSeats = 50;
    const available = totalSeats - booked;

    totalSeatsEl.textContent = totalSeats;
    bookedSeatsEl.textContent = booked;
    availableSeatsEl.textContent = available;

    drawPieChart(booked, available);
  }

  bookingDateInput.addEventListener("change", (e) => {
    updateStats(e.target.value);
  });

  updateStats(today);

  // ----- Pie Chart -----
  function drawPieChart(booked, available) {
    new Chart(seatsChartCanvas, {
      type: "doughnut",
      data: {
        labels: ["Booked", "Available"],
        datasets: [{
          data: [booked, available],
          backgroundColor: ["#ef5350", "#66bb6a"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });
  }

  // ----- Weekly Chart (Dummy data for now) -----
  function drawWeeklyChart() {
    const days = [];
    const bookedData = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const stored = localStorage.getItem(`bookedSeats_${key}`);
      const count = stored ? Object.keys(JSON.parse(stored)).length : 0;

      days.push(key.slice(5)); // MM-DD
      bookedData.push(count);
    }

    new Chart(weeklyChartCanvas, {
      type: "bar",
      data: {
        labels: days,
        datasets: [{
          label: "Seats Booked",
          data: bookedData,
          backgroundColor: "#42a5f5"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 50
          }
        }
      }
    });
  }

  drawWeeklyChart();
});
