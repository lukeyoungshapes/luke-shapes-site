(function () {
  var lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  var img = lightbox.querySelector(".lightbox__img");
  var counter = lightbox.querySelector(".lightbox__counter");
  var prevBtn = lightbox.querySelector(".lightbox__prev");
  var nextBtn = lightbox.querySelector(".lightbox__next");
  var closeBtn = lightbox.querySelector(".lightbox__close");

  var images = [];
  var current = 0;

  function collectImages() {
    var hero = document.querySelector(".board-detail__hero img");
    var thumbs = document.querySelectorAll(".board-detail__thumbs img");
    images = [];
    if (hero) images.push({ src: hero.src, alt: hero.alt });
    thumbs.forEach(function (t) {
      images.push({ src: t.src, alt: t.alt });
    });
  }

  function show(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    current = index;
    img.src = images[current].src;
    img.alt = images[current].alt;
    counter.textContent = current + 1 + " / " + images.length;
  }

  function open(index) {
    collectImages();
    if (!images.length) return;
    show(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  var hero = document.querySelector(".board-detail__hero");
  if (hero) {
    hero.addEventListener("click", function () {
      open(0);
    });
  }

  var thumbs = document.querySelectorAll(".board-detail__thumb");
  var heroImg = document.querySelector(".board-detail__hero img");
  var threeDView = document.querySelector(".board-detail__3d-viewer");
  var threeDLabel = document.querySelector(".board-detail__3d-label");

  thumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      var view = this.getAttribute("data-view");
      var idx = parseInt(this.getAttribute("data-index"), 10);
      
      if (view === "3d") {
        // Switch to 3D view
        if (heroImg) heroImg.closest(".board-detail__hero").classList.add("is-hidden");
        if (threeDView) threeDView.classList.remove("is-hidden");
        if (threeDLabel) threeDLabel.classList.remove("is-hidden");
        thumbs.forEach(function (t) { t.classList.remove("is-active"); });
        this.classList.add("is-active");
      } else {
        // Switch to photo view
        if (heroImg) {
          var src = this.querySelector("img").src;
          var alt = this.querySelector("img").alt;
          heroImg.src = src;
          heroImg.alt = alt;
        }
        if (heroImg) heroImg.closest(".board-detail__hero").classList.remove("is-hidden");
        if (threeDView) threeDView.classList.add("is-hidden");
        if (threeDLabel) threeDLabel.classList.add("is-hidden");
        thumbs.forEach(function (t) { t.classList.remove("is-active"); });
        this.classList.add("is-active");
      }
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () {
    show(current - 1);
  });
  nextBtn.addEventListener("click", function () {
    show(current + 1);
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();