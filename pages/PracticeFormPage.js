import { expect } from "@playwright/test";

export class PracticeFormPage {
  constructor(page) {
    this.page = page;

    this.formsCard = page.getByRole("heading", { name: "Forms" });
    this.practiceFormMenu = page.getByRole("link", { name: "Practice Form", exact: true });
    this.heading = page.getByRole("heading", { name: "Practice Form", level: 1 });

    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.email = page.locator("#userEmail");

    // Gender labels
    this.genderMale = page.locator("label[for='gender-radio-1']");
    this.genderFemale = page.locator("label[for='gender-radio-2']");
    this.genderOther = page.locator("label[for='gender-radio-3']");

    this.mobile = page.locator("#userNumber");

    // DOB
    this.dobInput = page.locator("#dateOfBirthInput");
    this.monthSelect = page.locator(".react-datepicker__month-select");
    this.yearSelect = page.locator(".react-datepicker__year-select");

    // Subjects
    this.subjectsInput = page.locator("#subjectsInput");

    // Hobby labels
    this.hobbySports = page.locator("label[for='hobbies-checkbox-1']");
    this.hobbyReading = page.locator("label[for='hobbies-checkbox-2']");
    this.hobbyMusic = page.locator("label[for='hobbies-checkbox-3']");

    // Address
    this.currentAddress = page.locator("#currentAddress");

    // State/City react-select inputs
    this.stateInput = page.locator("#react-select-3-input");
    this.cityInput = page.locator("#react-select-4-input");

    this.submit = page.locator("#submit");

    // Modal
    this.modal = page.locator(".modal-content");
    this.modalTitle = page.locator("#example-modal-sizes-title-lg");
  }

  async openPracticeForm() {
    await this.formsCard.scrollIntoViewIfNeeded();
    await this.formsCard.click();

    await this.practiceFormMenu.scrollIntoViewIfNeeded();
    await this.practiceFormMenu.click();

    await expect(this.heading).toBeVisible();
  }

  async fillMandatoryFields(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);

    const gender = String(data.gender || "").toLowerCase();
    if (gender === "male") await this.genderMale.click();
    else if (gender === "other") await this.genderOther.click();
    else await this.genderFemale.click(); 

    const mobile10 = String(data.mobile).replace(/\D/g, "").slice(-10);
    if (mobile10.length !== 10) {
      throw new Error(`Mobile must be 10 digits. Got: ${data.mobile}`);
    }
    await this.mobile.fill(mobile10);
  }

  async setDateOfBirthFromString(dateStr) {
    const m = String(dateStr).trim().match(/^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})$/);
    if (!m) {
      throw new Error(`dateOfBirth must look like "15 Feb 1996". Got: ${dateStr}`);
    }

    const day = m[1];
    const monthText = m[2];
    const year = m[3];

    // react-datepicker month dropdown uses full month names
    const monthMap = {
      jan: "January", feb: "February", mar: "March", apr: "April",
      may: "May", jun: "June", jul: "July", aug: "August",
      sep: "September", oct: "October", nov: "November", dec: "December",
    };
    const monthKey = monthText.slice(0, 3).toLowerCase();
    const monthLabel = monthMap[monthKey] || monthText;

    await this.dobInput.click();
    await this.yearSelect.selectOption(year);
    await this.monthSelect.selectOption({ label: monthLabel });

    const dd = String(day).padStart(2, "0");
    await this.page
      .locator(`.react-datepicker__day--0${dd}:not(.react-datepicker__day--outside-month)`)
      .first()
      .click();
  }

  async setSubjects(subjects) {
    for (const s of subjects || []) {
      await this.subjectsInput.fill(s);
      await this.subjectsInput.press("Enter");
    }
  }

  async setHobbies(hobbies) {
    for (const h of hobbies || []) {
      const key = String(h).toLowerCase();
      if (key === "sports") await this.hobbySports.click();
      else if (key === "reading") await this.hobbyReading.click();
      else if (key === "music") await this.hobbyMusic.click();
    }
  }

  async setAddressAndLocation(data) {
    await this.currentAddress.fill(data.currentAddress);

    // State
    await this.stateInput.fill(data.state);
    await this.stateInput.press("Enter");

    // City
    await this.cityInput.fill(data.city);
    await this.cityInput.press("Enter");
  }

  async submitForm() {
    await this.submit.scrollIntoViewIfNeeded();
    await this.submit.click();
  }

  async expectConfirmationModal() {
    await expect(this.modal).toBeVisible();
    await expect(this.modalTitle).toHaveText("Thanks for submitting the form");
  }
}