 let debounceTimeout;

    // Function to debounce search processing
    const debounceSearch = (query) => {
      clearTimeout(debounceTimeout);  // Clear previous timeout if any

      debounceTimeout = setTimeout(() => {
        performSearch(query);  // Perform the search after a delay
      }, 300);  // 300ms delay before search is executed
    };

    // Get the query from the URL
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');

    // Display the search term
    document.getElementById('search-term').textContent = query;

    // Predefined answers to specific questions with text, images, videos, and music
    const questionAnswers = {
      "Where is Ajibode?": {
        text: "Ajibode is located in 19, Olayinka Olugoke Street, Idimu, Lagos.",
        image: "images/ajibode.jpg",
        video: null,
        music: null
      },
      "Who is the coordinator of body of elders?": {
        text: "Mr. Toyin Gabieleshi is the coordinator of the body of elders.",
        image: null,
        video: null,
        music: "/storage/emulated/0/PDF/JW/Files/Music/osg_E_016.mp3"
      },
      "What circuit is Ajibode?": {
        text: "Ajibode is in circuit 220",
        image: null,
        video: null,
        music: "music/congregation.mp3"
      },
      "What is the website?": {
        text: "Visit the official website: <a href='https://www.jw.org' target='_blank'>www.jw.org</a>",
        image: null,
        video: "Files/vid/load.mp4",
        music: null
      },
      "This week meeting?": {
        text: "Meetings for: <a href='index.html' target='_blank'>Nov25-Dec1</a>",
        image: null,
        video: null,
        music: null
      }
    };

    // Mock search results with text, links, images, videos, and music
    const allResults = [
    { text: "Meeting for the week of December 2-8. \n Bro Blessing Mark has been assingned to be the chairman for the meeting. \n No student will be handling assignment.", link: "week2.html", linkText: "view schedule for Dec 2-8", image: null, video: null, music: null },
     { text: "Next two week meeting schedule will be available soon", image: null, video: null, music: null },
     { text: "Last week meeting schedule will be available soon", image: null, video: null, music: null },
     { text: "Mr. Toyin Gabieleshi is the coordinator of the body of elders", image: null, video: null, music: "/storage/emulated/0/PDF/JW/Files/Music/osg_E_016.mp3" },
      { text: "Ajibode is in circuit 220", link: "index.html", linkText: "Go to Circuit 220", image: null, video: null, music: null },
      { text: "Visit the official website", link: "https://www.jw.org", linkText: "Visit JW.org", image: null, video: "videos/jworg.mp4", music: null },
      { text: "The meeting for field service scheduled for Wednesday will be by 9:45am.", link: "field.html#hc1b1", linkText: "Check out the full schedule", image: null, video: null, music: null },
      { text: "The visit of Brother Osarhiemen Odige, Circuit Overseer, is scheduled for December 17 - 22. Publishers wishing to accompany him in the field service are kindly requested to submit their names in advance. Please contact the Congregation Secretary to register your interest. Thank you for your cooperation. \n\n There will be an adjustment in field service activities during his visit", link: "field.html#hc1b1", linkText: "Check out the schedule", image: null, video: null, music: null }

];

    // Initialize Fuse.js with search options
    const options = {
      includeScore: true, // To return the score for each result (useful for fuzzy matching)
      threshold: 0.7,     // Adjust the threshold for fuzzy matching (lower = more strict)
      keys: ['text']      // Specify which fields to search in the objects
    };
    const fuse = new Fuse(allResults, options);

    // Function to render a result (text, link, image, video, music)
    const renderResult = (container, result) => {
      const div = document.createElement('div');
      div.className = 'result';

      // Add text
      if (result.text) {
        const p = document.createElement('p');
        p.innerHTML = result.text; // Use innerHTML to include links
        p.innerHTML = result.text.replace(/\n/g, '<br>'); // Replace \n with <br>
        div.appendChild(p);
      }

      
        // Add link if available
      if (result.link && result.linkText) {
        const link = document.createElement('a');
        link.href = result.link;
        link.textContent = result.linkText;
        link.target = '_blank';  // Open in a new tab
        div.appendChild(link);
      }

      // Add image
      if (result.image) {
        const img = document.createElement('img');
        img.src = result.image;
        img.alt = result.text;
        img.style.width = "300px";
        img.style.marginTop = "10px";
        div.appendChild(img);
      }

      // Add video
      if (result.video) {
        const video = document.createElement('video');
        video.src = result.video;
        video.controls = true;
        video.style.width = "400px";
        video.style.marginTop = "10px";
        div.appendChild(video);
      }

      // Add music
      if (result.music) {
        const audio = document.createElement('audio');
        audio.src = result.music;
        audio.controls = true;
        audio.style.marginTop = "10px";
        div.appendChild(audio);
      }

      container.appendChild(div);
    };

    // Main logic to perform search
    const performSearch = (query) => {
      const resultsContainer = document.getElementById('results');

      // If the query is a question, show a predefined answer
      const answer = questionAnswers[query];
      if (answer) {
        renderResult(resultsContainer, answer);
      } else {
        // Use Fuse.js to search for results
        const fuzzyResults = fuse.search(query); // Perform the search
        const filteredResults = fuzzyResults.map(result => result.item); // Extract items from Fuse.js result

        if (filteredResults.length === 0) {
          resultsContainer.textContent = "No results found for " + query;
        } else {
          filteredResults.forEach(result => renderResult(resultsContainer, result));
        }
      }
    };

    // Call the debounce function for the initial query
    debounceSearch(query);


