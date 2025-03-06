swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    spaceBetween: 100,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

swiper = new Swiper(".logo-swiper", {
  slidesPerView: 4.3,
  spaceBetween: 0,
  loop: false,
  speed: 300,
  resistance: false,
  freeMode: true,
  freeModeMomentum: true,
  freeModeMomentumRatio: 0.5,
  breakpoints: {
    480: {
      slidesPerView: 3.5,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
    992: {
      slidesPerView: 6,
      spaceBetween: 60,
    },
    1200: {
      slidesPerView: 7,
      spaceBetween: 70,
    },
  },
});

swiper = new Swiper(".logo-slider-card", {
  loop: false,
  slidesPerView: 2.5,
  spaceBetween: 25,
  speed: 300,
  resistance: false,
  freeMode: true,
  freeModeMomentum: true,
  freeModeMomentumRatio: 0.5,
  breakpoints: {
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 7,
    },
    1024: {
      slidesPerView: 4.5,
    },
  },
});

swiper = new Swiper(".swiper-main", {
  loop: false,
  slidesPerView: 3,
  spaceBetween: 10,
  speed: 300,
  resistance: false,
  freeMode: true,
  freeModeMomentum: true,
  freeModeMomentumRatio: 0.5,
  breakpoints: {
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 6,
    },
  },
});
swiper = new Swiper(".swiper-logo", {
  loop: false,
  slidesPerView: 2.5,
  spaceBetween: 10,
  speed: 300,
  resistance: false,
  freeMode: true,
  freeModeMomentum: true,
  freeModeMomentumRatio: 0.5,
  breakpoints: {
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 6,
    },
  },
});
swiper = new Swiper(".swiper-container", {
  direction: "vertical",
  slidesPerView: 5.5,
  spaceBetween: 10,
  navigation: {
    nextEl: ".fa-angle-down ",
    prevEl: ".fa-angle-up",
  },
  loop: false,
  480: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 3,
  },
});
swiper = new Swiper(".swiper-add", {
  loop: false,
  slidesPerView: 5,
  spaceBetween: 10,
  speed: 300,
  resistance: false,
  freeMode: true,
  freeModeMomentum: true,
  freeModeMomentumRatio: 0.5,
  breakpoints: {
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 5,
    },
    992: {
      slidesPerView: 6,
    },
    1200: {
      slidesPerView: 9.5,
    },
  },
});
swiper = new Swiper(".mobile-swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    spaceBetween: 500,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

document.querySelectorAll(".toggle-content").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const targetContent = document.querySelector(
      this.getAttribute("data-target")
    );

    targetContent.classList.toggle("hidden");

    const icon = this.querySelector(".arrow-icon");
    icon.classList.toggle("rotate-icon");
  });
});

window.onscroll = function () {
  toggleScrollToTopButton();
};

function toggleScrollToTopButton() {
  const btn = document.querySelector(".scrollToTopBtn");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector(".toggle-coupon").addEventListener("click", function () {
  const couponContainer = document.querySelector(".coupon-container");
  couponContainer.classList.toggle("open");
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/src/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

function internetConnection() {
  return {
    isOnline: navigator.onLine,
    init() {
      this.checkConnection();
      window.addEventListener('online', () => this.checkConnection());
      window.addEventListener('offline', () => this.checkConnection());
    },
    checkConnection() {
      this.isOnline = navigator.onLine;
      document.getElementById('modal').style.display = this.isOnline ? 'none' : 'flex';
      document.getElementById('modal-message').textContent = this.isOnline ? '' : 'You are offline. Please check your internet connection.';
    },
  };
}

window.onload = () => {
  const connection = internetConnection();
  connection.init();
};
