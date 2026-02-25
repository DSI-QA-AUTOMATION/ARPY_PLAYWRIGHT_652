import { expect } from "@playwright/test";

export class FramesPage {

 constructor(page){

  this.page = page;

  // Homepage card
  this.alertFrameCard =
   page.getByRole("heading",
     { name:"Alerts, Frame & Windows" });

  // Sidebar
  this.framesMenu =
   page.getByRole("link",
     { name:"Frames", exact:true });

  // Page title
  this.heading =
   page.getByRole("heading",
     { name:"Frames", level:1 });

 }

 async openFramesPage(){

  await this.alertFrameCard
   .scrollIntoViewIfNeeded();

  await this.alertFrameCard.click();

  await this.framesMenu
   .scrollIntoViewIfNeeded();

  await this.framesMenu.click();

  await expect(this.heading)
   .toBeVisible();

 }

 async verifyFrameContent(){

  // Switch using frameLocator (best practice)
  const frame =
   this.page.frameLocator("#frame1");

  const frameHeading =
   frame.locator("#sampleHeading");

  await expect(frameHeading)
   .toBeVisible();

  await expect(frameHeading)
   .toHaveText("This is a sample page");

 }

}