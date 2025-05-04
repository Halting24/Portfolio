$(document).ready(function () {
  const sections = $(".container[id]"); // Select all containers with an id
  const navLinks = $(".nav-link"); // Select all nav links

  $(window).on("scroll", function () {
    let currentScroll = $(this).scrollTop(); // Get current scroll position
    let navbarHeight = $(".navbar").outerHeight(); // Get navbar height

    sections.each(function () {
      const sectionTop = $(this).offset().top - navbarHeight - 10; // Section top position
      const sectionBottom = sectionTop + $(this).outerHeight();

      if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
        const id = $(this).attr("id"); // Get the current container's id
        navLinks.removeClass("active-link"); // Remove active class from all links
        $(`.nav-link[href="#${id}"]`).addClass("active-link"); // Add active class to the current link
      }
    });
  });

  // Smooth scrolling for nav links
});
