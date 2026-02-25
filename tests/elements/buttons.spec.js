import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { ButtonsPage } from "../../pages/ButtonsPage";

test.describe("Elements - Buttons", () => {
  test("TC-06: Verify click actions", async ({ page }) => {
    const homePage = new HomePage(page);
    const buttonsPage = new ButtonsPage(page);

    await homePage.openHomePage();
    await homePage.openElements();

    await buttonsPage.openFromElementsPage();

    await buttonsPage.doDoubleClick();
    await buttonsPage.doRightClick();
    await buttonsPage.doSingleClick();

    await buttonsPage.expectMessages();
  });
});