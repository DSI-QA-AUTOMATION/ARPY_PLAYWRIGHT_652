import { test } from "@playwright/test";
import { PracticeFormPage } from "../../pages/PracticeFormPage";
import { loadTestData } from "../../utils/testUtils";

test.describe("Forms - Practice Form", () => {
  test("TC-09: Submit complete form", async ({ page }) => {
    const practiceFormPage = new PracticeFormPage(page);

    const data = loadTestData("formData.json").practiceFormUser;
    if (!data) throw new Error("practiceFormUser missing from test-data/formData.json");

    await page.goto("https://demoqa.com/");
    await practiceFormPage.openPracticeForm();

    await practiceFormPage.fillMandatoryFields(data);
    await practiceFormPage.setDateOfBirthFromString(data.dateOfBirth);
    await practiceFormPage.setSubjects(data.subjects);
    await practiceFormPage.setHobbies(data.hobbies);
    await practiceFormPage.setAddressAndLocation(data);

    await practiceFormPage.submitForm();
    await practiceFormPage.expectConfirmationModal();
  });
});