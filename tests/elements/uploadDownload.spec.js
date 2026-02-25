import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { UploadDownloadPage } from "../../pages/UploadDownloadPage";

test.describe("Elements - Upload/Download", () => {
  test("TC-08: Upload a file", async ({ page }) => {
    const homePage = new HomePage(page);
    const uploadPage = new UploadDownloadPage(page);

    await homePage.openHomePage();
    await homePage.openElements();

    await uploadPage.openFromElementsPage();

    // Upload valid file (relative to project root)
    await uploadPage.uploadFile("tests/Files/testFile.jpeg");
  });
});