// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Post Filtering Functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const postCards = document.querySelectorAll(".post-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      postCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Theme Toggle Functionality
  const themeToggleBtn = document.createElement("button");
  themeToggleBtn.classList.add("theme-toggle");
  themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(themeToggleBtn);

  // Check for saved theme preference or respect OS preference
  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  }

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeToggleBtn.innerHTML =
      theme === "light"
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
  }

  // Search Functionality
  const searchInputs = document.querySelectorAll('input[type="text"]');
  searchInputs.forEach((input) => {
    input.addEventListener("keyup", function () {
      const searchTerm = this.value.toLowerCase();

      // If we're on the blog posts page, filter posts
      if (
        window.location.hash === "#posts" ||
        document.querySelector(".blog-posts")
      ) {
        postCards.forEach((card) => {
          const title = card
            .querySelector(".post-title")
            .textContent.toLowerCase();
          const excerpt = card
            .querySelector(".post-excerpt")
            .textContent.toLowerCase();

          if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }
    });
  });

  // Sticky sidebar on scroll
  window.addEventListener("scroll", function () {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    const mainContainer = document.querySelector(".main-container");
    const sidebarTop = sidebar.getBoundingClientRect().top;
    const footer = document.querySelector(".footer");
    const footerTop = footer.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    if (window.innerWidth >= 993) {
      if (footerTop < viewportHeight) {
        sidebar.style.position = "absolute";
        sidebar.style.bottom = "0";
        sidebar.style.top = "auto";
      } else {
        sidebar.style.position = "sticky";
        sidebar.style.bottom = "auto";
        sidebar.style.top = "100px";
      }
    }
  });

  // Animation on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(".post-card, .widget");

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize elements for animation
  const animatedElements = document.querySelectorAll(".post-card, .widget");
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  // Category filter from sidebar
  const categoryLinks = document.querySelectorAll(".categories-list a");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.getAttribute("data-category");

      // Update filter buttons
      filterButtons.forEach((btn) => {
        if (btn.getAttribute("data-filter") === category) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Filter posts
      postCards.forEach((card) => {
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      // Scroll to posts section
      const postsSection = document.getElementById("posts");
      if (postsSection) {
        window.scrollTo({
          top: postsSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});
