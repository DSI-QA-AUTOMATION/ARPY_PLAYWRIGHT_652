import { expect } from "@playwright/test";

export class LinksPage {
  constructor(page) {
    this.page = page;

    this.linksMenu = page.getByRole("link", { name: "Links", exact: true });;
    this.heading = page.getByRole("heading", { name: "Links", level: 1 });

    // Link
    this.homeLink = page.locator("#simpleLink"); // "Home"
  }

  async openFromElementsPage() {
    await this.linksMenu.scrollIntoViewIfNeeded();
    await this.linksMenu.click();
    await expect(this.heading).toBeVisible();
  }

  async clickHomeAndGetNewPage() {
    // Home opens in new tab
    const popupPromise = this.page.waitForEvent("popup");
    await this.homeLink.scrollIntoViewIfNeeded();
    await this.homeLink.click();
    const newPage = await popupPromise;
    await newPage.waitForLoadState("domcontentloaded");
    return newPage;
  }

  async expectNavigatedToHome(newPage) {
    await expect(newPage).toHaveURL(/demoqa\.com\/?/);

    await expect(
      newPage.getByRole("heading", { name: "Elements" })
    ).toBeVisible();
  }
}