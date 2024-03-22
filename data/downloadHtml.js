const axios = require("axios");
const fs = require("fs");
const path = require("path");

// URL der Webseite, von der der HTML-Code heruntergeladen werden soll
const url = "https://www.epiloglaser.com/de/lasermaschinen/produktlinie/";

// Pfad der Datei, in die der HTML-Code gespeichert werden soll
const filePath = path.join(__dirname, "epilog.txt");

// Funktion zum Bereinigen des HTML-Codes
function cleanHtml(html) {
  // Entfernen des Head-Bereichs
  html = html.replace(/<head[^>]*>([\S\s]*?)<\/head>/gim, "");

  // Entfernen von Script- und Style-Elementen
  html = html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
  html = html.replace(/<style[^>]*>([\S\s]*?)<\/style>/gim, "");

  // Entfernen von URLs
  html = html.replace(/href="[^"]*"/gim, "");
  html = html.replace(/src="[^"]*"/gim, "");

  // Entfernen aller Kommentare
  html = html.replace(/<!--[\s\S]*?-->/g, "");

  // Entfernen überflüssiger Leerzeilen
  html = html.replace(/^\s*[\r\n]/gm, "");

  return html;
}

// Funktion zum Herunterladen des HTML-Codes und Speichern in einer Datei
async function downloadHtml() {
  try {
    const response = await axios.get(url);
    const cleanedHtml = cleanHtml(response.data);
    fs.writeFileSync(filePath, cleanedHtml, "utf8");
    console.log(
      `Der bereinigte HTML-Code wurde erfolgreich in ${filePath} gespeichert.`
    );
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten:", error);
  }
}

// Funktion ausführen
downloadHtml();
