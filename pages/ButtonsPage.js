import { expect } from "@playwright/test";

export class ButtonsPage {
  constructor(page) {
    this.page = page;

    this.buttonsMenu = page.getByText("Buttons");
    this.heading = page.getByRole("heading", { name: "Buttons" });

    // Buttons
    this.doubleClickBtn = page.locator("#doubleClickBtn");
    this.rightClickBtn = page.locator("#rightClickBtn");

    
    this.singleClickBtn = page.getByRole("button", { name: "Click Me" }).last();

    // Messages
    this.doubleClickMsg = page.locator("#doubleClickMessage");
    this.rightClickMsg = page.locator("#rightClickMessage");
    this.dynamicClickMsg = page.locator("#dynamicClickMessage");
  }

  async openFromElementsPage() {
    await this.buttonsMenu.scrollIntoViewIfNeeded();
    await this.buttonsMenu.click();

    await expect(this.heading).toBeVisible();
  }

  async doDoubleClick() {
    await this.doubleClickBtn.scrollIntoViewIfNeeded();
    await this.doubleClickBtn.dblclick();
  }

  async doRightClick() {
    await this.rightClickBtn.scrollIntoViewIfNeeded();
    await this.rightClickBtn.click({ button: "right" });
  }

  async doSingleClick() {
    await this.singleClickBtn.scrollIntoViewIfNeeded();
    await this.singleClickBtn.click();
  }

  async expectMessages() {
    await expect(this.doubleClickMsg).toHaveText("You have done a double click");
    await expect(this.rightClickMsg).toHaveText("You have done a right click");
    await expect(this.dynamicClickMsg).toHaveText("You have done a dynamic click");
  }
}