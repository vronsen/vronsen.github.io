import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Gemeinsames Setup für alle Tests
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/contact");
  await page.getByTestId("german-button").click();
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

test("Kontaktformular sendet Anfrage erfolgreich ohne Betreff", async ({
  page,
}) => {
  await page.getByTestId("email-input").fill("test@portfolio.com");
  await page
    .getByTestId("message-input")
    .fill(
      "Das ist eine Nachricht, die ausreichend lang ist, um abgesendet und erfolgreich verschickt zu werden."
    );

  const [request] = await Promise.all([
    page.waitForRequest(
      (req) => req.url().includes("/api/contact") && req.method() === "POST"
    ),
    page.getByTestId("submit-button").click(),
  ]);

  // prüfen, was gesendet wurde
  const postData = request.postDataJSON();
  expect(postData).toMatchObject({
    email: "test@portfolio.com",
    message:
      "Das ist eine Nachricht, die ausreichend lang ist, um abgesendet und erfolgreich verschickt zu werden.",
  });
});

test("Kontaktformular sendet Anfrage erfolgreich mit Betreff", async ({
  page,
}) => {
  await page.getByTestId("subject-input").fill("Testbetreff");
  await page.getByTestId("email-input").fill("test@portfolio.com");
  await page
    .getByTestId("message-input")
    .fill(
      "Das ist eine Nachricht, die ausreichend lang ist, um abgesendet und erfolgreich verschickt zu werden."
    );

  const [request] = await Promise.all([
    page.waitForRequest(
      (req) => req.url().includes("/api/contact") && req.method() === "POST"
    ),
    page.getByTestId("submit-button").click(),
  ]);

  // prüfen, was gesendet wurde
  const postData = request.postDataJSON();
  expect(postData).toMatchObject({
    subject: "Testbetreff",
    email: "test@portfolio.com",
    message:
      "Das ist eine Nachricht, die ausreichend lang ist, um abgesendet und erfolgreich verschickt zu werden.",
  });
});

test("Kontaktformular verhindert Senden bei ungültiger E‑Mail", async ({
  page,
}) => {
  await page.getByTestId("subject-input").fill("Testbetreff");
  await page.getByTestId("email-input").fill("testportfolio.de"); // kein "@" --> ungültig
  await page
    .getByTestId("message-input")
    .fill(
      "Das ist eine Nachricht, die ausreichend lang ist, um abgesendet und erfolgreich verschickt zu werden."
    );

  // prüfen, ob jemals ein POST kommt
  let requestWasSent = false;
  await page.route("**/api/contact", (route, request) => {
    if (request.method() === "POST") {
      requestWasSent = true;
    }
    return route.continue();
  });

  await page.getByTestId("submit-button").click();
  await page.waitForTimeout(1000);

  expect(requestWasSent).toBeFalsy();
});

test("Kontaktformular verhindert Senden bei ungültiger Nachricht", async ({
  page,
}) => {
  await page.getByTestId("subject-input").fill("Testbetreff");
  await page.getByTestId("email-input").fill("test@portfolio.de");
  await page.getByTestId("message-input").fill("Die Nachricht ist zu kurz.");

  // prüfen, ob jemals ein POST kommt
  let requestWasSent = false;
  await page.route("**/api/contact", (route, request) => {
    if (request.method() === "POST") {
      requestWasSent = true;
    }
    return route.continue();
  });

  await page.getByTestId("submit-button").click();
  await page.waitForTimeout(1000);

  expect(requestWasSent).toBeFalsy();
});
