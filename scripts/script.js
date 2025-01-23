/// Get the loading screen element
const loadingText = document.getElementById('ldT');
const loadingScreen = document.getElementById('loading-screen');

// Function to show the loading screen
function showLoadingScreen() {
  loadingScreen.style.display = 'flex';
}
// Function to check internet connection
function checkInternetConnection() {
  return navigator.onLine;
}

// Function to hide the loading screen
function hideLoadingScreen() {
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 10000);
}

// Check internet connection every 2 seconds
setInterval(() => {
  if (checkInternetConnection()) {
    hideLoadingScreen();
  }else {
    loadingText.style.color= 'red';
    loadingText.style.fontSize= '1rem';
    loadingText.textContent= "Something went wrong!";
  loadingText.classList.add('shakee');
}
}, 10000);

// Hide the loading screen if the internet connection is already established

if (checkInternetConnection()) {
  hideLoadingScreen();
  loadingText.style.fontSize= '2rem';
  loadingText.textContent= "AJIBODE";
  loadingText.classList.add('show');
}
 


// Show the loading screen when the page loads
document.addEventListener('DOMContentLoaded', () => {
  showLoadingScreen();
});

//END OF LOADING FUNCTIONS



// Function to toggle the main menu visibility
function toggleMenu() {
    var menu = document.getElementById('me_nu');
    var menuButton = document.querySelector('.menu-button');
    var menuButtonIcon = document.querySelector('.menu-button .material-symbols-outlined');
const hc = document.getElementById('hc');
    const overlay = document.getElementById('lay');

    // Check if the menu is open
    var isMenuOpen = menu.classList.contains('active');

    if (isMenuOpen) {
        // Close the menu and reset submenus
        menu.classList.remove('active');
        menuButton.classList.remove('rotate');
        menuButtonIcon.textContent = 'lists';
        document.body.classList.remove('disable-interactions');
        resetSubmenus(); // Reset all submenus
        overlay.style.display='none';
    } else {
        // First reset submenus, then open the menu
        resetSubmenus();
        menu.classList.add('active');
        menuButton.classList.add('rotate');
        menuButtonIcon.textContent = 'close';
        document.body.classList.add('disable-interactions');
          hc.style.overflow='auto';
        overlay.style.display='block';
     }
}
function openMenus() {
    var menu = document.getElementById('me_nu');
    var menuButton = document.querySelector('.menu-button');
    var menuButtonIcon = document.querySelector('.menu-button .material-symbols-outlined');
const hc = document.getElementById('hc');
    const overlay = document.getElementById('lay');

    resetSubmenus();
        menu.classList.add('active');
        menuButton.classList.add('rotate');
        menuButtonIcon.textContent = 'close';
        document.body.classList.add('disable-interactions');
          hc.style.overflow='auto';
    overlay.style.display='block';
}

// Function to close the menu and reset submenus
function closeMenus() {
    var menu = document.getElementById('me_nu');
    var menuButton = document.querySelector('.menu-button');
    var menuButtonIcon = document.querySelector('.menu-button .material-symbols-outlined');
const overlay = document.getElementById('lay');

    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuButton.classList.remove('rotate');
        menuButtonIcon.textContent = 'lists';
        document.body.classList.remove('disable-interactions');
        resetSubmenus(); // Reset all submenus
        overlay.style.display='none';
    }
}

// Function to reset all submenus' visibility
function resetSubmenus() {
    var submenus = document.querySelectorAll('.dropdown > ul');
    submenus.forEach(function (submenu) {
        submenu.classList.remove('expanded'); // Ensure all submenus are closed
    });
}

// Add click listener to close the menu on outside clicks
document.addEventListener('click', function (event) {
    var menu = document.getElementById('me_nu');
    var isMenuClick = event.target.closest('.menu-button') || event.target.closest('#me_nu');

    if (!isMenuClick) {
        closeMenus();
    }
});

// Close menu on scroll
window.addEventListener('scroll', closeMenus);

// Toggle submenu visibility
var dropdowns = document.querySelectorAll('.dropdown > a');
dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('click', function (event) {
        event.preventDefault();

        var submenu = this.nextElementSibling;

        if (submenu) {
            submenu.classList.toggle('expanded');
        }
    });
});



 /*  let startX = 0;
        let endX = 0;

        // Capture the starting touch position
        document.addEventListener("touchstart", (event) => {
            startX = event.touches[0].clientX;
        });

        // Track the touch movement
        document.addEventListener("touchmove", (event) => {
            endX = event.touches[0].clientX;
        });

        // Determine swipe direction
        document.addEventListener("touchend", () => {
            if (endX - startX > 100) { // Swipe right threshold
                openMenus()
            } else if (startX - endX > 100) { // Swipe left threshold
                closeMenus(); // Hide menu
            }
            // Reset positions
            startX = 0;
            endX = 0;
        });

*/




//MENU BACK UP FUNCTION

/*// Function to toggle the main menu visibility
function toggleMenu() {
  var menu = document.getElementById('me_nu');
  var menuButton = document.querySelector('.menu-button');
  var menuButtonIcon = document.querySelector('.menu-button .material-symbols-outlined');

  // Toggle menu visibility
  var isMenuOpen = menu.style.display === 'block';
  menu.style.display = isMenuOpen ? 'none' : 'block';
  
  // Rotate the menu button and change the icon
  menuButton.classList.toggle('rotate', !isMenuOpen);
  menuButtonIcon.textContent = isMenuOpen ? 'lists' : 'close'; // Replace 'close' with your desired icon name

  // Disable interactions outside the dropdown if open
  document.body.style.pointerEvents = !isMenuOpen ? 'none' : 'auto';
  menu.style.pointerEvents = 'auto'; // Enable interaction with the menu itself

  // Reset all submenus when closing the menu
  if (isMenuOpen) {
    resetSubmenus();
  }
}

// Function to close menus and reset the button rotation
function closeMenus() {
  var menu = document.getElementById('me_nu');
  var menuButton = document.querySelector('.menu-button');
  var menuButtonIcon = document.querySelector('.menu-button .material-symbols-outlined');

  if (menu.style.display === 'block') {
    menu.style.display = 'none';
    menuButton.classList.remove('rotate'); // Reset rotation
    menuButtonIcon.textContent = 'lists'; // Reset icon to the default
    document.body.style.pointerEvents = 'auto'; // Re-enable interaction globally
    resetSubmenus(); // Reset all submenus
  }
}

// Function to reset all submenus' visibility
function resetSubmenus() {
  var submenus = document.querySelectorAll('.dropdown ul');
  submenus.forEach(function (submenu) {
    submenu.style.display = 'none';
  });
}

// Add click listener to document to close the menu on outside clicks
document.addEventListener('click', function (event) {
  var menu = document.getElementById('me_nu');
  var isMenuClick = event.target.closest('.menu-button') || event.target.closest('#me_nu');

  if (!isMenuClick) {
    closeMenus();
  }
});

// Add global scroll listener to close the menu
window.addEventListener('scroll', closeMenus);



// Toggle submenu visibility (keeps nested dropdown functionality)
var dropdowns = document.querySelectorAll('.dropdown > a');
dropdowns.forEach(function (dropdown) {
  dropdown.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Auto-expand the nested `<ul>`
    var submenu = this.nextElementSibling;
    if (submenu) {
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    }
  });
});*/
