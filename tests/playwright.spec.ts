import { test, expect } from '@playwright/test';

test.describe('Playwright Website Tests', () => {
  test('homepage has correct title and getting started link', async ({ page }) => {
    // Navigate to the Playwright website
    await page.goto('https://playwright.dev');

    // Verify the page title
    await expect(page).toHaveTitle(/Playwright/);

    // Find and click the "Get Started" link
    const getStartedLink = page.getByRole('link', { name: 'Get started' });
    await expect(getStartedLink).toBeVisible();

    // Verify the "Get Started" link href
    await expect(getStartedLink).toHaveAttribute('href', '/docs/intro');
  });

  test('navigation between documentation pages', async ({ page }) => {
    // Start at the intro page
    await page.goto('https://playwright.dev/docs/intro');

    // Navigate to the Writing Tests section
    await page.getByRole('link', { name: 'Writing tests', exact: true }).click();

    // Verify we're on the correct page
    await expect(page).toHaveURL(/.*writing-tests/);
    await expect(page.getByRole('heading', { name: 'Writing tests' })).toBeVisible();
  });
});
