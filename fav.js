async function loadFavs() {
  const res = await fetch("http://127.0.0.1:3000/api/favs");
  const data = await res.json();
  return data.favs || [];
}

async function addFav(rezeptId) {
  await fetch("http://127.0.0.1:3000/api/favs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId: rezeptId }),
  });
}

async function deleteFav(rezeptId) {
  await fetch(`http://127.0.0.1:3000/api/favs/${encodeURIComponent(rezeptId)}`, {
    method: "DELETE",
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const favBtn = document.querySelector(".fav-btn");
  const favText = document.querySelector(".fav-text");

  if (!favBtn || !favText) return;

  const rezeptId = favBtn.dataset.rezept;

  // Favoriten beim Laden vom SERVER holen (statt localStorage)
  let favs = await loadFavs();

  if (favs.includes(rezeptId)) {
    favBtn.classList.add("active");
    favText.classList.add("active");
    favText.textContent = "Gespeichert";
  }

  const toggleFavorite = async () => {
    // Wenn schon drin -> löschen, sonst hinzufügen (SERVER)
    if (favs.includes(rezeptId)) {
      await deleteFav(rezeptId);

      favs = favs.filter(id => id !== rezeptId);

      favBtn.classList.remove("active");
      favText.classList.remove("active");
      favText.textContent = "Als Lieblingsrezept speichern";
    } else {
      await addFav(rezeptId);

      favs.push(rezeptId);

      favBtn.classList.add("active");
      favText.classList.add("active");
      favText.textContent = "Gespeichert";
    }
  };

  favBtn.addEventListener("click", toggleFavorite);
  favText.addEventListener("click", toggleFavorite);
});

