import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Gemeinsames Setup für alle Tests
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/contact");
  await expect(page.getByTestId("contact-form")).toBeVisible();
  await expect(page.getByTestId("submit-button")).toBeVisible();
});

test("Die drei Inputfelder und der Submitbutton für das Kontaktformular sind vorhanden", async ({
  page,
}) => {
  await expect(page.getByTestId("subject-input")).toBeVisible();
  await expect(page.getByTestId("email-input")).toBeVisible();
  await expect(page.getByTestId("message-input")).toBeVisible();
  await expect(page.getByTestId("submit-button")).toBeVisible();
});