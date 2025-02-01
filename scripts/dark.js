/*document.addEventListener("DOMContentLoaded", () => {
    // Check for saved user preference in localStorage
    const isDarkMode = localStorage.getItem("dark-mode") === "enabled";

    // Apply dark mode if enabled
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }

    // Get toggle button and icon
    const themeButton = document.getElementById("dark-mode-toggle");
    const themeIcon = themeButton?.querySelector(".swTheme");

    // Set correct icon on page load
    if (themeIcon) {
        themeIcon.textContent = isDarkMode ? "light_mode" : "dark_mode";
    }

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            if (themeIcon) themeIcon.textContent = "light_mode";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            if (themeIcon) themeIcon.textContent = "dark_mode";
        }
    };

    // Attach toggle function if the button exists
    if (themeButton) {
        themeButton.addEventListener("click", toggleDarkMode);
    }
});
*/

document.addEventListener("DOMContentLoaded", () => {
    // Check for saved user preference in localStorage
    const isDarkMode = localStorage.getItem("dark-mode") === "enabled";

       if (isDarkMode) {
        document.body.classList.add("dark-mode");
           drkLight.checked = true;
        themeStatus.textContent = "Turn off dark theme";
    }
});

function themeChange() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
     themeStatus.textContent = "Turn off dark theme";
    } else {
            localStorage.setItem("dark-mode", "disabled");
           drkLight.checked = false;     
    }

}

function themeRestore() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", "disabled");
    themeStatus.textContent = "Turn on dark theme";
}

const drkLight = document.getElementById('themeToggle');
drkLight.addEventListener('change', () => {
      if (drkLight.checked) {
        themeChange();
      } else {
        themeRestore();
      }
    });




/*const drkLight = document.getElementById('themeToggle');
  // Function to toggle dark mode
    const toggleDarkMode = () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            drkLight.checked = true;
                   } else {
            localStorage.setItem("dark-mode", "disabled");
           drkLight.checked = false;        }
    };

  drkLight.addEventListener('change', toggleDarkMode);//() => {
     /* if (drkLight.checked) {
        document.body.classList.add("dark-mode");
      }// else {
        //turnOffFlashlight();
     // }
    });*/