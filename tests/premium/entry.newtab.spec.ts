import { test, expect } from "@playwright/test";
import { STORAGE_STATE_FREE } from "../../playwright.config";

test.use({
  storageState: STORAGE_STATE_FREE,
});

test.beforeEach(async ({ page }) => {
  await page.goto("/embed/user/mine");
});

test("open vip page by badge button of mine's page and show QR code and price of every premium version successfully", async ({
  page,
}) => {
  const p = page.waitForEvent("popup");

  await page
    .locator(".vip-trigger")
    .filter({ hasText: "获取高级版" })
    .first()
    .click();

  const pageVip = await p;
  await expect(
    pageVip.locator(".privilege-hd").filter({ hasText: "当前" }).first()
  ).toContainText("免费版");
  await pageVip.locator(".vip-trigger button").first().click();
  const pageVipExpect = async () => {
    await expect(
      pageVip.locator("div.vip-trigger-code canvas").first()
    ).toBeVisible();
    await expect(
      pageVip
        .locator("div.vip-trigger-right p")
        .filter({
          hasText: /¥/,
        })
        .first()
        .locator("span")
        .first()
    ).toHaveText(/^¥[\d.]+$/);
  };
  await pageVip
    .locator(".privilege-hd")
    .filter({ hasText: "标准版" })
    .locator(".vip-trigger")
    .first()
    .click({
      // 不要执行action check否则会因为按钮被遮挡后抛出timeout错误
      force: true,
    });
  await pageVipExpect();
  await pageVip.getByRole("tab").filter({ hasText: "专业版" }).first().click();
  await pageVipExpect();
});
