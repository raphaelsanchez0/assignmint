import { test, expect } from "@playwright/test";
import { createSupabaseServiceClient } from "@/utils/supabase/supabaseServiceClient";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const supabase = createSupabaseServiceClient();

test("Signup", async ({ page }) => {
  const testUserEmail = process.env.TEST_USER_EMAIL!;

  //Delete User
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select()
    .eq("email", testUserEmail);

  if (profiles && profiles.length > 0) {
    const testUserId = profiles[0].id;
    await supabase.auth.admin.deleteUser(testUserId);
  }

  //Create New UserF
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Sign Up" }).click();
  await page.getByRole("textbox", { name: "First Name" }).click();
  await page.getByRole("textbox", { name: "First Name" }).fill("test");
  await page.getByRole("textbox", { name: "First Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Last Name" }).fill("test");
  await page.getByRole("textbox", { name: "Last Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Email" }).fill(testUserEmail);
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("test12345");
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .press("Tab");
  await page.getByRole("textbox", { name: "Confirm Password" }).press("Tab");
  await page.getByRole("textbox", { name: "Confirm Password" }).click();
  await page
    .getByRole("textbox", { name: "Confirm Password" })
    .fill("test12345");
  await page.getByRole("button", { name: "Sign Up" }).click();
  await page.waitForURL("http://localhost:3000/dashboard");

  //Create Course
  await page
    .locator("div")
    .filter({ hasText: /^Settings$/ })
    .getByRole("link")
    .click();
  await page.waitForURL("http://localhost:3000/settings");
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("textbox", { name: "Title" }).fill("test course");
  await page.getByRole("button", { name: "Create Course" }).click();
  await expect(
    page.getByRole("heading", { name: "test course" }),
  ).toBeVisible();

  //Create Assignment
  await page
    .locator("div")
    .filter({ hasText: /^Dashboard$/ })
    .getByRole("link")
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Add$/ })
    .getByRole("button")
    .click();
  await page.getByRole("combobox", { name: "Course Add Courses" }).click();
  await page.getByRole("option", { name: "test course" }).click();
  await page.getByRole("textbox", { name: "Title" }).click();
  await page.getByRole("textbox", { name: "Title" }).fill("test assignment");
  await page.getByRole("button", { name: "Create Assignment" }).click();

  const formattedCurrentDay = format(
    utcToZonedTime(new Date(), "Etc/UTC"),
    "MMM d",
  );
  //Check New Assignment Exists
  await expect(
    page.getByRole("heading", { name: "test assignment" }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: formattedCurrentDay }),
  ).toBeVisible();

  //Create Exam
  await page
    .locator("div")
    .filter({ hasText: /^ExamsAdd$/ })
    .getByRole("button")
    .click();
  await page.getByRole("combobox", { name: "Course Add Courses" }).click();
  await page.getByRole("option", { name: "test course" }).click();
  await page.getByRole("textbox", { name: "Title" }).click();
  await page.getByRole("textbox", { name: "Title" }).fill("test exam");
  await page.getByRole("button", { name: "Create Exam" }).click();

  //Check New Exam Exists
  await expect(page.getByRole("heading", { name: "test exam" })).toBeVisible();
  await expect(page.getByRole("main")).toContainText(formattedCurrentDay);

  //Delete Assignment
  await page.getByRole("heading", { name: "test assignment" }).click();
  await page.getByRole("button", { name: "Complete" }).click();

  //Check the assignment is gone
  await expect(
    page.getByRole("heading", { name: "test assignment" }),
  ).toBeHidden();

  //Delete Exam

  await page.getByRole("heading", { name: "test exam" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
});
