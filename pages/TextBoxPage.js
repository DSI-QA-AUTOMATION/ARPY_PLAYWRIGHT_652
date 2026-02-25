import { expect } from "@playwright/test";

export class TextBoxPage {
  constructor (page){
    this.page = page;

    this.menu = page.getByText("Text Box");
    this.fullNameInput = page.locator("#userName");
    this.emailInput = page.locator("#userEmail"); 
    this.currentAddressInput = page.locator("#currentAddress");
    this.permanentAddressInput = page.locator("#permanentAddress");
    this.submitButton = page.locator("#submit");

  }

  async openFromElementsPage() {
    await this.menu.click();

  }

  async fillForm(data) {
    await this.fullNameInput.fill(data.fullname);
    await this.emailInput.fill(data.email);
    await this.currentAddressInput.fill(data.currentaddress);
    await this.permanentAddressInput.fill(data.permanentaddress);
  }

  async submit() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async expectOutput(data) {
    await expect(this.page.locator("#output #name")).toContainText(data.fullname);
    await expect(this.page.locator("#output #email")).toContainText(data.email);
    await expect(this.page.locator("#output #currentAddress")).toContainText(data.currentaddress);
    await expect(this.page.locator("#output #permanentAddress")).toContainText(data.permanentaddress);

 }

  async validateValidSubmission(data) {
    // Email should not be invalid
    await expect(this.emailInput).not.toHaveClass(/field-error/);
    
    // Output visible
    await expect(this.page.locator("#output")).toBeVisible();
    
    // Output values correct
    await this.expectOutput(data);
  }

}