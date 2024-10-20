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

  // Simule la fonction d'incrémentation
  dom.window.incrementCounter = function() {
    counter.innerText = parseInt(counter.innerText) + 1;
  };

  // Incrémentation simulée
  dom.window.incrementCounter();
  expect(parseInt(counter.innerText)).toBe(1); // Convertir la valeur en nombre

  dom.window.incrementCounter();
  expect(parseInt(counter.innerText)).toBe(2); // Convertir la valeur en nombre
});
