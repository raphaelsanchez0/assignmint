import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("Authenticate test user", async ({ page }) => {
  await page.goto("/login");
  await page.getByPlaceholder("johndoe@gmail.com").click();
  await page
    .getByPlaceholder("johndoe@gmail.com")
    .fill(process.env.NEXT_PUBLIC_TEST_USERNAME_01!);
  await page.getByPlaceholder("Password").click();
  await page
    .getByPlaceholder("Password")
    .fill(process.env.NEXT_PUBLIC_TEST_PASSWORD_01!);
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.waitForURL("/dashboard");
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
