const base = require("@playwright/test");

const { HomePage } = require("../pages/HomePage");
const { TextBoxPage } = require("../pages/TextBoxPage");


const test = base.test.extend({
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  textBoxPage: async ({ page }, use) => { await use(new TextBoxPage(page)); },
  checkBoxPage: async ({ page }, use) => { await use(new CheckBoxPage(page)); },
  radioButtonPage: async ({ page }, use) => { await use(new RadioButtonPage(page)); },
  webTablesPage: async ({ page }, use) => { await use(new WebTablesPage(page)); },
  buttonsPage: async ({ page }, use) => { await use(new ButtonsPage(page)); },
  linksPage: async ({ page }, use) => { await use(new LinksPage(page)); },
  uploadDownloadPage: async ({ page }, use) => { await use(new UploadDownloadPage(page)); },
  practiceFormPage: async ({ page }, use) => { await use(new PracticeFormPage(page)); },
  alertsPage: async ({ page }, use) => { await use(new AlertsPage(page)); },
  framesPage: async ({ page }, use) => { await use(new FramesPage(page)); },
  widgetsPage: async ({ page }, use) => { await use(new WidgetsPage(page)); },
  interactionsPage: async ({ page }, use) => { await use(new InteractionsPage(page)); },
});

module.exports = {
  test,
  expect: base.expect,
};
