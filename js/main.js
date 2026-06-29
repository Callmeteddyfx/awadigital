const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll(".site-nav__link");
const package_dropdown = document.getElementById("contact-form__field");
const addon_dropdown = document.getElementById("addons");
const root = document.documentElement;

const palenstine_donation = "https://secure.unicef.ca/page/137694/donate/1?ea.tracking.id=23DIEM08GSE&gad_source=1&gad_campaignid=20713687814&gbraid=0AAAAAD5LRQoNOrPFzanZ4IREU8II0Q-AY&gclid=CjwKCAjwuuPRBhAnEiwA2Ji8end4rQ4PVAwQ7mj8YWO7iYh_2PMHQSyxSTxwMqjPluvO5BrWCsnvPhoCL4wQAvD_BwE";
const sudan_donation = "https://www.rescue.org/article/crisis-sudan-what-happening-and-how-help?form=sudan&ms=ws_explainer_fy26_sudan_mmus_feb&initialms=ws_explainer_fy26_sudan_mmus_feb";


const message = document.getElementById("contact_message");
const name = document.getElementById("name");
const email = document.getElementById("email");

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

const carouselTrack = document.querySelector("[data-carousel-track]");
const carouselPrev = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");

if (carouselTrack && carouselPrev && carouselNext) {
  const getScrollAmount = () => {
    const card = carouselTrack.querySelector(".featured-projects__card");
    if (!card) {
      return carouselTrack.clientWidth;
    }

    const cardWidth = card.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(carouselTrack).gap || "0") || 0;
    return cardWidth + gap;
  };

  carouselPrev.addEventListener("click", () => {
    carouselTrack.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  carouselNext.addEventListener("click", () => {
    carouselTrack.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });
}

function SelectPackage(btn_id){
    package_dropdown.value = btn_id;
    message.value = `Hello awadigital, I would love to purchase the ${btn_id} package.`
}

function SelectAddon(addon_id){
    addon_dropdown.value = addon_id;
    message.value = message.value + ` Hello awadigital, I would love to purchase the ${addon_id} add-on.`
}

function VisitDonationSite(state){
  if (state == "sudan"){
    window.location.href = sudan_donation;
  }
  else if (state == "gaza"){
    window.location.href = palenstine_donation;
  }
}