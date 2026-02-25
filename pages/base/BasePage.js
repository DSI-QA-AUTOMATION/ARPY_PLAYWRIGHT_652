const { expect } = require("@playwright/test");

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async open(path = "/") {
    await this.page.goto(path);
  }

  async expectHeadingVisible(name) {
    await expect(this.page.getByRole("heading", { name })).toBeVisible();
  }

  async clickCard(cardTitle) {
    // Home page category cards have heading text. Click the card area by heading.
    const card = this.page.locator(".card").filter({ hasText: cardTitle });
    await expect(card).toBeVisible();
    await card.click();
  }

  async clickSidebarItem(name) {
    // Left accordion menu items are "span.text"
    const item = this.page.locator(".element-list .text").filter({ hasText: name }).first();
    await expect(item).toBeVisible();
    await item.click();
  }
}

module.exports = { BasePage };
