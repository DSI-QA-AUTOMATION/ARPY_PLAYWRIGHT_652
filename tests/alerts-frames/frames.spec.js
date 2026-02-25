import { test } from "@playwright/test";
import { FramesPage } from "../../pages/FramesPage";

test.describe("Frames",()=>{

 test("TC-11: Switch to iframe", async({page})=>{

  const framesPage =
   new FramesPage(page);

  await page.goto("https://demoqa.com/");

  await framesPage.openFramesPage();

  await framesPage.verifyFrameContent();

 });

});