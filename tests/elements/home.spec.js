import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";

test.describe("Homepage Categories", () => {

  test("TC-01: Verify all main categories are visible",
    async ({ page }) => {

      const homePage = new HomePage(page);

      await homePage.openHomePage();

      await homePage.expectMainCategoriesVisible();

  });

});