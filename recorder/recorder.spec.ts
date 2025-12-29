import { chromium, test } from '@playwright/test';
import * as path from 'path';

test.use({
  context: async ({ }, use) => {
    const extensionPath = path.join(__dirname, '../click-feedback-extension');
    const context = await chromium.launchPersistentContext(
      './chrome-profile',
      {
        executablePath: '/usr/bin/google-chrome',
        headless: false,
        args: [
          // '--profile-directory=Default',
          `--disable-extensions-except=${extensionPath}`,
          `--load-extension=${extensionPath}`,
        ],
      }
    );
    await use(context);
    await context.close();
  },
});

test('Create Google Form for Contact Details', async ({ context }) => {
  const page = await context.newPage();
  
  await page.goto('https://forms.google.com/');
  
  await page.waitForTimeout(3000);

  await page.getByRole('option', { name: 'Blank form' }).locator('img').click();
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'Document title' }).click();
  await page.getByRole('textbox', { name: 'Document title' }).dblclick();
  await page.getByRole('textbox', { name: 'Document title' }).fill('Contact Details Form');
  await page.getByRole('textbox', { name: 'Form title' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Question' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Question' }).fill('Name');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add question' }).click();
  await page.getByRole('textbox', { name: 'Question' }).last().fill('Email');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Add question' }).click();
  await page.waitForTimeout(3000);
  // await page.locator('span').filter({ hasText: 'Question*' }).getByLabel('Question', { exact: true }).last().click();
  await page.getByRole('textbox', { name: 'Question' }).last().fill('Mobile Number');
  // await page.waitForTimeout(3000);
  // await page.getByRole('button', { name: 'More options' }).click();
  // await page.locator('.uyYuVb').first().click();
  // await page.getByRole('textbox', { name: 'Description', exact: true }).fill('Please enter your mobile number (digits only)');
  // await page.waitForTimeout(3000);
  // await page.locator('div').filter({ hasText: 'Section 1 of 1Form' }).first().click();
  await page.getByRole('button', { name: 'Publish' }).click();
  // await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Publish' }).click();
  // await page.waitForTimeout(3000);
  await page.getByText('Shorten URL').click();
  // await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Click to copy responder link' }).click();
  console.log('Google Form created successfully with Name, Email, and Mobile Number fields');
});
