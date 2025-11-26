document.addEventListener("DOMContentLoaded", () => {

  const favBtn = document.querySelector(".fav-btn");
  const favText = document.querySelector(".fav-text");

  if (!favBtn || !favText) return;

  const rezeptId = favBtn.dataset.rezept;

  let favs = JSON.parse(localStorage.getItem("favs") || "[]");

  if (favs.includes(rezeptId)) {
    favBtn.classList.add("active");
    favText.classList.add("active");
    favText.textContent = "Gespeichert";
  }

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favs") || "[]");

    if (favs.includes(rezeptId)) {
      favs = favs.filter(id => id !== rezeptId);
      favBtn.classList.remove("active");
      favText.classList.remove("active");
      favText.textContent = "Als Lieblingsrezept speichern";

    } else {
      favs.push(rezeptId);
      favBtn.classList.add("active");
      favText.classList.add("active");
      favText.textContent = "Gespeichert";
    }

    localStorage.setItem("favs", JSON.stringify(favs));
  };

  favBtn.addEventListener("click", toggleFavorite);
  favText.addEventListener("click", toggleFavorite);
});
