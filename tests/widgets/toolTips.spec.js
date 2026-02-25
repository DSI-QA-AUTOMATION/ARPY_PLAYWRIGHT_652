import { test } from "@playwright/test";
import { WidgetsPage } from "../../pages/WidgetsPage";

test.describe("Widgets - Tool Tips", () => {
  test("TC-12: Verify tooltip", async ({ page }) => {
    const widgetsPage = new WidgetsPage(page);

    await page.goto("https://demoqa.com/");
    await widgetsPage.openToolTipsPage();
    await widgetsPage.hoverAndExpectTooltip();
  });
});