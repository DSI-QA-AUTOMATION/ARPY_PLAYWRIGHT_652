import { test } from "@playwright/test";
import { loadTestData } from "../../utils/testUtils";

import { PracticeFormPage } from "../../pages/PracticeFormPage";
import { WidgetsPage } from "../../pages/WidgetsPage";
import { DatePickerPage } from "../../pages/DatePickerPage";
import { InteractionsPage } from "../../pages/InteractionsPage";

test.describe("End-to-End", () => {
  test("TC-15: Complete user journey", async ({ page }) => {
    const data = loadTestData("formData.json").practiceFormUser;
    if (!data) throw new Error("practiceFormUser missing from test-data/formData.json");

    const practiceFormPage = new PracticeFormPage(page);
    const widgetsPage = new WidgetsPage(page);
    const datePickerPage = new DatePickerPage(page);
    const interactionsPage = new InteractionsPage(page);

    // Start from home page
    await page.goto("https://demoqa.com/");

    // Forms -> Practice Form
    await practiceFormPage.openPracticeForm();
    await practiceFormPage.fillMandatoryFields(data);
    await practiceFormPage.setDateOfBirthFromString(data.dateOfBirth);
    await practiceFormPage.setSubjects(data.subjects);
    await practiceFormPage.setHobbies(data.hobbies);
    await practiceFormPage.setAddressAndLocation(data);
    await practiceFormPage.submitForm();
    await practiceFormPage.expectConfirmationModal();

    // Widgets -> Tool Tips
    await page.goto("https://demoqa.com/");
    await widgetsPage.openToolTipsPage();
    await widgetsPage.hoverAndExpectTooltip();

    // Widgets -> Date Picker
    await page.goto("https://demoqa.com/");
    await datePickerPage.openDatePickerPage();
    await datePickerPage.selectDate(12, "February", 2026);
    await datePickerPage.expectDateSelected("02/12/2026");

    // Interactions -> Droppable (drag & drop)
    await page.goto("https://demoqa.com/");
    await interactionsPage.openDroppablePage();
    await interactionsPage.dragAndDropItem();
    await interactionsPage.expectDroppedSuccessfully();
  });
});