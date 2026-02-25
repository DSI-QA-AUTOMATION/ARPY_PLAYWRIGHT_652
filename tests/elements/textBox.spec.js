import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { TextBoxPage } from "../../pages/TextBoxPage";
import { loadTestData } from "../../utils/testUtils";


test.describe("Elements - Text Box", () => {
  test("TC-02: Submit text box with valid data", async ({ page }) => {
    const homePage = new HomePage(page);
    const textBoxPage = new TextBoxPage(page);

    const users =
    loadTestData("users.json");

    const data = users.textBoxUser;

    // Go to homepage and open Elements
    await homePage.openHomePage();
    await homePage.openElements();

    // Open Text Box page
    await textBoxPage.openFromElementsPage();

    await textBoxPage.fillForm(data);
    await textBoxPage.submit();
    await textBoxPage.expectOutput(data);
    await textBoxPage.validateValidSubmission(data);
  });
});