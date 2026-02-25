import { test } from "@playwright/test";
import { AlertsPage } from "../../pages/AlertsPage";

test.describe("Alerts", () => {
  test("TC-10: Handle alert popup", async ({ page }) => {
    const alertsPage = new AlertsPage(page);

    await page.goto("https://demoqa.com/");
    await alertsPage.openAlertsPageFromHome();

    await alertsPage.triggerAndAcceptAlert();

    
  });
});