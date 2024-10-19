// Test sur la validation du format de l'email
test('Should validate email format', () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = "test@example.com";
  const invalidEmail = "invalid-email";

  expect(emailPattern.test(validEmail)).toBe(true);
  expect(emailPattern.test(invalidEmail)).toBe(false);
});

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
  const count = parseInt(counter.innerText);

  // Incrémentation
  counter.innerText = count + 1;

  // Vérifie si le compteur a bien été incrémenté
  expect(counter.innerText).toBe("1");
});
