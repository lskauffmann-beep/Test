
// DOM-Elemente holen
const input = document.getElementById("ZutatenInput");
const addButton = document.getElementById("addButton");
const zutatenListeDOM = document.getElementById("Zutatenliste");
const ergebnis = document.getElementById("ergebnis");
const generiereButton = document.getElementById("generiere");





// Hilfsfunktion: wandelt jede Zutat in eine standardisierte Form um
function normWort(w) {
  return w
    .toLowerCase()
    .trim()
    .normalize("NFD")               // Umlaute/Accents trennen
    .replace(/\p{Diacritic}/gu, "") // Umlaute entfernen: ä→a
    .replace(/e?n$/, "")            // Plural entfernen: Nudeln → nudel
    .replace(/en$/, "")             // Plural entfernen: Tomaten → tomat
    .replace(/s$/, "");             // End-S entfernen
}




let zutaten = [];



// Rezeptdatenbank
const rezepte = [
  {
    title: "Zucchini Pasta mit Tomatensoße",
    html: "rezepte/zucchini-pasta.html",
    image: "https://i.pinimg.com/1200x/1c/3e/30/1c3e307ba6506d4234b8a35920953026.jpg",
    zutaten: ["Zucchini", "Tomaten", "Olivenöl", "Käse", "Nudeln"]
  },
  {
    title: "Wraps",
    html: "rezepte/wraps.html",
    image: "https://i.pinimg.com/1200x/9f/05/55/9f05558d163d87df45ad4ed3e5ef80bd.jpg",
    zutaten: ["Wraps", "Bohnen", "Avocado", "Mais", "Tomaten", "Hackleisch", "Hähnchenfleisch"]
  },
  {
    title: "Gemüse Curry",
    html: "rezepte/gemuese-curry.html", 
    image: "https://i.pinimg.com/736x/5b/54/f7/5b54f713f5b0b76aeccb7728c5f77e01.jpg",
    zutaten: ["Zucchini", "Paprika", "Karotten", "Kokosmilch", "Currypaste", "Currypulver", "Zwiebeln", "Reis"]
  },
  {
    title: "Bunter Salat",
    html: "rezepte/bunter-salat.html",
    image: "https://i.pinimg.com/1200x/8a/a7/46/8aa7462d5b9275201180431c8d4c0857.jpg",
    zutaten: ["Salat", "Gurke", "Feta","Käse", "Nüsse", "Zitrone", "Tomaten"]
  },
  {
    title: "Hähnchenpfanne mit Paprika",
    html: "rezepte/hähnchenpfanne.html",
    image: "https://i.pinimg.com/736x/e7/ea/03/e7ea0390400a2bbe9a57409aaf0f977c.jpg",
    zutaten: ["Hähnchen", "Paprika", "Zwiebeln", "Knoblauch", "Sahne"]
  },
  {
    title: "Chili con Carne",
    html: "rezepte/chiliconcarne.html",
    image: "https://i.pinimg.com/736x/7d/fe/8f/7dfe8f3af0b58ebec708ea7b1fc0cbb2.jpg",
    zutaten: ["Hackfleisch", "Bohnen", "Mais", "Tomaten", "Zwiebeln", "Knoblauch", "Gewürze"]
  },
  {
    title: "Kartoffel-Hack-Auflauf",
    html: "rezepte/kartoffel-hack.html",
    image: "https://i.pinimg.com/736x/eb/47/50/eb4750d2038e5f00b4374af9a84f4b64.jpg",
    zutaten: ["Hackfleisch", "Kartoffeln", "Zwiebeln", "Sahne", "Milch", "Feta", "Käse"]
  },
  {
    title: "Djuvec Reis",
    html: "rezepte/djuvec-reis.html",
    image: "httpsi.pinimg.com/1200x/2b/54/83/2b5483101d01856d22cd21c54794c354.jpg",
    zutaten: ["Reis", "Tomaten", "Zwiebeln", "Gemüsebrühe", "Knoblauch", "Paprika", "Tomatenmark"]
  },
  {
    title: "Pfannkuchen",
    html: "rezepte/pfannkuchen.html",
    image: "https://i.pinimg.com/1200x/45/7a/a8/457aa824ebae0858b67bfd856849c500.jpg",
    zutaten: ["Mehl", "Eier", "Milch", "Butter"]
  },
];






// Zutaten hinzufügen

addButton.addEventListener("click", handleClick);

function handleClick() {
  const value = input.value.trim();
  if (value === "") return;

  updateList(value);
  zutaten.push(normWort(value));
  input.value = "";
}

function updateList(text) {
  const li = document.createElement("li");
  li.textContent = text;
  zutatenListeDOM.append(li);
}



// Prüfen, ob Rezept alle eingegebenen Zutaten enthält

function zutatenPruefen(rezept, eingegeben) {
  const rezeptNorm = rezept.zutaten.map(normWort);
  const count = eingegeben.filter(z => rezeptNorm.includes(z)).length;
  return count >= 2;
}




// Passendes Rezept finden

function findePassendesrezept() {

  if (zutaten.length === 0) {
    ergebnis.innerHTML = "<p>Bitte gib zuerst Zutaten ein.</p>";
    return;
  }

  for (let rezept of rezepte) {
    if (zutatenPruefen(rezept, zutaten)) {
      zeigeRezept(rezept);
      return;
    }
  }

  ergebnis.innerHTML = "<p>Kein passendes Rezept gefunden 😔</p>";
}


// Rezept anzeigen

function zeigeRezept(rezept) {
  window.location.href = rezept.html;
}




// Klick auf "Generiere Rezept"

generiereButton.addEventListener("click", findePassendesrezept);



/// ENTER-Taste aktivieren für das Zutaten-Eingabefeld
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleClick();  // löst den gleichen Code aus wie der Hinzufügen-Button
  }
});

