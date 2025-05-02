$(document).ready(function () {
  var lastScrollTop = 0; // Track the last scroll position
  $(".navbar").addClass("hidden");

  $(window).on("scroll", function () {
    var currentScrollTop = $(this).scrollTop();

    if (currentScrollTop > 0) {
      // User has scrolled down, show the navbar
      $(".navbar").removeClass("hidden").addClass("visible");
    } else {
      // User is at the top of the page, hide the navbar
      $(".navbar").removeClass("visible").addClass("hidden");
    }
  });

  var typing = new Typed(".typing", {
    strings: [
      "Cybersecurity Enthusiast",
      "Ethical Hacker",
      "Network Defender",
      "Malware Analyst",
      "Penetration Tester",
      "Security Researcher",
      "Digital Forensics Expert",
      "Bug Bounty Hunter",
      "Threat Analyst",
      "Future Cybersecurity Specialist",
    ],
    typeSpeed: 40,
    backSpeed: 30,
    loop: true,
    showCursor: false,
  });
});
