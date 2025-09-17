
// const toggle = document.getElementById("theme-toogle"); // must match your HTML
// const body = document.body;

// // Load saved theme
// if (localStorage.getItem("theme") === "dark") {
//   body.classList.add("dark-mode");
// }

// // Toggle theme on click
// toggle.addEventListener("click", () => {
//   body.classList.toggle("dark-mode");
//   if (body.classList.contains("dark-mode")) {
//     localStorage.setItem("theme", "dark");
//   } else {
//     localStorage.setItem("theme", "light");
//   }
// });
const allLinks = document.querySelectorAll(".nav-bar a");

allLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!document.startViewTransition) {
      // Fallback: normal navigation
      return;
    }

    event.preventDefault(); // stop instant reload
    const url = link.href;

    // Animate + navigate
    document.startViewTransition(() => {
      // optional: update active class before navigation
      allLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      window.location.href = url; // go to next page
    });
  });
});

