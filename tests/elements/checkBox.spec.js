import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { CheckBoxPage } from "../../pages/CheckBoxPage";

test.describe("Elements - Check Box", () => {
  test("TC-03: Select multiple checkboxes", async ({ page }) => {
    const homePage = new HomePage(page);
    const checkBoxPage = new CheckBoxPage(page);

    await homePage.openHomePage();
    await homePage.openElements();

    await checkBoxPage.openFromElementsPage();
    await checkBoxPage.selectMultiple();
  });
});