// Define translations for each language
const translations = {
  en: {
    menuOne: "Add to favourite",
    kh: "AJIBODE",
    darkMode: "Switch Themes",
    lg: "Languages",
    way: "Weekday",
    wnd: "Weekend",
    eve: "Events"
  },
  fr: {
    menuOne: "Ajouter aux favoris",
    kh: "AJIBODE",
    darkMode: "Changer de thème",
    lg: "Langues",
    way: "Jour de la semaine ",
    wnd: "Fin de semaine",
    eve: "Événements"
  },
  
  
  
  
  
  es: {
    menuOne: "Añadir a favoritos",
    kh: "AJIBODE",
    darkMode: "Cambiar de tema",
    lg: "Idiomas",
    way: "Día laborable",
    wnd: "Fin de semana",
    eve: "Eventos "
    
    
  }
};

// Function to handle language change
function handleSelection() {
  const selectedLanguage = document.getElementById("options").value;

  
  
  
  
  // Update text content based on selected language
  document.getElementById("m1").textContent = translations[selectedLanguage].menuOne;
  document.getElementById("kh").textContent = translations[selectedLanguage].kh;
  document.getElementById("dark-mode-toggle").textContent = translations[selectedLanguage].darkMode;
  document.getElementById("lg").textContent = translations[selectedLanguage].lg;
  document.getElementById("way").textContent = translations[selectedLanguage].way;
 document.getElementById("wnd").textContent = translations[selectedLanguage].wnd;
  document.getElementById("eve").textContent = translations[selectedLanguage].eve;
  
/*  document.getElementById("eve").textContent = translations[selectedLanguage].eve;
  document.getElementById("eve").textContent = translations[selectedLanguage].eve;
  document.getElementById("eve").textContent = translations[selectedLanguage].eve;
  */
  
  
  
  
}