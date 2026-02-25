import { expect } from "@playwright/test";

export class DatePickerPage {

 constructor(page){

  this.page = page;

  // Homepage card
  this.widgetsCard =
   page.getByRole("heading",{name:"Widgets"});

  // Sidebar
  this.datePickerMenu =
   page.getByRole("link",
    {name:"Date Picker", exact:true});

  // Heading
  this.heading =
   page.getByRole("heading",
    {name:"Date Picker", level:1});

  // Input
  this.dateInput =
   page.locator("#datePickerMonthYearInput");

  // Dropdowns
  this.monthSelect =
   page.locator(".react-datepicker__month-select");

  this.yearSelect =
   page.locator(".react-datepicker__year-select");

 }

 async openDatePickerPage(){

  await this.widgetsCard
   .scrollIntoViewIfNeeded();

  await this.widgetsCard.click();

  await this.datePickerMenu
   .scrollIntoViewIfNeeded();

  await this.datePickerMenu.click();

  await expect(this.heading)
   .toBeVisible();

 }

 async selectDate(day, monthLabel, year){

  await this.dateInput.click();

  // Select year
  await this.yearSelect
   .selectOption(String(year));

  // Select month
  await this.monthSelect
   .selectOption({label:monthLabel});

  // Select day
  const dd =
   String(day).padStart(2,"0");

  await this.page
   .locator(`.react-datepicker__day--0${dd}:not(.react-datepicker__day--outside-month)`)
   .first()
   .click();

 }

 async expectDateSelected(expectedValue){

  await expect(this.dateInput)
   .toHaveValue(expectedValue);

 }

}