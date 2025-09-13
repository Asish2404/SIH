// service part

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".our_services ul li");
    let index = 0;

    function showNext() {
        // Hide current
        items.forEach((item, i) => {
            item.classList.remove("active");
        });

        // Show next
        items[index].classList.add("active");

        // Move to next
        index = (index + 1) % items.length;
    }

    // Show the first immediately
    showNext();

    // Change every 5 seconds
    setInterval(showNext, 5000);
});

// why choose us part
document.addEventListener("DOMContentLoaded", () => {
    const whySection = document.querySelector(".why");
    const reason = document.querySelector("#reason");
    const listItems = document.querySelectorAll(".us ul li");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          whySection.classList.add("show");

          // Show reason paragraph first
          setTimeout(() => {
            reason.classList.add("show");
          }, 400);

          // Show list items one by one
          let delay = 800;
          listItems.forEach((item) => {
            setTimeout(() => {
              item.classList.add("show");
            }, delay);
            delay += 400; // stagger effect
          });

          observer.disconnect(); // run only once
        }
      });
    }, { threshold: 0.3 });

    observer.observe(whySection);
  });