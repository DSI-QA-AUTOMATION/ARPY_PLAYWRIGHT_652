import { expect } from "@playwright/test";

export class RadioButtonPage {
  constructor(page) {
    this.page = page;

    this.radioButtonMenu = page.getByText("Radio Button");
    this.heading = page.getByRole("heading", { name: "Radio Button" });

    // The clickable label is reliable
    this.yesLabel = page.locator("label[for='yesRadio']");

    // Message area
    this.resultText = page.locator(".text-success");
    this.resultContainer = page.locator(".mt-3"); // contains "You have selected"
  }

  async openFromElementsPage() {
    await this.radioButtonMenu.scrollIntoViewIfNeeded();
    await this.radioButtonMenu.click();

    await expect(this.heading).toBeVisible();
  }

  async selectYes() {
    await this.yesLabel.scrollIntoViewIfNeeded();
    await this.yesLabel.click();
  }

  async expectYesSelectedMessage() {
    await expect(this.resultContainer).toContainText("You have selected");
    await expect(this.resultText).toHaveText("Yes");
  }
}