import { expect } from "@playwright/test";

export class WebTablesPage {

 constructor(page){

  this.page = page;

  this.webTablesMenu =
    page.getByText("Web Tables");

  this.heading =
    page.getByRole("heading",{name:"Web Tables"});

  // Add button
  this.addButton =
    page.locator("#addNewRecordButton");

  // Modal form
  this.form =
    page.locator("#userForm");

  // Inputs
  this.firstName =
    page.locator("#firstName");

  this.lastName =
    page.locator("#lastName");

  this.email =
    page.locator("#userEmail");

  this.age =
    page.locator("#age");

  this.salary =
    page.locator("#salary");

  this.department =
    page.locator("#department");

  this.submit =
    page.locator("#submit");

  // Table rows
  this.tableRows =
    page.locator(".rt-tbody .rt-tr-group");

    this.searchBox = page.locator("#searchBox");

 }

 async openFromElementsPage(){

  await this.webTablesMenu
   .scrollIntoViewIfNeeded();

  await this.webTablesMenu.click();

  await expect(this.heading)
   .toBeVisible();

 }

 async clickAdd(){

  await this.addButton.click();

  await expect(this.form)
   .toBeVisible();

 }

 async fillForm(data){

  await this.firstName.fill(data.firstName);

  await this.lastName.fill(data.lastName);

  await this.email.fill(data.email);

  await this.age.fill(data.age);

  await this.salary.fill(data.salary);

  await this.department.fill(data.department);

 }

 async submitForm() {
  await this.submit.scrollIntoViewIfNeeded();
  await this.submit.click();

  await expect(this.form).toBeHidden();
}

 async expectRecordAdded(data) {
  await this.searchBox.fill(data.firstName);

  const row = this.page.locator("table tbody tr", {
    hasText: data.firstName,
  }).first();

  await expect(row).toBeVisible();
  await expect(row).toContainText(data.lastName);
  await expect(row).toContainText(data.age);
  await expect(row).toContainText(data.email);
  await expect(row).toContainText(data.salary);
  await expect(row).toContainText(data.department);

  await this.searchBox.fill("");
}

}