import { test } from "@playwright/test";

import { HomePage } from "../../pages/HomePage";
import { WebTablesPage } from "../../pages/WebTablesPage";

import { loadTestData } from "../../utils/testUtils";

test.describe("Elements - Web Tables",()=>{

 test("TC-05: Add new record", async({page})=>{

  const homePage =
   new HomePage(page);

  const webTablesPage =
   new WebTablesPage(page);

  const data = loadTestData("formData.json").webTablesUser;
  if (!data) {
    throw new Error("webTablesUser is missing from test-data/formData.json");
    }

  await homePage.openHomePage();

  await homePage.openElements();

  await webTablesPage.openFromElementsPage();

  await webTablesPage.clickAdd();

  await webTablesPage.fillForm(data);

  await webTablesPage.submitForm();

  await webTablesPage.expectRecordAdded(data);

 });

});