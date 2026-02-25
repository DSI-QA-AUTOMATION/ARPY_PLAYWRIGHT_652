
import { expect } from "@playwright/test";

export class WidgetsPage {
  constructor(page) {
    this.page = page;

    // Home page card
    this.widgetsCard = page.getByRole("heading", { name: "Widgets" });

    // Sidebar menu
    this.toolTipsMenu = page.getByRole("link", { name: "Tool Tips", exact: true });

    // Page title
    this.heading = page.getByRole("heading", { name: "Tool Tips", level: 1 });

    // Hover target
    this.hoverButton = page.locator("#toolTipButton");

    // Tooltip container rendered on hover
    this.tooltip = page.locator(".tooltip-inner");
  }

  async openToolTipsPage() {
    await this.widgetsCard.scrollIntoViewIfNeeded();
    await this.widgetsCard.click();

    await this.toolTipsMenu.scrollIntoViewIfNeeded();
    await this.toolTipsMenu.click();

    await expect(this.heading).toBeVisible();
  }

  async hoverAndExpectTooltip() {
    await this.hoverButton.scrollIntoViewIfNeeded();
    await this.hoverButton.hover();

    await expect(this.tooltip).toBeVisible();
    await expect(this.tooltip).toHaveText("You hovered over the Button");
  }
}