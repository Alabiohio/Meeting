const headMonth = document.getElementById('wkdM');
const selectWeekList = document.querySelector(".sw");
const overlay = document.getElementById('alert1');
const alertText = document.getElementById('alertT');
const contentLoading = document.getElementById('loadLay');
const wkdCont = document.querySelector(".dynaCont");

// DATES
const wkDateText1 = document.querySelectorAll(".wkDateText1");
const wkDateText2 = document.querySelectorAll(".wkDateText2");
const wkDateText3 = document.querySelectorAll(".wkDateText3");
const wkDateText4 = document.querySelectorAll(".wkDateText4");

// SONGS
let openSongElements = document.querySelectorAll('.wkdSong');
let chairmans = document.querySelectorAll('.chairman');// CHAIRMAN
let pubSpeaker = document.querySelectorAll('.pubSpeakers'); // PUBLIC TALK SPEAKER
let pubTalk = document.querySelectorAll('.pubTkTitles');// PUBLIC TALK TITLE
let watchTower = document.querySelectorAll('.wthR');// WATCHTOWER READER
let studyArticle = document.querySelectorAll('.stdy');// STUDY ARTICLE



function showAlert(message) {
      const overlay = document.getElementById('alert1');
      const alertText = document.getElementById('alertT');
      alertText.textContent = message;
      overlay.classList.add('active'); // Show the alert
      overlay.style.display = "block";
    }

    // Function to hide the alert
/*    function hideAlert() {
      const overlay = document.getElementById('alert1');
      overlay.classList.add('undo'); // Hide the alert
          
       // Wait a little before hiding the alert box
        setTimeout(() => {
            overlay.classList.remove("active", "undo");
            overlay.style.display = "none"; // Hide the element
        }, 10); // Matches animation duration
          
    }
 */


function hideAlert() {
    const overlay = document.getElementById('alert1');
    overlay.classList.add('undo'); // Start hiding animation

    // Wait for the animation to finish before hiding the alert box
    setTimeout(() => {
        overlay.classList.remove("active", "undo");
        overlay.style.display = "none"; // Fully hide the element
    }, 500); // Matches CSS animation duration (0.5s)
}

    // Add event listener for the "Ok" button
    document.getElementById('ok').addEventListener('click', hideAlert);

function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}



async function fetchWeekend(button) {
    console.log("started");
    try {
          
          contentLoading.style.display = 'flex';
          
          
          await delay(5000);
          
        let wkdResponse = await fetch(weekendUrl);
         if (wkdResponse.status == "500") {
              showAlert('Server Error');
         } else if (!wkdResponse.ok) {
              showAlert("Something went wrong");
              throw new Error(`HTTP Error: ${wkdResponse.status}`);
        }

        let wkdInfo = await wkdResponse.json();
          
          wkdM.textContent = wkdInfo.month; // HEADER MONTH
          
          // MONTH
              wkDateText1.forEach(wkDateText1 => { 
                wkDateText1.textContent = wkdInfo.wkndDate.wkdDate1;
          });  
          
          wkDateText2.forEach(wkDateText2 => { 
                wkDateText2.textContent = wkdInfo.wkndDate.wkdDate2;
          });
          
          wkDateText3.forEach(wkDateText3 => { 
                wkDateText3.textContent = wkdInfo.wkndDate.wkdDate3;
          });
          
          wkDateText4.forEach(wkDateText4 => { 
                wkDateText4.textContent = wkdInfo.wkndDate.wkdDate4;
          });
          
          // SONGS
// Convert NodeList to an array and loop through it
openSongElements.forEach((element, index) => {
    let songKey = `wkdSng${index + 1}`; // Dynamically get keys: wkdSng1, wkdSng2, etc.
    element.textContent = wkdInfo.openSong[songKey] || "No song found"; // Set text
});
          // CHAIRMAN
          chairmans.forEach((element, index) => {
    let songKey = `chMan${index + 1}`; // Dynamically get keys: wkdSng1, wkdSng2, etc.
    element.textContent = wkdInfo.chairman[songKey] || "No song found"; // Set text
});
          // PUBLIC SPEAKER
          pubSpeaker.forEach((element, index) => {
    let songKey = `spk${index + 1}`; // Dynamically get keys: wkdSng1, wkdSng2, etc.
    element.textContent = wkdInfo.speaker[songKey] || "No song found"; // Set text
});
          // PUBLIC TALK TITLE
          pubTalk.forEach((element, index) => {
    let songKey = `pTalk${index + 1}`; // Dynamically get keys: wkdSng1, wkdSng2, etc.
    element.textContent = wkdInfo.publicTalk[songKey] || "No song found"; // Set text
});
          // WATCHTOWER
          watchTower.forEach((element, index) => {
    let songKey = `reader${index + 1}`; // Dynamically get keys: wkdSng1, wkdSng2, etc.
    element.textContent = wkdInfo.watchTwr[songKey] || "No song found"; // Set text
});
       // STUDY ARTICLE
          studyArticle.forEach((element, index) => {
    let songKey = `study${index + 1}`; // Dynamically get keys: wkdSng1, wkdSng2, etc.
    element.textContent = wkdInfo.study[songKey] || "No song found"; // Set text
});
       
          
        // Update the current active button
        currentActiveButton = button;
          
    } catch (error) {
        console.error("Something went wrong", error);
         if (!navigator.onLine) {
               console.error('ofline');
              showAlert('Check your connection and try again');
         }
        // Reset styles to the previous active button
        if (currentActiveButton) {
            button.classList.remove("clicked"); // Remove styles from the current button
            currentActiveButton.classList.add("clicked"); // Reapply styles to the previous button
        }
    } finally {
          contentLoading.style.display = 'none';
    }
}

// HANDLING THE BUTTON



document.addEventListener("DOMContentLoaded", () => {
    const buttons = selectWeekList.querySelectorAll("li"); // Get all buttons

    // Set the default active button (hm1) and load its content
    const defaultButton = selectWeekList.querySelector("li[data-value='sw1']");
    if (defaultButton) {
        defaultButton.classList.add("clicked");
        currentActiveButton = defaultButton;
        weekendUrl = "https://ohioalabi.github.io/Ohio/monthJan.json"
          console.log(weekendUrl);
          fetchWeekend(defaultButton);
    }

    // Handle button clicks
    selectWeekList.addEventListener("click", (event) => {
        let button = event.target;

        // If not a button, find the closest button
        if (button.tagName !== "LI") {
            button = button.closest("li");
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
                case "sw1":
                 console.log('sw1');
                    weekendUrl = "https://github.com/Ohioalabi/Ohio/blob/gh-pages/monthJan.json"
                  fetchWeekend(button); // No scroll for default
                  closeMenus();
                    break;
                case "sw2":
                    weekendUrl = "https://ohioalabi.github.io/Ohio/video.html";
                    fetchWeekend(button); // Scroll left
                    closeMenus();
                    break;
                case "sw3":
                   weekendUrl = "https://ohioalabi.github.io/Ohio/audio.html";
                   fetchWeekend(button); // No scroll
                   closeMenus();
                   break;
                default:
                    console.log("Unhandled button value:", value);
            }
        }
    });
});




