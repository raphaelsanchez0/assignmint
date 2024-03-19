import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  //Add course
  await page.goto("/settings");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByPlaceholder("Course Name").fill("course");
  await page.getByPlaceholder("Course Name").press("Enter");

  //Assert course has been added
  await expect(page.locator("h4")).toContainText("course");

  //Go To Dashboard
  await page
    .locator("div")
    .filter({ hasText: /^Dashboard$/ })
    .getByRole("link")
    .click();

  //Add Assignment Due today
  await page
    .locator("div")
    .filter({ hasText: /^Add$/ })
    .getByRole("button")
    .click();
  await page.getByLabel("Course").click();
  await page.getByLabel("course", { exact: true }).click();
  await page.getByPlaceholder("Title").click();
  await page.getByPlaceholder("Title").fill("today course");
  await page.getByPlaceholder("Notes").click();
  await page.getByPlaceholder("Notes").fill("test note");
  await page.getByRole("button", { name: "Create Assignment" }).click();

  //Assert Assignment has been properly made
  await expect(
    page.getByRole("heading", { name: "today course" }),
  ).toBeVisible();
  await page.getByRole("heading", { name: "Due Today" }).click();
  await page.getByRole("menuitem", { name: "Edit" }).click();
  await expect(page.getByPlaceholder("Title")).toHaveValue("today course");
  await expect(page.getByPlaceholder("Notes")).toContainText("test note");
  await page.getByRole("button", { name: "Close" }).click();

  //Add exam set for today
  await page.getByRole("button", { name: "Add" }).nth(1).click();
  await page.getByLabel("Course").click();
  await page.getByLabel("course", { exact: true }).click();
  await page.getByPlaceholder("CHEM Midterm").click();
  await page.getByPlaceholder("CHEM Midterm").fill("test exam today");
  await page.getByPlaceholder("Notes").click();
  await page.getByPlaceholder("Notes").fill("test note");
  await page.getByRole("button", { name: "Create Exam" }).click();

  //Assert Exam has been made correctly
  await page.getByRole("heading", { name: "test exam today" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^test exam todaycourse$/ })
    .locator("h5")
    .click();
  await expect(page.getByPlaceholder("Notes")).toHaveValue("test note");
  await page.getByPlaceholder("CHEM Midterm").click();
  await expect(page.getByPlaceholder("CHEM Midterm")).toHaveValue(
    "test exam today",
  );
  await page.getByRole("button", { name: "Close" }).click();

  //Assert exam and assignment are showing up in "This Week"
  await expect(page.getByText("This WeekToday1 Exam, 1")).toBeVisible();

  await expect(
    page
      .locator("ol")
      .filter({ hasText: "test exam todaycourse" })
      .locator("h4"),
  ).toBeVisible();
  await expect(
    page
      .locator("ol")
      .filter({ hasText: /^today coursecourse$/ })
      .locator("h4"),
  ).toBeVisible();
});
