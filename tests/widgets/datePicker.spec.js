import { test } from "@playwright/test";
import { DatePickerPage } from "../../pages/DatePickerPage";

test.describe("Widgets - Date Picker",()=>{

 test("TC-13: Select a date", async({page})=>{

  const datePicker =
   new DatePickerPage(page);

  await page.goto("https://demoqa.com/");

  await datePicker.openDatePickerPage();


  await datePicker.selectDate(
   15,
   "February",
   2026
  );

  // MM/DD/YYYY format
  await datePicker.expectDateSelected(
   "02/15/2026"
  );

 });

});