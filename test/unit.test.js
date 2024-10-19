const { JSDOM } = require('jsdom');

// Test sur l'incrémentation du compteur
test('Should increment counter', () => {
  // Simule un document DOM
  const dom = new JSDOM(`
    <html>
      <body>
        <span id="clickCounter">0</span>
      </body>
    </html>
  `);

  const counter = dom.window.document.getElementById("clickCounter");
  let count = parseInt(counter.innerText);

  // Incrémentation
  count += 1;
  counter.innerText = count;

  // Vérifie si le compteur a bien été incrémenté
  expect(counter.innerText).toBe("1");
});
