import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('\n=== AUTH SETUP ===');
  console.log('Browser launched successfully!');
  console.log('1. Login to your Google account');
  console.log('2. After successful login, press Ctrl+C in this terminal');
  console.log('3. The authentication state will be saved to auth.json\n');
  
  // Navigate to Google Forms
  await page.goto('https://forms.google.com/');
  
  // Handle interrupt signal (Ctrl+C) to save auth state
  const cleanup = async () => {
    console.log('\nSaving authentication state...');
    await context.storageState({ path: 'auth.json' });
    console.log('Authentication state saved to auth.json');
    await browser.close();
    process.exit(0);
  };
  
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  
  // Wait indefinitely until user stops the script
  await new Promise(() => {});
}

export default globalSetup;
