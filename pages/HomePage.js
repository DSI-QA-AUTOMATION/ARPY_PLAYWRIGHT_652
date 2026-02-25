import { expect } from "@playwright/test";

export class HomePage {

  constructor(page) {

    this.page = page;

    // Main category cards
    this.elementsCard =
      page.getByRole("heading", { name: "Elements" });

    this.formsCard =
      page.getByRole("heading", { name: "Forms" });

    this.alertsFrameWindowsCard =
      page.getByRole("heading",
        { name: "Alerts, Frame & Windows" });

    this.widgetsCard =
      page.getByRole("heading", { name: "Widgets" });

    this.interactionsCard =
      page.getByRole("heading", { name: "Interactions" });

    this.bookStoreCard =
      page.getByRole("heading",
        { name: "Book Store Application" });

  }


  async openHomePage() {

    await this.page.goto("https://demoqa.com/");

  }

  async openElements() {
    await this.elementsCard.click();
  }


  async expectMainCategoriesVisible() {

    await expect(this.elementsCard).toBeVisible();

    await expect(this.formsCard).toBeVisible();

    await expect(this.alertsFrameWindowsCard)
      .toBeVisible();

    await expect(this.widgetsCard).toBeVisible();

    await expect(this.interactionsCard)
      .toBeVisible();

    await expect(this.bookStoreCard)
      .toBeVisible();

  }

}