import { test, expect } from "@playwright/test";
import { STORAGE_STATE_FREE } from "../../playwright.config";

test.use({
  storageState: STORAGE_STATE_FREE,
});

test.beforeEach(async ({ page }) => {
  await page.goto("/vip/vvv1688");
  await page.evaluate('window.localStorage.setItem("VIP", "1")');
});

test("show pay dialog and QR code of every premium version successfully", async ({
  page,
}) => {
  await page.goto("/vip/vvv1688");
  await page.getByRole("button", { name: "开 通" }).first().click();

  await expect(
    page.locator("div.vip-trigger-code canvas").first()
  ).toBeVisible();
  await expect(
    page
      .locator("div.vip-trigger-right p")
      .filter({
        hasText: /¥/,
      })
      .first()
      .locator("span")
      .first()
  ).toHaveText(/^¥[\d.]+$/);
});
