const intro = document.querySelector(".door-intro");
const openButton = document.querySelector(".open-invite");
const petalsLayer = document.querySelector(".petals");
const countdownTarget = new Date("2026-06-13T20:30:00+02:00").getTime();

document.body.classList.add("intro-active");

function openInvite() {
  if (!intro || intro.classList.contains("opened")) {
    return;
  }

  intro.classList.add("opened");
  window.setTimeout(() => {
    intro.classList.add("hidden");
    document.body.classList.remove("intro-active");
  }, 1850);
}

openButton?.addEventListener("click", openInvite);
window.setTimeout(openInvite, 1200);

function createPetals() {
  if (!petalsLayer) {
    return;
  }

  const count = window.matchMedia("(min-width: 760px)").matches ? 34 : 22;

  for (let index = 0; index < count; index += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.setProperty("--start", `${Math.random() * 100}vw`);
    petal.style.setProperty("--drift", `${(Math.random() * 28 - 14).toFixed(1)}vw`);
    petal.style.setProperty("--size", `${Math.random() * 10 + 8}px`);
    petal.style.setProperty("--duration", `${Math.random() * 9 + 11}s`);
    petal.style.setProperty("--delay", `${Math.random() * -18}s`);
    petalsLayer.appendChild(petal);
  }
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();
  const distance = countdownTarget - now;
  const elements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  if (distance <= 0) {
    elements.days.textContent = "00";
    elements.hours.textContent = "00";
    elements.minutes.textContent = "00";
    elements.seconds.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  elements.days.textContent = pad(days);
  elements.hours.textContent = pad(hours);
  elements.minutes.textContent = pad(minutes);
  elements.seconds.textContent = pad(seconds);
}

createPetals();
updateCountdown();
window.setInterval(updateCountdown, 1000);
