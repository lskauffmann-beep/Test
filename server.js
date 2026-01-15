// 🟢 Node.js Standard-Module importieren
const http = require("http");          // HTTP-Server erstellen
const fs = require("fs");              // Dateisystem (lesen/schreiben)
const path = require("path");          // Pfade plattformunabhängig bauen

// 🟢 Server-Adresse und Port festlegen
const hostname = "127.0.0.1";
const port = 3000;

// 🟢 Pfad zur JSON-Datei für die Datenspeicherung
const DATA_FILE = path.join(__dirname, "favs.json");


// 🟢 Funktion zum Lesen der gespeicherten Favoriten
function readFavs() {
  try {
    // 🟢 JSON-Datei synchron einlesen
    const raw = fs.readFileSync(DATA_FILE, "utf-8");

    // 🟢 String in JavaScript-Array umwandeln
    const data = JSON.parse(raw);

    // 🟢 Nur Array zurückgeben, sonst leeres Array
    return Array.isArray(data) ? data : [];
  } catch {
    // 🟢 Falls Datei noch nicht existiert oder Fehler auftritt
    return [];
  }
}


// 🟢 Funktion zum Speichern der Favoriten in der JSON-Datei
function writeFavs(favs) {
  // 🟢 Array als formatiertes JSON in Datei schreiben
  fs.writeFileSync(DATA_FILE, JSON.stringify(favs, null, 2), "utf-8");
}


// 🟢 Hilfsfunktion für JSON-Antworten
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;                                      // 🟢 HTTP-Status setzen
  res.setHeader("Content-Type", "application/json; charset=utf-8"); // 🟢 JSON-Header
  res.end(JSON.stringify(data));                                    // 🟢 Antwort senden
}


// 🟢 Request-Body (z. B. bei POST) vollständig einlesen
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";                        // 🟢 Body-String initialisieren
    req.on("data", chunk => body += chunk); // 🟢 Daten stückweise sammeln
    req.on("end", () => resolve(body));     // 🟢 Fertig → zurückgeben
    req.on("error", reject);                // 🟢 Fehler behandeln
  });
}


// 🟢 HTTP-Server erstellen
const server = http.createServer(async (req, res) => {

  // 🟢 CORS-Header setzen (für Browser-Zugriffe notwendig)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 🟢 OPTIONS-Request für Preflight-Anfragen
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  // 🟢 URL-Objekt aus der Request-URL erzeugen
  const url = new URL(req.url || "", `http://${req.headers.host}`);


  // 🟢 GET /api/favs → Alle Favoriten abrufen
  if (req.method === "GET" && url.pathname === "/api/favs") {
    const favs = readFavs();                // 🟢 Favoriten lesen
    return sendJson(res, 200, { favs });    // 🟢 Als JSON zurückgeben
  }


  // 🟢 POST /api/favs → Neuen Favoriten speichern
  if (req.method === "POST" && url.pathname === "/api/favs") {
    const bodyRaw = await readBody(req);    // 🟢 Body lesen
    let body;

    try {
      body = JSON.parse(bodyRaw || "{}");   // 🟢 JSON parsen
    } catch {
      return sendJson(res, 400, { error: "Invalid JSON" });
    }

    // 🟢 recipeId aus dem Body holen
    const recipeId = String(body.recipeId || "").trim();
    if (!recipeId) {
      return sendJson(res, 400, { error: "recipeId missing" });
    }

    // 🟢 Favoriten laden und ggf. ergänzen
    const favs = readFavs();
    if (!favs.includes(recipeId)) favs.push(recipeId);

    // 🟢 Aktualisierte Liste speichern
    writeFavs(favs);

    return sendJson(res, 200, { favs });
  }


  // 🟢 DELETE /api/favs/:id → Favorit löschen
  if (req.method === "DELETE" && url.pathname.startsWith("/api/favs/")) {
    const recipeId = decodeURIComponent(
      url.pathname.replace("/api/favs/", "")
    ).trim();

    if (!recipeId) {
      return sendJson(res, 400, { error: "recipeId missing" });
    }

    // 🟢 Favoriten filtern und speichern
    let favs = readFavs();
    favs = favs.filter(id => id !== recipeId);
    writeFavs(favs);

    return sendJson(res, 200, { favs });
  }


  // 🟢 Fallback für unbekannte Routen
  sendJson(res, 404, { error: "Route not found" });
});


// 🟢 Server starten
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
