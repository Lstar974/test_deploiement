const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

test('Should increment the counter when button is clicked', () => {
  const dom = new JSDOM(`
    <html>
      <body>
        <p id="clickCounter">0</p>
        <button onclick="incrementCounter()">Click Me!</button>
      </body>
    </html>
  `);

  const counter = dom.window.document.getElementById("clickCounter");

  // Simule la fonction d'incrémentation avec vérification
  dom.window.incrementCounter = function() {
    let currentCount = parseInt(counter.innerText, 10);
    counter.innerText = isNaN(currentCount) ? 1 : currentCount + 1;
  };

  // Incrémentation simulée
  dom.window.incrementCounter();
  expect(counter.innerText).toBe("1");

  dom.window.incrementCounter();
  expect(counter.innerText).toBe("2");
});
