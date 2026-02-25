import { expect } from "@playwright/test";

export class CheckBoxPage {
  constructor(page) {
    this.page = page;

    this.checkBoxMenu = page.getByText("Check Box");
    this.heading = page.getByRole("heading", { name: "Check Box" });

    // rc-tree root
    this.tree = page.locator(".rc-tree");
  }

  async openFromElementsPage() {
    await this.checkBoxMenu.scrollIntoViewIfNeeded();
    await this.checkBoxMenu.click();

    await expect(this.heading).toBeVisible();
    await expect(this.tree).toBeVisible();
  }

  // Find the treeitem row by visible title text ("Home", "Desktop", etc.)
  treeItem(titleText) {
    return this.tree.locator("div[role='treeitem']", {
      has: this.tree.locator(`span[title="${titleText}"]`),
    }).first();
  }

  // Expand a node if collapsed (uses aria-expanded on treeitem)
  async expandIfCollapsed(titleText) {
    const item = this.treeItem(titleText);
    await expect(item).toBeVisible();

    const expanded = await item.getAttribute("aria-expanded");
    if (expanded === "false") {
      const switcher = item.locator("span.rc-tree-switcher").first();
      await switcher.scrollIntoViewIfNeeded();
      await switcher.click();
    }
  }

  // Expand everything by clicking all "close" switchers until none left
  async expandAll() {
    // Keep clicking collapsed switchers until tree is fully expanded
    while (true) {
      const collapsedSwitcher = this.tree.locator(
        "span.rc-tree-switcher.rc-tree-switcher_close"
      ).first();

      if ((await collapsedSwitcher.count()) === 0) break;

      await collapsedSwitcher.scrollIntoViewIfNeeded();
      await collapsedSwitcher.click();
    }
  }

  // Select a checkbox by its accessible name: "Select Downloads", etc.
  async checkByName(nodeTitleText) {
    const checkbox = this.tree.getByRole("checkbox", {
      name: `Select ${nodeTitleText}`,
    }).first();

    await expect(checkbox).toBeVisible();
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.click();

    // Verify checked via aria-checked
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
  }

  async selectMultiple() {
    // Guaranteed full expansion (matches your screenshot)
    await this.expandAll();

    await this.checkByName("Downloads");
    await this.checkByName("Notes");
    await this.checkByName("Commands");
  }
}