import { test, expect, Page } from "@playwright/test";

export default async function loginUser(page: Page) {
  await page.goto("http://localhost:3000/");
  await page.goto("http://localhost:3000/login");
  await page.getByPlaceholder("johndoe@gmail.com").click();
  await page
    .getByPlaceholder("johndoe@gmail.com")
    .fill(process.env.NEXT_PUBLIC_TEST_USERNAME_01!);
  await page.getByPlaceholder("Password").click();
  await page
    .getByPlaceholder("Password")
    .fill(process.env.NEXT_PUBLIC_TEST_PASSWORD_01!);
  await page.getByRole("button", { name: "Sign In" }).click();
}
