import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.beforeEach(async ({ page }) => { await page.addInitScript(() => sessionStorage.setItem("asy-opening-seen", "true")); });
test("homepage exposes key portfolio content", async ({ page }) => { await page.goto("/"); await expect(page.getByRole("heading", { name: /Aw Sheng You/i })).toBeVisible(); await expect(page.getByRole("heading", { name: "Projects with purpose." })).toBeVisible(); });
test("project case study has five required sections", async ({ page }) => { await page.goto("/projects/discord-bot"); for (const title of ["Overview", "Key Features", "My Role", "Technologies", "Outcome"]) await expect(page.getByRole("heading", { name: title })).toBeVisible(); });
test("has no serious accessibility violations", async ({ page }) => { await page.goto("/"); const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze(); expect(results.violations).toEqual([]); });
