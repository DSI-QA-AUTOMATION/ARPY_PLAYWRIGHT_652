// pages/InteractionsPage.js
const { expect } = require("@playwright/test");

class InteractionsPage {
  constructor(page) {
    this.page = page;

    // Navigation (left menu)
    this.interactionsCard = page.getByText("Interactions", { exact: true });
    this.droppableMenuItem = page.getByText("Droppable", { exact: true });

    // Droppable - Simple tab
    this.simpleTab = page.locator("#droppableExample-tab-simple");

    // Simple tab pane + elements
    this.simplePane = page.locator("#droppableExample-tabpane-simple");
    this.draggable = this.simplePane.locator("#draggable");
    this.droppable = this.simplePane.locator("#droppable");
    this.droppableText = this.droppable.locator("p");
  }

  // Hide/remove DemoQA ads 
  async _neutralizeAds() {
    await this.page.addStyleTag({
      content: `
        /* common DemoQA ad containers */
        #fixedban, #adplus-container, .adsbygoogle, iframe[id^="google_ads"], iframe[src*="ads"] {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `,
    });

    await this.page.evaluate(() => {
      const selectors = ["#fixedban", "#adplus-container"];
      selectors.forEach((s) => document.querySelectorAll(s).forEach((el) => el.remove()));

      [...document.querySelectorAll("body *")].forEach((el) => {
        const st = window.getComputedStyle(el);
        if (st.position === "fixed" && Number(st.zIndex) > 1000) {
          el.style.pointerEvents = "none";
        }
      });
    });
  }

  async openDroppablePage() {
    await this.page.goto("https://demoqa.com/");

    await this.interactionsCard.scrollIntoViewIfNeeded();
    await this.interactionsCard.click();

    await this.droppableMenuItem.scrollIntoViewIfNeeded();
    await this.droppableMenuItem.click();

    await expect(this.page).toHaveURL(/\/droppable/);

    // Remove ad overlays for stability (only in this page object)
    await this._neutralizeAds();

    // "Simple" tab is active
    await this.simpleTab.scrollIntoViewIfNeeded();
    await this.simpleTab.click();

    await expect(this.simplePane).toBeVisible();
    await expect(this.draggable).toBeVisible();
    await expect(this.droppable).toBeVisible();
  }

  async dragAndDropItem() {
    // For TC-15 
    if (!/\/droppable/.test(this.page.url())) {
      await this.page.goto("https://demoqa.com/droppable");
    }

    await this._neutralizeAds();
    await this.page.evaluate(() => window.scrollTo(0, 0));

    await this.simpleTab.scrollIntoViewIfNeeded();
    await this.simpleTab.click();

    await expect(this.simplePane).toBeVisible();
    await expect(this.draggable).toBeVisible();
    await expect(this.droppable).toBeVisible();

    await this.draggable.scrollIntoViewIfNeeded();
    await this.droppable.scrollIntoViewIfNeeded();

    for (let attempt = 1; attempt <= 10; attempt++) {
      await this._neutralizeAds();

      const src = await this.draggable.boundingBox();
      const dst = await this.droppable.boundingBox();
      if (!src || !dst) throw new Error("Could not get bounding boxes for drag/drop elements");

      const startX = src.x + src.width / 2;
      const startY = src.y + src.height / 2;
      const endX = dst.x + dst.width / 2;
      const endY = dst.y + dst.height / 2 + 10;

      await this.page.mouse.move(startX, startY);
      await this.page.mouse.down();
      await this.page.mouse.move(startX + 8, startY + 8, { steps: 6 });
      await this.page.mouse.move(endX, endY, { steps: 30 });
      await this.page.mouse.up();

      const textNow = (await this.droppableText.textContent())?.trim();
      if (textNow === "Dropped!") return;

      await this.page.waitForTimeout(250);
    }
  }

  async expectDroppedSuccessfully() {
    await expect(this.droppableText).toHaveText("Dropped!", { timeout: 20000 });

    await expect.soft(this.droppable).toHaveClass(/ui-state-highlight/, { timeout: 20000 });
  }
}


module.exports = { InteractionsPage };
