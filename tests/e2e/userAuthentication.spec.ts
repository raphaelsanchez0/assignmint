import { test, expect } from "@playwright/test";
import loginUser from "./loginUser";

test("User can log in and navigate to settings before logging out", async ({
  page,
}) => {
  loginUser(page);

  await page.waitForSelector('div:has-text("Settings")', { state: "visible" });
  await page
    .locator("div")
    .filter({ hasText: /^Settings$/ })
    .getByRole("link")
    .click();
  await page.getByRole("button", { name: "Logout" }).click();
});
