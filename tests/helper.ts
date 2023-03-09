import { expect, Page } from "@playwright/test";

export async function signUp(
  page: Page,
  email: string,
  password: string,
  userName: string,
  skipUserName = false
) {
  const signUpButton = page.getByTestId("register-button");
  await signUpButton.click();
  const emailInput = page.locator('input[name="email"]');
  await emailInput.fill(email);
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.fill(password);
  await page.locator('button[type="submit"]').click();
  //   await page.keyboard.press("Enter");
  const welcomeNotice = page.getByTestId("welcome-header");
  await expect(welcomeNotice).toHaveCount(1);
  if (skipUserName) {
    return;
  }
  const usernameInput = page.getByTestId("new-username-input");
  await usernameInput.fill(userName);
  const submitButton = page.getByTestId("welcome-form-submit-button");
  await expect(submitButton).toBeEnabled();
  await submitButton.click();
  const logoutButton = page.locator("button", { hasText: "Logout" });
  await expect(logoutButton).toHaveCount(1);
}

export async function login(
  page: Page,
  email: string,
  password: string,
  username: string,
  loginButtonSelector = "button"
) {
  const signUpButton = page
    .locator(loginButtonSelector, { hasText: "Login" })
    .first();
  await signUpButton.click();
  const emailInput = page.locator('input[name="email"]');
  await emailInput.fill(email);
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.fill(password);
  const signUpSubmitButton = page.locator("button.supabase-ui-auth_ui-button");
  await signUpSubmitButton.click();
  const logoutButton = page.getByTestId("logout-button");
  await expect(logoutButton).toHaveCount(1);
  const usernameMention = page.locator("h2", { hasText: username });
  await expect(usernameMention).toHaveCount(1);
}
