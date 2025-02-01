const downMenuButtons = document.querySelector("#btm");





async function fetchHomeContent(button) {
    console.log("started");
    try {
        let homeResponse = await fetch(homeUrl);
         if (homeResponse.status == "500") {
              showAlert('Server Error');
         } else if (!libResponse.ok) {
              showAlert("Something went wrong");
              throw new Error(`HTTP Error: ${libResponse.status}`);
        }

        let homeHtml = await homeResponse.text();
        dynaCont.innerHTML = homeHtml;
        

        // Update the current active button
        currentActiveButton = button;
    } catch (error) {
        console.error("Something went wrong", error);
         if (!navigator.onLine) {
              showAlert('Check your connection and try again');
         }
        // Reset styles to the previous active button
        if (currentActiveButton) {
            button.classList.remove("clicked"); // Remove styles from the current button
            currentActiveButton.classList.add("clicked"); // Reapply styles to the previous button
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = downMenuButtons.querySelectorAll("button"); // Get all buttons

    // Set the default active button (hm1) and load its content
    const defaultButton = downMenuButtons.querySelector("button[data-value='hm1']");
    if (defaultButton) {
        defaultButton.classList.add("clicked");
        currentActiveButton = defaultButton;
        libUrl = "https://ohioalabi.github.io/Ohio/library.html"; // Default URL for hm1
        fetchLibContent(0, defaultButton);
    }

    // Handle button clicks
    downMenuButtons.addEventListener("click", (event) => {
        let button = event.target;

        // If not a button, find the closest button
        if (button.tagName !== "BUTTON") {
            button = button.closest("button");
        }

        if (button && button.hasAttribute("data-value")) {
            // Clear styles for all buttons
            buttons.forEach(btn => {
                btn.classList.remove("clicked");
            });

            // Apply styles to the clicked button
            button.classList.add("clicked");
/*            public.style.borderBottom = "2px solid transparent";
            publicText.style.color = "dimgrey";
            publicText.style.fontWeight = "400";
*/
            const value = button.getAttribute("data-value");

            switch (value) {
                case "btm1":
                    libUrl = "https://ohioalabi.github.io/Ohio/library.html";
                    fetchHomeContent(button); // No scroll for default
                    break;
                case "btm2":
                    libUrl = "https://ohioalabi.github.io/Ohio/video.html";
                    fetchHomeContent(button); // Scroll left
                    break;
                case "btm3":
                   libUrl = "https://ohioalabi.github.io/Ohio/audio.html";
                   fetchHomeContent(button); // No scroll
                   break;
                default:
                    console.log("Unhandled button value:", value);
            }
        }
    });
});


