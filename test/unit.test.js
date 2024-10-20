const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

// Importez les fonctions à tester
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../tests.html'), 'utf8');

// Simulez un environnement DOM
document.body.innerHTML = html;

// Fonction pour réinitialiser le DOM après chaque test
afterEach(() => {
  document.body.innerHTML = html;
});

// Tests unitaires
describe('Fonctions de l\'application', () => {
  test('incrementCounter augmente le compteur de 1', () => {
    const counter = document.getElementById('clickCounter');
    counter.innerText = '0';
    incrementCounter();
    expect(counter.innerText).toBe('1');
  });

  test('validateForm retourne false pour un nom vide', () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = 'test@example.com';
    expect(validateForm()).toBe(false);
    expect(document.getElementById('error').innerText).toContain('Name is required');
  });

  test('validateForm retourne false pour un email invalide', () => {
    document.getElementById('name').value = 'John Doe';
    document.getElementById('email').value = 'invalid-email';
    expect(validateForm()).toBe(false);
    expect(document.getElementById('error').innerText).toContain('Invalid email format');
  });

  test('validateForm retourne true pour des entrées valides', () => {
    document.getElementById('name').value = 'John Doe';
    document.getElementById('email').value = 'john@example.com';
    expect(validateForm()).toBe(true);
    expect(document.getElementById('error').innerText).toBe('');
  });
});
