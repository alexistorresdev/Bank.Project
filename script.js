// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileNav = document.getElementById("mobileNav")

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active")

      // Toggle icon
      const icon = mobileMenuBtn.querySelector("i")
      if (mobileNav.classList.contains("active")) {
        icon.className = "fas fa-times"
      } else {
        icon.className = "fas fa-bars"
      }
    })

    // Close mobile menu when clicking on links
    const mobileLinks = mobileNav.querySelectorAll("a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active")
        const icon = mobileMenuBtn.querySelector("i")
        icon.className = "fas fa-bars"
      })
    })
  }

  // Account Form Submission
  const accountForm = document.getElementById("accountForm")
  if (accountForm) {
    accountForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Hide form and show success message
      const applicationForm = document.getElementById("applicationForm")
      const successMessage = document.getElementById("successMessage")

      if (applicationForm && successMessage) {
        applicationForm.style.display = "none"
        successMessage.style.display = "block"
        successMessage.scrollIntoView({ behavior: "smooth" })
      }
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Hide form and show success message
      const contactContent = document.getElementById("contactContent")
      const contactSuccessMessage = document.getElementById("contactSuccessMessage")

      if (contactContent && contactSuccessMessage) {
        contactContent.style.display = "none"
        contactSuccessMessage.style.display = "block"
        contactSuccessMessage.scrollIntoView({ behavior: "smooth" })
      }
    })
  }

  // Login Form Submission
  // const loginForm = document.getElementById("loginForm")
  // if (loginForm) {
  //   loginForm.addEventListener("submit", (e) => {
  //     e.preventDefault()

  //     // Redirect to dashboard (demo)
  //     window.location.href = "dashboard.html"
  //   })
  // }

  // Password Toggle
  const passwordToggle = document.getElementById("passwordToggle")
  const passwordInput = document.getElementById("password")

  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      const icon = passwordToggle.querySelector("i")
      if (type === "password") {
        icon.className = "fas fa-eye"
      } else {
        icon.className = "fas fa-eye-slash"
      }
    })
  }

  // Dashboard Balance Toggle
  const toggleBalances = document.getElementById("toggleBalances")
  const balanceToggleIcon = document.getElementById("balanceToggleIcon")
  const balanceToggleText = document.getElementById("balanceToggleText")

  if (toggleBalances) {
    let balancesVisible = true

    toggleBalances.addEventListener("click", () => {
      const balanceElements = document.querySelectorAll(".account-balance")

      balanceElements.forEach((element) => {
        if (balancesVisible) {
          element.textContent = "••••••"
        } else {
          const balance = element.getAttribute("data-balance")
          element.textContent =
            "$" +
            Number.parseFloat(balance).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
        }
      })

      balancesVisible = !balancesVisible

      if (balanceToggleIcon && balanceToggleText) {
        if (balancesVisible) {
          balanceToggleIcon.className = "fas fa-eye-slash"
          balanceToggleText.textContent = "Hide Balances"
        } else {
          balanceToggleIcon.className = "fas fa-eye"
          balanceToggleText.textContent = "Show Balances"
        }
      }
    })
  }

  // Dashboard Logout
  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "login.html"
    })
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Form validation enhancement
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")

    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        if (this.value.trim() === "") {
          this.style.borderColor = "var(--red-600)"
        } else {
          this.style.borderColor = "var(--gray-300)"
        }
      })

      input.addEventListener("input", function () {
        if (this.value.trim() !== "") {
          this.style.borderColor = "var(--gray-300)"
        }
      })
    })
  })

  // Add loading states to buttons
  const submitButtons = document.querySelectorAll('button[type="submit"]')
  submitButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.innerHTML
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
      this.disabled = true

      // Re-enable after form submission (for demo purposes)
      setTimeout(() => {
        this.innerHTML = originalText
        this.disabled = false
      }, 2000)
    })
  })

  // Add fade-in animation to cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll(
    ".service-card, .trust-badge, .value-card, .leader-card, .account-card, .contact-method-card",
  )
  animatedElements.forEach((element) => {
    observer.observe(element)
  })

  // Currency formatting helper
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Phone number formatting
  const phoneInputs = document.querySelectorAll('input[type="tel"]')
  phoneInputs.forEach((input) => {
    input.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "")
      if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
      } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{3})/, "($1) $2")
      }
      this.value = value
    })
  })

  // Add active states to navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-desktop a, .nav-mobile a")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    }
  })

  // Accessibility improvements
  document.addEventListener("keydown", (e) => {
    // ESC key closes mobile menu
    if (e.key === "Escape" && mobileNav && mobileNav.classList.contains("active")) {
      mobileNav.classList.remove("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.className = "fas fa-bars"
    }
  })

  // Focus management for mobile menu
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      if (mobileNav.classList.contains("active")) {
        // Focus first link when menu opens
        const firstLink = mobileNav.querySelector("a")
        if (firstLink) {
          setTimeout(() => firstLink.focus(), 100)
        }
      }
    })
  }
})

// Utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: var(--white);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        border-left: 4px solid var(--bank-navy);
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `

  if (type === "success") {
    notification.style.borderLeftColor = "var(--green-500)"
  } else if (type === "error") {
    notification.style.borderLeftColor = "var(--red-600)"
  }

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "fadeOut 0.3s ease-in"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 5000)
}

// Add CSS for notification animations
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`
document.head.appendChild(style)
