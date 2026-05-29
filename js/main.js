const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll(".site-nav__link");
const root = document.documentElement;

if (header && nav && navToggle) {
  const setHeaderOffset = () => {
    const offset = Math.ceil(header.getBoundingClientRect().height + 8);
    root.style.setProperty("--header-offset", `${offset}px`);
  };

  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
    setHeaderOffset();
  };

  const closeNav = () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 63.999rem)").matches) {
        closeNav();
      }
    });
  });

  window.addEventListener("scroll", setHeaderState, { passive: true });
  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 63.999rem)").matches) {
      closeNav();
    }

    setHeaderOffset();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  setHeaderState();
  window.addEventListener("load", setHeaderOffset);
}

const faqQuestions = document.querySelectorAll("[data-faq-question]");
if (faqQuestions.length) {
  const setFaqState = (activeButton = null) => {
    faqQuestions.forEach((button) => {
      const panelId = button.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      const isActive = button === activeButton;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-expanded", String(isActive));

      if (isActive) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }

      if (panel) {
        panel.hidden = !isActive;
        panel.classList.toggle("is-open", isActive);
      }
    });
  };

  faqQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const isAlreadyOpen = button.getAttribute("aria-expanded") === "true";
      setFaqState(isAlreadyOpen ? null : button);
    });
  });
}