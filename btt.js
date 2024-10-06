const mineflayer = require('mineflayer');
const http = require('http');

let bot; // Globalna zmienna bot

// Obsługa wpisywania wiadomości z konsoli
process.stdin.on('data', (input) => {
  const message = input.toString().trim(); // Pobieramy wpisany tekst
  if (message.length > 0) {
    // Sprawdzamy, czy bot jest zalogowany i gotowy do wysyłania wiadomości
    if (bot && bot.entity && bot.player) {
      bot.chat(message); // Wysyłamy wiadomość na czat Minecraft
      console.log(`Wysłano wiadomość na czat: ${message}`);
    } else {
      console.log('Bot nie jest zalogowany. Wiadomość nie została wysłana.');
    }
  }
});

// Funkcja tworząca bota
function createBot() {
  bot = mineflayer.createBot({
    host: 'kukonMjAU.aternos.me', // np. 'localhost'
    port: 25565, // Port serwera Minecraft (domyślnie 25565)
    username: 'Kopiku', // Nazwa bota
    version: '1.20.1' // Ustaw wersję Minecraft, jeśli nie jest domyślna
  });

  // Obsługa logowania
  bot.on('login', () => {
    console.log('Bot zalogowany. Możesz teraz pisać na czacie Minecraft z konsoli.');

    // Czekanie 10 sekund po zalogowaniu i wpisanie komendy /l skarpety1
    setTimeout(() => {
      bot.chat('/l skarpety1');
      console.log('Wysłano komendę: /l skarpety1');

      // Kolejne 5 sekund opóźnienia i wpisanie komendy /home z
      setTimeout(() => {
        bot.chat('/home z');
        console.log('Wysłano komendę: /home z');
      }, 5000);

    }, 10000); // 10000 milisekund = 10 sekund
  });

  // Wyświetlanie wszystkich wiadomości (graczy, serwera, systemowych) w konsoli
  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString(); // Konwersja wiadomości do tekstu
    console.log(`${message}`);
  });

  // Obsługa błędów
  bot.on('error', (err) => {
    console.log(`Błąd: ${err}`);
  });

  // Obsługa wylogowania, dodanie automatycznego restartu
  bot.on('end', () => {
    console.log('Bot został wylogowany. Próba ponownego połączenia za 5 sekund...');
    setTimeout(createBot, 5000); // Restart bota po 5 sekundach
  });
}

// Uruchomienie bota
createBot();

// Tworzenie serwera HTTP na porcie 8080
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot Minecraft działa!\n');
});

server.listen(8080, () => {
  console.log('Serwer HTTP działa na porcie 8080');
});
