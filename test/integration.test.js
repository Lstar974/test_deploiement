const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

const puppeteer = require('puppeteer');
const path = require('path');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(`file:${path.resolve(__dirname, '../tests.html')}`);
});

afterAll(async () => {
  await browser.close();
});

describe('Tests d\'intégration de l\'application', () => {
  test('Le compteur de clics fonctionne correctement', async () => {
    const initialCount = await page.$eval('#clickCounter', el => el.innerText);
    await page.click('button');
    const newCount = await page.$eval('#clickCounter', el => el.innerText);
    expect(parseInt(newCount)).toBe(parseInt(initialCount) + 1);
  });

  test('La validation du formulaire fonctionne pour des entrées valides', async () => {
    await page.type('#name', 'John Doe');
    await page.type('#email', 'john@example.com');
    await page.click('input[type="submit"]');
    const errorMessage = await page.$eval('#error', el => el.innerText);
    expect(errorMessage).toBe('');
  });

  test('La validation du formulaire affiche une erreur pour un nom vide', async () => {
    await page.evaluate(() => document.getElementById('name').value = '');
    await page.type('#email', 'john@example.com');
    await page.click('input[type="submit"]');
    const errorMessage = await page.$eval('#error', el => el.innerText);
    expect(errorMessage).toContain('Name is required');
  });

  test('La validation du formulaire affiche une erreur pour un email invalide', async () => {
    await page.type('#name', 'John Doe');
    await page.evaluate(() => document.getElementById('email').value = 'invalid-email');
    await page.click('input[type="submit"]');
    const errorMessage = await page.$eval('#error', el => el.innerText);
    expect(errorMessage).toContain('Invalid email format');
  });
});
