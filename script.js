// Navigation interactions
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Add active state animation
      this.style.transform = "translateY(-2px)";
      setTimeout(() => {
        this.style.transform = "translateY(0)";
      }, 150);
    });
  });

  // Add scroll effect to header
  let lastScrollTop = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
      header.style.transition = "transform 0.3s ease-in-out";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
      header.style.transition = "transform 0.3s ease-in-out";
    }

    lastScrollTop = scrollTop;
  });

  // Search functionality
  const searchInput = document.querySelector('input[type="text"]');
  if (searchInput) {
    searchInput.addEventListener("focus", function () {
      this.parentElement.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
    });

    searchInput.addEventListener("blur", function () {
      this.parentElement.style.boxShadow = "none";
    });
  }

  // Add hover effects to articles
  const articles = document.querySelectorAll("article");
  articles.forEach((article) => {
    article.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.transition = "transform 0.3s ease";
    });

    article.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Logo circle animation
  const logoCircle = document.querySelector(".logo-circle");
  if (logoCircle) {
    logoCircle.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotate(2deg)";
      this.style.transition = "transform 0.3s ease";
    });

    logoCircle.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  }

  // Sidebar widgets animation
  const widgets = document.querySelectorAll(".sidebar-widget");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.style.transition =
          "opacity 0.6s ease, transform 0.6s ease";
      }
    });
  }, observerOptions);

  widgets.forEach((widget) => {
    widget.style.opacity = "0";
    widget.style.transform = "translateY(20px)";
    observer.observe(widget);
  });

  // Copy link functionality (for sharing)
  function addCopyLinkFeature() {
    const postTitles = document.querySelectorAll(".post-title, h2 a");

    postTitles.forEach((title) => {
      title.addEventListener("dblclick", function () {
        navigator.clipboard.writeText(window.location.href);

        // Show copy notification
        const notification = document.createElement("div");
        notification.textContent = "Link copied to clipboard!";
        notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #333;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    z-index: 1000;
                    transition: opacity 0.3s ease;
                `;

        document.body.appendChild(notification);

        setTimeout(() => {
          notification.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 2000);
      });
    });
  }

  addCopyLinkFeature();

  // Reading progress indicator
  function addReadingProgress() {
    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 1000;
            transition: width 0.1s ease;
        `;

    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
      const scrolled =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      progressBar.style.width = scrolled + "%";
    });
  }

  addReadingProgress();
});

// Theme toggle functionality (bonus feature)
function addThemeToggle() {
  const themeToggle = document.createElement("button");
  themeToggle.innerHTML = "🌙";
  themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        cursor: pointer;
        font-size: 20px;
        z-index: 1000;
        transition: transform 0.3s ease;
    `;

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    this.innerHTML = document.body.classList.contains("dark-theme")
      ? "☀️"
      : "🌙";
    this.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });

  document.body.appendChild(themeToggle);
}

// Uncomment to enable theme toggle
// addThemeToggle();
