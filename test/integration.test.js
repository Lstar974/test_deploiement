const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

let dom;
let window;
let document;

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../tests.html'), 'utf8');
  dom = new JSDOM(html, { runScripts: 'dangerously' });
  window = dom.window;
  document = window.document;
});

describe('Tests d\'intégration de l\'application', () => {
  test('Le compteur de clics fonctionne correctement', () => {
    const initialCount = document.getElementById('clickCounter').innerText;
    document.querySelector('button').click();
    const newCount = document.getElementById('clickCounter').innerText;
    expect(Number(newCount)).toBe(Number(initialCount) + 1);
  });

  test('La validation du formulaire fonctionne pour des entrées valides', () => {
    document.getElementById('name').value = 'John Doe';
    document.getElementById('email').value = 'john@example.com';
    const form = document.querySelector('form');
    const event = new window.Event('submit');
    form.dispatchEvent(event);
    const errorMessage = document.getElementById('error').innerText;
    expect(errorMessage).toBe('');
  });

  test('La validation du formulaire affiche une erreur pour un nom vide', () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = 'john@example.com';
    const form = document.querySelector('form');
    const event = new window.Event('submit');
    form.dispatchEvent(event);
    const errorMessage = document.getElementById('error').innerText;
    expect(errorMessage).toContain('Name is required');
  });

  test('La validation du formulaire affiche une erreur pour un email invalide', () => {
    document.getElementById('name').value = 'John Doe';
    document.getElementById('email').value = 'invalid-email';
    const form = document.querySelector('form');
    const event = new window.Event('submit');
    form.dispatchEvent(event);
    const errorMessage = document.getElementById('error').innerText;
    expect(errorMessage).toContain('Invalid email format');
  });
});
