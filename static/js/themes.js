function applyTheme(themeId) {
  const themeDiv = document.getElementById("light") || document.getElementById("dark");
  if (themeDiv) {
    themeDiv.id = themeId;
  }

  const icon = document.getElementById("theme-icon");
  if (icon) {
    if (themeId === "light") {
      icon.classList.remove("bi-sun-fill", "icon-dark");
      icon.classList.add("bi-moon-fill", "icon-light");
    } else {
      icon.classList.remove("bi-moon-fill", "icon-light");
      icon.classList.add("bi-sun-fill", "icon-dark");
    }
  }
}

function themeChange() {
  const currentTheme = localStorage.getItem("theme") || "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  const btn = document.getElementById("themechange");
  btn.addEventListener("click", themeChange);
});
