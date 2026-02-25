/**
 * Helpers that wait on meaningful browser signals (no hard-coded timeouts).
 */

async function waitForNewPage(context, action) {
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    action(),
  ]);
  await newPage.waitForLoadState("domcontentloaded");
  return newPage;
}

async function waitForToastLikeMessage(page, locator) {
  // Generic helper: wait until a locator becomes visible and stable.
  await locator.waitFor({ state: "visible" });
  await page.waitForLoadState("networkidle").catch(() => {});
}

module.exports = {
  waitForNewPage,
  waitForToastLikeMessage,
};
