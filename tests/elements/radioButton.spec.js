import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { RadioButtonPage } from "../../pages/RadioButtonPage";

test.describe("Elements - Radio Button", () => {
  test("TC-04: Select radio button", async ({ page }) => {
    const homePage = new HomePage(page);
    const radioButtonPage = new RadioButtonPage(page);

    await homePage.openHomePage();
    await homePage.openElements();

    await radioButtonPage.openFromElementsPage();
    await radioButtonPage.selectYes();
    await radioButtonPage.expectYesSelectedMessage();
  });
});