import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE_FREE } from "../../playwright.config";

setup("login free version account", async ({ page }) => {
  await page.goto("/embed/user/mine");
  // await page.getByRole("navigation").getByText("登录/注册").click();
  await page
    .frameLocator("iframe")
    .locator("div")
    .filter({ hasText: /^账号登录$/ })
    .nth(1)
    .click();
  await page.frameLocator("iframe").getByPlaceholder("请输入账号名").click();
  await page
    .frameLocator("iframe")
    .getByPlaceholder("请输入账号名")
    .fill("autotest_vip_01");
  await page.frameLocator("iframe").getByPlaceholder("请输入密码").click();
  await page
    .frameLocator("iframe")
    .getByPlaceholder("请输入密码")
    .fill("idea123456");
  await page
    .frameLocator("iframe")
    .getByRole("button", { name: "登 录" })
    .click();

  await expect(page.locator("body")).toContainText("免费版不升级");

  await page.context().storageState({ path: STORAGE_STATE_FREE });
});
