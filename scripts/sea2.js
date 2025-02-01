 // Predefined suggestions (no links)
    const predefinedSuggestions = [
      { text: "This week meeting?", link: 'index.html' },
      { text: "Next week meeting", link: null },
      { text: "Circuit 220", link: null }
    ];

    // Dynamic suggestions (with or without links)
    const dynamicSuggestions = [
      { text: "Ajibode is located in 19, Olayinka Olugoke Street, Idimu, Lagos", link: null },
      { text: "Who is the coordinator of body of elders?", link: null },
      { text: "What is the website?", link: "https://www.jw.org" },
      { text: "Where is Ajibode?", link: "https://example.com/location" },
      { text: "What circuit is Ajibode?", link: null },
      { text: "next week's meeting?", link: null },
      { text: "next two week's meeting?", link: null },
      { text: "this week's meeting?", link: null },
      { text: "last week's meeting?", link: null },
      { text: "meeting for field service", link: null },
      { text: "circuit overseer's visit", link: null },
     { text: "field service for Saturday", link: "field.html#hc1b2" }

    ];

    const searchInput = document.getElementById('s');
    const suggestionsContainer = document.getElementById('suggestions');

    // Show predefined suggestions on page load
    function showPredefinedSuggestions() {
      suggestionsContainer.innerHTML = ''; // Clear any previous suggestions
      predefinedSuggestions.forEach(suggestion => {
        const li = document.createElement('li');
        
        // If suggestion has a link, create an anchor tag
        if (suggestion.link) {
          const link = document.createElement('a');
          link.href = suggestion.link;
          link.textContent = suggestion.text;
          li.appendChild(link);
        } else {
          li.textContent = suggestion.text;
        }

        li.addEventListener('click', () => {
          searchInput.value = suggestion.text;  // Populate input with clicked suggestion
          suggestionsContainer.style.display = 'none';  // Hide suggestions
          document.getElementById('search-form').submit();  // Trigger form submission
        });
        suggestionsContainer.appendChild(li);
      });
      suggestionsContainer.style.display = 'block';  // Show suggestions
    }

    // Show dynamic suggestions based on user input
    function showSuggestions(input) {
      const filteredSuggestions = dynamicSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(input.toLowerCase())
      );

      suggestionsContainer.innerHTML = '';  // Clear previous suggestions

      if (filteredSuggestions.length > 0) {
        suggestionsContainer.style.display = 'block';
        filteredSuggestions.forEach(suggestion => {
          const li = document.createElement('li');
          
          // If suggestion has a link, create an anchor tag
          if (suggestion.link) {
            const link = document.createElement('a');
            link.href = suggestion.link;
            link.textContent = suggestion.text;
            li.appendChild(link);
          } else {
            li.textContent = suggestion.text;
          }

          li.addEventListener('click', () => {
            searchInput.value = suggestion.text;  // Populate input with clicked suggestion
            suggestionsContainer.style.display = 'none';  // Hide suggestions
            document.getElementById('search-form').submit();  // Trigger form submission
          });
          suggestionsContainer.appendChild(li);
        });
      } else {
        suggestionsContainer.style.display = 'none';
      }
    }

    // Event listener for the search input field
    searchInput.addEventListener('input', function () {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        showSuggestions(searchTerm);  // Show dynamic suggestions based on input
      } else {
        showPredefinedSuggestions();  // Show predefined suggestions if input is empty
      }
    });

    // Show predefined suggestions when the page loads
    window.addEventListener('load', showPredefinedSuggestions);

    // Optionally focus the search field for mobile optimization
    searchInput.addEventListener('click', function () {
      searchInput.focus();
    });

    document.getElementById('search-form').addEventListener('submit', function (event) {
      const searchTerm = searchInput.value.trim();
      const errorMessage = document.getElementById('error-message');

      if (!searchTerm) {
        event.preventDefault(); // Prevent form submission
        errorMessage.style.display = 'block'; // Show error message
      } else {
        errorMessage.style.display = 'none'; // Hide error message if input is valid
      }
    });

