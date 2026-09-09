/* ============================================================
   Feed layer: scroll-reveal for kinetic story lines + cards.
   ============================================================ */
(function () {
  const targets = document.querySelectorAll(".rise");
  if (!("IntersectionObserver" in window) || !targets.length) {
    targets.forEach((t) => t.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((t) => io.observe(t));
})();
