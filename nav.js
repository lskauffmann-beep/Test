document.addEventListener("DOMContentLoaded", () => {

  // Wir suchen das nav-Element mit deiner Klasse
  const nav = document.querySelector("nav.mainNav");

  // Falls auf einer Seite noch kein mainNav existiert, fügen wir eines ein
  if (!nav) {
    const newNav = document.createElement("nav");
    newNav.classList.add("mainNav");
    document.body.prepend(newNav);
  }

  const navElement = document.querySelector("nav.mainNav");

  navElement.innerHTML = `
    <a href="/meineSeite.html">Startseite</a>
    <a href="/Lieblingsrezepte.html">Lieblingsrezepte</a>
   
  `;

  // Aktiven Link markieren
  const currentPath = window.location.pathname;

  navElement.querySelectorAll("a").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});


