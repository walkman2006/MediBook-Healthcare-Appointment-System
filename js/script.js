(function () {
  "use strict";
  var specialties = [
    ["General Physician", "Primary care for overall health, routine checkups & common illnesses", "24+", "♧"],
    ["Cardiologist", "Heart specialists for cardiovascular conditions, hypertension & ECG", "18+", "♡"],
    ["Dermatologist", "Skin, hair, nail treatments & cosmetic dermatology", "15+", "✧"],
    ["Pediatrician", "Specialized healthcare & vaccinations for infants, children & teens", "20+", "♧"],
    ["Neurologist", "Brain, spinal cord & nervous system disorder specialists", "12+", "♧"],
    ["Orthopedic", "Bone, joint, spine care & sports medicine specialists", "16+", "⌁"],
    ["Dentist", "Dental care, teeth whitening, orthodontics & oral surgery", "22+", "☺"],
    ["Gynecologist", "Women's reproductive health, prenatal care & wellness", "14+", "♙"]
  ];
  var doctors = [
    ["Dr. Ananya Sharma", "Cardiologist", "Apollo Medical Center", "4.9", "AS"],
    ["Dr. Rohan Mehta", "General Physician", "MediCare Hospital", "4.8", "RM"],
    ["Dr. Priya Nair", "Dermatologist", "ClearSkin Clinic", "4.9", "PN"],
    ["Dr. Vikram Rao", "Orthopedic", "Fortis Healthcare", "4.7", "VR"],
    ["Dr. Sneha Kapoor", "Pediatrician", "Rainbow Children's Hospital", "4.9", "SK"],
    ["Dr. Arjun Iyer", "Neurologist", "Apollo Medical Center", "4.8", "AI"]
  ];
  function qs(selector) { return document.querySelector(selector); }
  function goToDoctors(query, specialty, location) {
    var params = new URLSearchParams();
    if (query) params.set("q", query);
    if (specialty) params.set("specialty", specialty);
    if (location) params.set("location", location);
    window.location.href = "doctors.html" + (params.toString() ? "?" + params.toString() : "");
  }
  var menu = qs(".menu-toggle");
  if (menu) menu.addEventListener("click", function () { var nav = qs(".main-nav"); if (nav) nav.classList.toggle("open"); });
  var homeSearchButton = qs("#home-search-button");
  if (homeSearchButton) homeSearchButton.addEventListener("click", function () { goToDoctors(qs("#home-search").value, qs("#home-specialty").value, qs("#home-location").value); });
  var grid = qs("#specialty-grid");
  if (grid) {
    grid.innerHTML = specialties.map(function (item) { return '<article class="specialty-card" data-specialty="' + item[0] + '"><div class="specialty-icon">' + item[3] + '</div><h3>' + item[0] + '</h3><p>' + item[1] + '</p><span class="specialty-count">' + item[2] + ' Specialists</span></article>'; }).join("");
    grid.addEventListener("click", function (event) { var card = event.target.closest(".specialty-card"); if (card) { var select = qs("#doctor-specialty"); select.value = card.dataset.specialty; renderDoctors(); document.querySelector(".doctors-results").scrollIntoView({ behavior: "smooth" }); } });
  }
  function renderDoctors() {
    var list = qs("#doctor-list"); if (!list) return;
    var query = (qs("#doctor-search").value || "").toLowerCase();
    var specialty = qs("#doctor-specialty").value;
    var location = (qs("#doctor-location").value || "").toLowerCase();
    var filtered = doctors.filter(function (doctor) { return (!query || doctor.join(" ").toLowerCase().includes(query)) && (!specialty || doctor[1] === specialty) && (!location || doctor[2].toLowerCase().includes(location)); });
    list.innerHTML = filtered.length ? filtered.map(function (doctor) { return '<article class="doctor-list-card"><div class="avatar avatar-ananya">' + doctor[4] + '</div><div><h3>' + doctor[0] + '</h3><p>' + doctor[1] + '</p><p>' + doctor[2] + '</p><span class="rating">★ ' + doctor[3] + ' · Verified</span></div><a class="button" href="booking.html?doctor=' + encodeURIComponent(doctor[0]) + '&specialty=' + encodeURIComponent(doctor[1]) + '">Book</a></article>'; }).join("") : '<p class="form-message error">No specialists match those filters. Try another search.</p>';
  }
  if (grid) {
    var params = new URLSearchParams(window.location.search);
    qs("#doctor-search").value = params.get("q") || "";
    qs("#doctor-specialty").value = params.get("specialty") || "";
    qs("#doctor-location").value = params.get("location") || "";
    ["#doctor-search", "#doctor-specialty", "#doctor-location"].forEach(function (selector) { qs(selector).addEventListener("input", renderDoctors); });
    qs("#doctor-search-button").addEventListener("click", renderDoctors);
    renderDoctors();
  }
  var demoData = { patient: ["patient@medibook.demo", "password"], doctor: ["doctor@medibook.demo", "password"], admin: ["admin@medibook.demo", "password"] };
  document.querySelectorAll("[data-demo]").forEach(function (button) { button.addEventListener("click", function () { var data = demoData[button.dataset.demo]; qs("#login-email").value = data[0]; qs("#login-password").value = data[1]; qs("#demo-details").innerHTML = "Demo Email: <span>" + data[0] + "</span><br>Password: <span>" + data[1] + "</span>"; document.querySelectorAll("[data-demo]").forEach(function (item) { item.style.background = "#fff"; item.style.color = "var(--navy)"; }); button.style.background = "var(--teal)"; button.style.color = "#fff"; }); });
  var toggle = qs(".password-toggle");
  if (toggle) toggle.addEventListener("click", function () { var password = qs("#login-password"); password.type = password.type === "password" ? "text" : "password"; toggle.textContent = password.type === "password" ? "◉" : "◌"; });
  var loginForm = qs("#login-form");
  if (loginForm) loginForm.addEventListener("submit", function (event) { event.preventDefault(); var message = qs("#login-message"); message.className = "form-message success"; message.textContent = "Demo sign-in successful. Your portal would open here."; });
  var registerForm = qs("#register-form");
  if (registerForm) registerForm.addEventListener("submit", function (event) { event.preventDefault(); var message = qs("#register-message"); message.className = "form-message success"; message.textContent = "Registration complete. You can now log in to your portal."; });
  var forgot = qs("#forgot-password");
  if (forgot) forgot.addEventListener("click", function (event) { event.preventDefault(); qs("#login-message").textContent = "For this demo, use one of the quick login accounts above."; qs("#login-message").className = "form-message"; });
  var timeSlots = qs("#time-slots");
  if (timeSlots) timeSlots.addEventListener("click", function (event) { if (event.target.tagName === "BUTTON") { timeSlots.querySelectorAll("button").forEach(function (button) { button.classList.remove("selected"); }); event.target.classList.add("selected"); } });
  var bookingForm = qs("#booking-form");
  if (bookingForm) {
    var bookingParams = new URLSearchParams(window.location.search);
    if (bookingParams.get("doctor")) qs("#booking-doctor").textContent = bookingParams.get("doctor");
    if (bookingParams.get("specialty")) qs("#booking-specialty").textContent = bookingParams.get("specialty") + " · Apollo Medical Center";
    bookingForm.addEventListener("submit", function (event) { event.preventDefault(); var message = qs("#booking-message"); if (!qs(".time-slots .selected")) { message.className = "form-message error"; message.textContent = "Please select an available time slot."; return; } message.className = "form-message success"; message.textContent = "Appointment confirmed! A notification has been scheduled for you."; });
  }
})();
