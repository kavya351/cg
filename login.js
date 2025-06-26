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
  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const empId = document.getElementById("employeeId").value.trim();
    const empName = document.getElementById("employeeName").value.trim();

    const isValid = allowedEmployees.some(
      emp => emp.id.toLowerCase() === empId.toLowerCase() &&
             emp.name.toLowerCase() === empName.toLowerCase()
    );

    if (isValid) {
      localStorage.setItem("loggedInUser", empName);
      window.location.href = "seating.html";
    } else {
      errorMsg.textContent = "Access denied! You are not authorized.";
    }
  });
});
