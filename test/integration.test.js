const puppeteer = require('puppeteer-core');
const path = require('path');
const os = require('os');

let browser;
let page;

beforeAll(async () => {
  const tmpDir = os.tmpdir();
  browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/usr/bin/google-chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--user-data-dir=${tmpDir}/puppeteer_user_data`
    ],
  });
  page = await browser.newPage();
});
afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

describe('Tests d\'intégration de l\'application', () => {
  beforeEach(async () => {
    await page.goto(`file:${path.join(__dirname, '../tests.html')}`);
  });

  test('Le compteur de clics fonctionne correctement', async () => {
    const initialCount = await page.$eval('#clickCounter', el => el.innerText);
    await page.click('button');
    const newCount = await page.$eval('#clickCounter', el => el.innerText);
    expect(Number(newCount)).toBe(Number(initialCount) + 1);
  });

  test('La validation du formulaire fonctionne pour des entrées valides', async () => {
    await page.type('#name', 'John Doe');
    await page.type('#email', 'john@example.com');
    await page.click('input[type="submit"]');
    const errorMessage = await page.$eval('#error', el => el.innerText);
    expect(errorMessage).toBe('');
  });

  test('La validation du formulaire affiche une erreur pour un nom vide', async () => {
    await page.type('#email', 'john@example.com');
    await page.click('input[type="submit"]');
    const errorMessage = await page.$eval('#error', el => el.innerText);
    expect(errorMessage).toContain('Name is required');
  });

  test('La validation du formulaire affiche une erreur pour un email invalide', async () => {
    await page.type('#name', 'John Doe');
    await page.type('#email', 'invalid-email');
    await page.click('input[type="submit"]');
    const errorMessage = await page.$eval('#error', el => el.innerText);
    expect(errorMessage).toContain('Invalid email format');
  });
});
