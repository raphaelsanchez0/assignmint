import { deleteAllCourses } from "@/server/apis/courses";
import { test as teardown } from "@playwright/test";

teardown("Delete Assignment", async ({ page }) => {
  await deleteAllCourses();

  await page
    .locator("div")
    .filter({ hasText: /^Settings$/ })
    .getByRole("link")
    .click();
  await page.getByRole("button", { name: "Logout" }).click();
});
