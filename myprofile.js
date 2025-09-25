//animation for progress bars
document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.getElementById("skills");
  const fills = document.querySelectorAll(".fill");

  function animateBars() {
    fills.forEach(fill => {
      const target = +fill.getAttribute("data-percent");
      let count = 0;

      // Animate width smoothly
      fill.style.width = target + "%";

      // Reset text before counting
      fill.textContent = "0%";

      // Animate number count
      const interval = setInterval(() => {
        if (count < target) {
          count++;
          fill.textContent = count + "%";
        } else {
          clearInterval(interval);
        }
      }, 20); // adjust speed if needed
    });
  }

  // Intersection Observer: triggers when 30% of the section is visible
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBars();
        observer.unobserve(entry.target); // run once
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillsSection);
});

// contact form validation
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    const formMessage = document.getElementById("form-message");

    // Simple email regex
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent actual form submission

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Validation
      if (name === "" || email === "" || message === "") {
        formMessage.textContent = "All fields are required.";
        formMessage.className = "error";
        return;
      }

      if (!isValidEmail(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.className = "error";
        return;
      }

      // Save to localStorage
      const formData = { name, email, message };
      localStorage.setItem("contactForm", JSON.stringify(formData));

      // Success message
      formMessage.textContent = "Form submitted successfully!";
      formMessage.className = "success";

      // Reset form
      form.reset();
    });
  });

