import { test as setup, expect, Page } from "@playwright/test";
const authFile = "playwright/.auth/user.json";

const customer01Email = process.env.NEXT_PUBLIC_TEST_USERNAME_01!;
const customer01Password = process.env.NEXT_PUBLIC_TEST_PASSWORD_01!;
const customer01AuthFile = process.env.NEXT_PUBLIC_TEST_USER01_FILE;

const customer02Email = process.env.NEXT_PUBLIC_TEST_USERNAME_02!;
const customer02Password = process.env.NEXT_PUBLIC_TEST_PASSWORD_02!;
const customer02AuthFile = "playwright/.auth/customer02.json";

setup("Create Customer 01 Auth", async ({ page }) => {
  await loginWithEmail(page, customer01Email, customer01Password);

  const context = page.context();
  await context.storageState({ path: customer01AuthFile });
});

setup("Create Customer 02 Auth", async ({ page }) => {
  await loginWithEmail(page, customer02Email, customer02Password);

  const context = page.context();
  await context.storageState({ path: "customer01AuthFile" });
});

async function loginWithEmail(page: Page, email: string, password: string) {
  await page.goto("http://localhost:3000/");
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("johndoe@gmail.com").click();
  await page.getByPlaceholder("johndoe@gmail.com").fill(email);
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page).toHaveTitle("Dashboard");
}
