document.addEventListener("DOMContentLoaded", function () {
  const introMessage = "Attempting unauthorized access...";
  const binaryMessage = "101010001010101100 10101000101101010011010101";
  const finalMessage = "ACCESS GRANTED: YOU'RE IN. ENJOY";

  const welcomeElement = document.getElementById("welcome-message");
  const terminalLanding = document.getElementById("terminal-landing");
  const mainContent = document.getElementById("main-content");

  // Check if the screen width is large enough
  const isLargeScreen = window.matchMedia("(min-width: 993px)").matches;

  if (isLargeScreen) {
    function typeIntro(callback) {
      let index = 0;
      function type() {
        if (index < introMessage.length) {
          welcomeElement.textContent += introMessage[index];
          index++;
          setTimeout(type, 50);
        } else {
          setTimeout(callback, 700);
        }
      }
      type();
    }

    function typeBinary(callback) {
      let index = 0;
      welcomeElement.textContent = "";
      function type() {
        if (index < binaryMessage.length) {
          welcomeElement.textContent += binaryMessage[index];
          index++;
          setTimeout(type, 3);
        } else {
          setTimeout(callback, 500);
        }
      }
      type();
    }

    function typeFinal(callback) {
      let index = 0;
      welcomeElement.textContent = "";
      function type() {
        if (index < finalMessage.length) {
          welcomeElement.textContent += finalMessage[index];
          index++;
          setTimeout(type, 70);
        } else {
          setTimeout(callback, 1000);
        }
      }
      type();
    }

    // Launch sequence
    typeIntro(() => {
      typeBinary(() => {
        typeFinal(() => {
          terminalLanding.style.display = "none"; // Hide terminal
          mainContent.style.display = "block"; // Show main content
          setTimeout(() => {
            mainContent.classList.add("visible"); // Add fade-in effect after display
          }, 50); // Slight delay to ensure transition works
        });
      });
    });
  } else {
    // If not a large screen, show main content immediately
    terminalLanding.style.display = "none";
    mainContent.style.display = "block";
    mainContent.classList.add("visible");
  }
});
