const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Lire le contenu du fichier HTML
const html = fs.readFileSync(path.resolve(__dirname, '../tests.html'), 'utf8');

// Configurer JSDOM
const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
global.document = dom.window.document;
global.window = dom.window;

// Attendre que le DOM soit chargé
dom.window.document.addEventListener('DOMContentLoaded', () => {
  // Rendre les fonctions globales
  global.incrementCounter = dom.window.incrementCounter;
  global.validateForm = dom.window.validateForm;
});

// Fonction pour réinitialiser le DOM après chaque test
afterEach(() => {
  dom.window.document.body.innerHTML = html;
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
    const errorElement = document.getElementById('error');
    expect(errorElement).not.toBeNull();
    expect(errorElement.innerText).toContain('Name is required');
  });

  test('validateForm retourne false pour un email invalide', () => {
    document.getElementById('name').value = 'John Doe';
    document.getElementById('email').value = 'invalid-email';
    expect(validateForm()).toBe(false);
    const errorElement = document.getElementById('error');
    expect(errorElement).not.toBeNull();
    expect(errorElement.innerText).toContain('Invalid email format');
  });

  test('validateForm retourne true pour des entrées valides', () => {
    document.getElementById('name').value = 'John Doe';
    document.getElementById('email').value = 'john@example.com';
    expect(validateForm()).toBe(true);
    const errorElement = document.getElementById('error');
    expect(errorElement).not.toBeNull();
    expect(errorElement.innerText).toBe('');
  });
});
