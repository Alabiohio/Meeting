// script.js

const modeToggle = document.getElementById('modeToggle');
const body = document.body;


// Check for saved mode in localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

// Toggle between light and dark mode
modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    
    
    // Save the mode in localStorage
    if (body.classList.contains('dark-mode')){ 
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

