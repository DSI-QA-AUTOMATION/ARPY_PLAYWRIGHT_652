import { expect } from "@playwright/test";

export class AlertsPage {
  constructor(page) {
    this.page = page;

    // Homepage card
    this.alertsCard = page.getByRole("heading", { name: "Alerts, Frame & Windows" });

    // Sidebar link
    this.alertsMenu = page.getByRole("link", { name: "Alerts", exact: true });

    // Page title (h1)
    this.heading = page.getByRole("heading", { name: "Alerts", level: 1 });

    // Buttons on Alerts page
    this.simpleAlertButton = page.locator("#alertButton"); // "Click me"
  }

  async openAlertsPageFromHome() {
    await this.alertsCard.scrollIntoViewIfNeeded();
    await this.alertsCard.click();

    await this.alertsMenu.scrollIntoViewIfNeeded();
    await this.alertsMenu.click();

    await expect(this.heading).toBeVisible();
  }

  async triggerAndAcceptAlert() {
    
    this.page.once("dialog", async (dialog) => {
      
      await expect(dialog.message()).toContain("You clicked a button");
      await dialog.accept();
    });

    await this.simpleAlertButton.scrollIntoViewIfNeeded();
    await this.simpleAlertButton.click();
  }
}