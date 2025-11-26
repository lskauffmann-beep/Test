document.addEventListener("DOMContentLoaded", () => {

  const favList = document.getElementById("fav-list");
  const favs = JSON.parse(localStorage.getItem("favs") || "[]");

  if (favs.length === 0) {
    favList.innerHTML = "<p>Du hast noch keine Lieblingsrezepte gespeichert.</p>";
    return;
  }

  // Alle Rezepte verfügbar machen
  const rezepte = {
    "zucchini-pasta": {
      name: "Zucchini-Pasta mit Tomatensoße 🍅",
      link: "./rezepte/zucchini-pasta.html",
      bild: "https://i.pinimg.com/1200x/1c/3e/30/1c3e307ba6506d4234b8a35920953026.jpg"
    },
    "bunter-salat": {
      name: "Bunter Salat 🥗",
      link: "./rezepte/bunter-salat.html",
      bild: "https://i.pinimg.com/1200x/8a/a7/46/8aa7462d5b9275201180431c8d4c0857.jpg"
    },
    "gemüse-curry": {
      name: "Gemüse-Curry mit Kokosmilch 🍛",
      link: "./rezepte/gemuese-curry.html",
      bild: "https://i.pinimg.com/736x/5b/54/f7/5b54f713f5b0b76aeccb7728c5f77e01.jpg"
    },
    "chiliconcarne": {
      name: "Chili con Carne 🌶️",
      link: "./rezepte/chiliconcarne.html",
      bild: "https://i.pinimg.com/1200x/f9/4c/5c/f94c5c9a674921e2f72228c1ae7a460e.jpg"
    },
    "hähnchenpfanne": {
      name: "Hähnchenpfanne mit Paprika 🫑",
      link: "./rezepte/hähnchenpfanne.html",
      bild: "https://i.pinimg.com/736x/e7/ea/03/e7ea0390400a2bbe9a57409aaf0f977c.jpg"
    },
    "kartoffel-hack": {
      name: "Kartoffel-Hack-Auflauf 🥔",
      link: "./rezepte/kartoffel-hack.html",
      bild: "https://i.pinimg.com/1200x/de/45/5b/de455b43a69c7b6fb9ce663223ac41f0.jpg"
    },
    "pfannkuchen": {
      name: "Pfannkuchen 🥞",
      link: "./rezepte/pfannkuchen.html",
      bild: "https://i.pinimg.com/1200x/45/7a/a8/457aa824ebae0858b67bfd856849c500.jpg"
    },
    "wraps": {
      name: "Wraps 🌯",
      link: "./rezepte/wraps.html",
      bild: "https://i.pinimg.com/1200x/9f/05/55/9f05558d163d87df45ad4ed3e5ef80bd.jpg"
    },
    "djuvec-reis": {
      name: "Djuvec Reis 🍚",
      link: "./rezepte/djuvec-reis.html",
      bild: "https://i.pinimg.com/1200x/2b/54/83/2b5483101d01856d22cd21c54794c354.jpg"
    }
  };

  // Nur Favoriten anzeigen, die es wirklich im Objekt gibt
  const bekannteFavs = favs.filter(id => rezepte[id]);

  if (bekannteFavs.length === 0) {
    favList.innerHTML = "<p>Favoriten gespeichert, aber keine passenden Rezepte gefunden.</p>";
    return;
  }

  // Rezepte rendern
  favList.innerHTML = bekannteFavs
    .map(id => {
      const r = rezepte[id];
      return `
        <div class="rezept-karte">
          <h3><a href="${r.link}">${r.name}</a></h3>
          <img src="${r.bild}" class="rezeptbilder"/>
        </div>
      `;
    })
    .join("");
});

