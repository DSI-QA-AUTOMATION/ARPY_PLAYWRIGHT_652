import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LinksPage } from "../../pages/LinksPage";

test.describe("Elements - Links", () => {
  test("TC-07: Verify link navigation", async ({ page }) => {
    const homePage = new HomePage(page);
    const linksPage = new LinksPage(page);

    await homePage.openHomePage();
    await homePage.openElements();

    await linksPage.openFromElementsPage();

    const newPage = await linksPage.clickHomeAndGetNewPage();
    await linksPage.expectNavigatedToHome(newPage);
  });
});