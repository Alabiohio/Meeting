window.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('searchBT');
  const searchInput = document.getElementById('s');

  // Auto-focus the input when the page loads
  searchInput.focus();

  // Handle search button click
  searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
      alert("Oops! Seems you entered a blank field.");
      return;
    }
    window.location.href = `sss.html?q=${encodeURIComponent(searchTerm)}`;
  });

  // Handle auto-focus when input is clicked
  searchInput.addEventListener('click', function () {
    searchInput.focus();
  });
});