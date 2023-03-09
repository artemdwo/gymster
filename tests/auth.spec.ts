import { test, expect } from "@playwright/test";
import { signUp, login } from "./helper";
import { setupE2eTests } from "./utils";

test.describe("User auth", () => {
  // "test@test.test"
  let userEmail = () => {
    return `test${Math.floor(Math.random() * 10000) + 1}@test${
      Math.floor(Math.random() * 100000) + 1
    }.test`;
  };
  const userPassword = "123test123";
  let userName = () => {
    return `test${Math.floor(Math.random() * 10000) + 1}user`;
  };

  test.beforeEach(setupE2eTests);

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321");
  });

  test("new user can signup", async ({ browser, page }) => {
    await signUp(page, userEmail(), userPassword, userName());
  });

  test("after signing up, user can login from another machine", async ({
    browser,
    page,
  }) => {
    const user_email = "whatever@whatever.test";
    await signUp(page, user_email, userPassword, userName());
    const newMachine = await browser.newPage();
    await newMachine.goto("http://localhost:4321");
    await login(newMachine, user_email, userPassword, userName());
  });

  test("after signing up, user is logged in on a new tab", async ({
    context,
    page,
  }) => {
    await signUp(page, userEmail(), userPassword, userName());
    const newTab = await context.newPage();
    await newTab.goto("http://localhost:4321");
    const logoutButton = newTab.locator("button", { hasText: "Logout" });
    await expect(logoutButton).toHaveCount(1);
  });

  test('user without a username gets redirected to "/welcome"', async ({
    page,
  }) => {
    await signUp(page, userEmail(), userPassword, userName(), true);
    await page.goto("http://localhost:4321");
    const welcomeNotice = page.getByTestId("welcome-header");
    await expect(welcomeNotice).toHaveCount(1);
  });

  test('a user with a username get sent back home if they visit "/welcome"', async ({
    page,
  }) => {
    await signUp(page, userEmail(), userPassword, userName());
    await page.goto("http://localhost:4321/welcome");
    const welcomeNotice = page.getByTestId("welcome-header");
    await expect(welcomeNotice).toHaveCount(0);
    const logoutButton = page.locator("button", { hasText: "Logout" });
    await expect(logoutButton).toHaveCount(1);
  });

  test('a logged out user goes to "/" if they visit "/welcome"', async ({
    page,
  }) => {
    await page.goto("http://localhost:4321/welcome");
    await page.waitForNavigation({
      url: "http://localhost:4321/",
      timeout: 2000,
    });
    const welcomeNotice = page.getByTestId("welcome-header");
    await expect(welcomeNotice).toHaveCount(0);
  });

  test.describe("username validation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:4321");
      await signUp(page, userEmail(), userPassword, userName(), true);
    });
    test("it should not allow an empty username", async ({ page }) => {
      const userNameInput = page.locator("input[name='username']");
      const submitButton = page.locator("button", { hasText: "Submit" });
      const validation = page.locator("p.validation-feedback");
      await userNameInput.fill("");
      await expect(submitButton).toBeDisabled();
      await page.keyboard.press("Enter");
      const welcomeHeader = page.getByTestId("welcome-header");
      await expect(welcomeHeader).toHaveCount(1);
    });

    test("it should not allow spaces in the username", async ({ page }) => {
      const userNameInput = page.locator("input[name='username']");
      const submitButton = page.locator("button", { hasText: "Submit" });
      const validation = page.locator("p.validation-feedback");
      await userNameInput.fill("hello world");
      await expect(submitButton).toBeDisabled();
      await page.keyboard.press("Enter");
      const welcomeHeader = page.getByTestId("welcome-header");
      await expect(welcomeHeader).toHaveCount(1);
      await expect(validation).toHaveText(
        "Username can only contain letters, numbers, and underscores"
      );
    });
    test("it should not allow usernames longer than 15 characters", async ({
      page,
    }) => {
      const userNameInput = page.locator("input[name='username']");
      const submitButton = page.locator("button", { hasText: "Submit" });
      const validation = page.locator("p.validation-feedback");
      await userNameInput.fill("asdfhkdasfljfjdakdlsjflakdsjflkasdjflak");
      await expect(submitButton).toBeDisabled();
      await page.keyboard.press("Enter");
      const welcomeHeader = page.getByTestId("welcome-header");
      await expect(welcomeHeader).toHaveCount(1);
      await expect(validation).toHaveText(
        "Username must be less than 15 characters long"
      );
    });

    test("it should not allow usernames less than 3 characters", async ({
      page,
    }) => {
      const userNameInput = page.locator("input[name='username']");
      const submitButton = page.locator("button", { hasText: "Submit" });
      const validation = page.locator("p.validation-feedback");
      await userNameInput.fill("asd");
      await expect(submitButton).toBeDisabled();
      await page.keyboard.press("Enter");
      const welcomeHeader = page.getByTestId("welcome-header");
      await expect(welcomeHeader).toHaveCount(1);
      await expect(validation).toHaveText(
        "Username must be at least 4 characters long"
      );
    });
  });

  test("it should not allow duplicate usernames", async ({ page }) => {
    const user_name = "thesameusername";
    await signUp(page, userEmail(), userPassword, user_name);
    const logoutButton = page.locator("button", { hasText: "Logout" });
    await logoutButton.click();
    const signInButton = page.locator("button", { hasText: "Login" });
    await expect(signInButton).toHaveCount(1);
    await signUp(page, `${userEmail()}`, userPassword, user_name, true);
    const userNameInput = page.locator("input[name='username']");
    const submitButton = page.locator("button", { hasText: "Submit" });
    await userNameInput.fill(userName());
    // potential for eager name validation here later
    await expect(submitButton).toBeEnabled();
    await page.keyboard.press("Enter");
    const welcomeHeader = page.getByTestId("welcome-header");
    await expect(welcomeHeader).toHaveCount(1);
    const validation = page.getByTestId("welcome-form-error-message");
    await expect(validation).toHaveText(
      `Username "${user_name}" is already taken`
    );
  });
});
