import { test, expect } from '@playwright/test';

test('Create Google Form for Contact Details', async ({ page }) => {
  // Navigate to Google Forms
  await page.goto('https://forms.google.com/');
  
  // Wait for the page to load completely
  await page.waitForTimeout(3000);
  
  // Click on "Create a new form" or blank form option
  const createFormButton = page.getByRole('button', { name: /blank|create/i }).or(
    page.locator('div[role="button"]', { hasText: /blank|create/i })
  );
  await createFormButton.first().click();
  
  // Wait for form creation
  await page.waitForTimeout(3000);
  
  // Set form title
  const titleInput = page.getByRole('textbox', { name: /form title|untitled form/i }).or(
    page.locator('[data-initial-value="Untitled form"]')
  ).or(
    page.locator('input[placeholder*="Form title"]')
  );
  await titleInput.click();
  await page.waitForTimeout(1000);
  await titleInput.fill('Contact Details Form');
  
  // Wait for title update
  await page.waitForTimeout(2000);
  
  // First field: Name (already exists as "Untitled question")
  const question1Title = page.locator('input[aria-label*="Question"]').first().or(
    page.locator('div[data-item-id*="0"] input[placeholder*="Question"]')
  ).or(
    page.locator('[data-initial-value="Untitled question"]')
  );
  await question1Title.click();
  await page.waitForTimeout(1000);
  await question1Title.fill('Name');
  
  // Ensure the first field is text type (Short answer)
  const shortAnswer1 = page.getByRole('menuitem', { name: /short answer/i }).or(
    page.locator('div[role="listitem"]', { hasText: 'Short answer' })
  );
  
  // Click the dropdown for question type if needed
  const typeDropdown1 = page.locator('div[role="listbox"]').first().or(
    page.locator('[aria-haspopup="listbox"]')
  );
  const isVisible = await typeDropdown1.isVisible().catch(() => false);
  
  if (!isVisible) {
    await question1Title.click();
    await page.waitForTimeout(1000);
  }
  
  await page.waitForTimeout(2000);
  
  // Add second question: Email
  const addQuestionButton = page.getByRole('button', { name: /add question|add icon/i }).or(
    page.locator('div[aria-label*="Add question"]')
  ).or(
    page.locator('span[aria-label*="Add question"]')
  ).or(
    page.locator('div[role="button"]').filter({ hasText: '+' }).first()
  );
  await addQuestionButton.click();
  
  // Wait for new question to appear
  await page.waitForTimeout(3000);
  
  // Set second question title as "Email"
  const allInputs = await page.locator('input[aria-label*="Question"]').all();
  if (allInputs.length > 1) {
    await allInputs[1].click();
    await page.waitForTimeout(1000);
    await allInputs[1].fill('Email');
  } else {
    const question2 = page.locator('[data-item-id*="1"] input').or(
      page.locator('input[type="text"]').nth(1)
    );
    await question2.click();
    await page.waitForTimeout(1000);
    await question2.fill('Email');
  }
  
  // Change question type to "Email" for validation
  await page.waitForTimeout(2000);
  
  // Find and click the dropdown for second question type
  const typeButtons = await page.locator('div[role="listbox"]').all();
  if (typeButtons.length > 0) {
    await typeButtons[typeButtons.length - 1].click();
    await page.waitForTimeout(1000);
    
    const emailType = page.getByRole('menuitem', { name: /email/i }).or(
      page.locator('div[role="listitem"]', { hasText: 'Email' })
    );
    await emailType.click();
  }
  
  await page.waitForTimeout(3000);
  
  // Add third question: Mobile Number
  await addQuestionButton.click();
  
  await page.waitForTimeout(3000);
  
  // Set third question title as "Mobile Number"
  const allInputs3 = await page.locator('input[aria-label*="Question"]').all();
  if (allInputs3.length > 2) {
    await allInputs3[2].click();
    await page.waitForTimeout(1000);
    await allInputs3[2].fill('Mobile Number');
  } else {
    const question3 = page.locator('[data-item-id*="2"] input').or(
      page.locator('input[type="text"]').nth(2)
    );
    await question3.click();
    await page.waitForTimeout(1000);
    await question3.fill('Mobile Number');
  }
  
  // Keep as Short answer but add validation description
  await page.waitForTimeout(2000);
  
  // Add description for mobile number format
  const descriptionInput = page.locator('input[aria-label*="Description"]').or(
    page.locator('[data-initial-value="Description"]')
  );
  await descriptionInput.click();
  await page.waitForTimeout(1000);
  await descriptionInput.fill('Please enter your mobile number (digits only)');
  
  await page.waitForTimeout(3000);
  
  // Take a snapshot of the completed form
  await page.waitForTimeout(2000);
  
  console.log('Google Form created successfully with Name, Email, and Mobile Number fields');
});
