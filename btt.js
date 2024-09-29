const mineflayer = require('mineflayer');

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
    host: 'iskyblock.pl', // np. 'localhost'
    port: 25565, // Port serwera Minecraft (domyślnie 25565)
    username: 'Kopiku', // Nazwa bota
    version: '1.19.4' // Ustaw wersję Minecraft, jeśli nie jest domyślna
  });

  // Obsługa logowania
  bot.on('login', () => {
    console.log('Bot zalogowany. Możesz teraz pisać na czacie Minecraft z konsoli.');

    // Czekanie 10 sekund po zalogowaniu i wpisanie komendy /l skarpety1
    setTimeout(() => {
      bot.chat('/l skarpety1');
      console.log('Wysłano komendę: /l skarpety1');

      // Kolejne 5 sekund opóźnienia i wpisanie komendy /home d
      setTimeout(() => {
        bot.chat('/home d');
        console.log('Wysłano komendę: /home d');
      }, 5000);

    }, 10000); // 10000 milisekund = 10 sekund
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
