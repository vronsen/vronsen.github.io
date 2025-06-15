import { test, expect } from "@playwright/test";

// test("test", async ({ page }) => {
//   await page.goto("http://localhost:3000/contact");
//   await page.getByTestId("subject-input").click();
//   await page.getByTestId("subject-input").click();
//   await page.getByTestId("subject-input").fill("Testbetreff");
//   await page.getByText("BetreffE-MailNachricht").click();
//   await page.getByRole("button", { name: "English" }).click();
//   await page.getByTestId("subject-input").click();
//   await page.getByTestId("email-input").click();
//   await page.getByText("SubjectEmailMessage").click();
//   await page.getByTestId("message-input").click();
//   await page.getByTestId("contact-form").click();
//   await page.getByTestId("submit-button").click();
// });

test.beforeEach(async ({ page }) => {
  // Gemeinsames Setup für alle Tests
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/contact");
  await page.getByTestId("german-button").click();
  await expect(page.getByTestId("contact-form")).toBeVisible();
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

  //await page.screenshot({ path: "screenshots/nach-email-fill4.png" });

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

  //await page.screenshot({ path: "screenshots/nach-email-fill4.png" });

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

//wenn die Mailadresse das falsche Format hat,

//wenn die Nachricht fehlt

//wenn die Nachricht das falsche Format hat

//wenn Mailadresse und Nachricht im falschen Format sind

//wenn Mailadresse und Nachricht fehlen

//wenn Mailadresse fehlt und Nachricht im falschen Format ist

//wenn Mailadresse im falschen Format ist und Nachricht fehlt

// test("homepageIsTranslatedToEnglish", async ({ page }) => {
//   await page.goto("http://localhost:3000/");
//   await page.getByRole("button", { name: "English" }).click();
//   await expect(
//     page.getByRole("heading", { name: "Hi, I am Veronika." })
//   ).toBeVisible();
// });

// test("homepageIsTranslatedToGerman", async ({ page }) => {
//   await page.goto("http://localhost:3000/");
//   await page.getByRole("button", { name: "German" }).click();

//   await page.reload(); // braucht es, damit Text wirklich ersetzt wird

//   await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hi, ich bin Veronika.");
// });
