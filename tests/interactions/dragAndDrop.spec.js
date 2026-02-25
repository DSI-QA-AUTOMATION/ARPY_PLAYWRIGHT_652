import { test } from "@playwright/test";
import { InteractionsPage } from "../../pages/InteractionsPage";

test.describe("Interactions - Droppable", () => {
  test("TC-14: Drag and drop element", async ({ page }) => {
    const interactionsPage = new InteractionsPage(page);

    await page.goto("https://demoqa.com/");
    await interactionsPage.openDroppablePage();

    await interactionsPage.dragAndDropItem();
    await interactionsPage.expectDroppedSuccessfully();
  });
});