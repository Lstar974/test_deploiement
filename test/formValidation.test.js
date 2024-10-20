const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

test('Should handle form submission and counter increment', () => {
  const dom = new JSDOM(`
    <html>
      <body>
        <p id="clickCounter">0</p>
        <button onclick="incrementCounter()">Click Me!</button>
        <form onsubmit="return validateForm()">
          <input type="text" id="name" value="">
          <input type="text" id="email" value="test@example.com">
          <p id="error"></p>
        </form>
      </body>
    </html>
  `);

  const counter = dom.window.document.getElementById("clickCounter");
  const error = dom.window.document.getElementById("error");

  // Définition des fonctions
  dom.window.incrementCounter = function() {
    counter.innerText = parseInt(counter.innerText) + 1;
  };

  dom.window.validateForm = function() {
    let name = dom.window.document.getElementById("name").value;
    let email = dom.window.document.getElementById("email").value;
    let errorMsg = "";

    if (name === "") {
      errorMsg += "Name is required. ";
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errorMsg += "Invalid email format.";
    }

    if (errorMsg) {
      error.innerText = errorMsg;
      return false;
    }

    return true;
  };

  // Simule l'incrémentation du compteur
  dom.window.incrementCounter();
  expect(parseInt(counter.innerText)).toBe(1); // Convertir la valeur en nombre

  // Simule la soumission du formulaire avec un nom manquant
  dom.window.validateForm();
  expect(error.innerText).toBe("Name is required. ");
});
