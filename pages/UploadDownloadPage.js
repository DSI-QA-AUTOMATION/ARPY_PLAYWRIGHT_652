import { expect } from "@playwright/test";
import path from "path";

export class UploadDownloadPage {
  constructor(page) {
    this.page = page;

    this.menu = page.getByText("Upload and Download");
    this.heading = page.getByRole("heading", { name: "Upload and Download", level: 1 });

    this.uploadInput = page.locator("#uploadFile");
    this.uploadedPath = page.locator("#uploadedFilePath");
  }

  async openFromElementsPage() {
    await this.menu.scrollIntoViewIfNeeded();
    await this.menu.click();
    await expect(this.heading).toBeVisible();
  }

  async uploadFile(relativeFilePath) {
    // Convert relative path -> absolute path (works on Windows/Mac/Linux)
    const absolutePath = path.resolve(process.cwd(), relativeFilePath);

    await this.uploadInput.setInputFiles(absolutePath);

    // Verify success text appears and contains the filename
    const fileName = path.basename(relativeFilePath);
    await expect(this.uploadedPath).toBeVisible();
    await expect(this.uploadedPath).toContainText(fileName);
  }
}