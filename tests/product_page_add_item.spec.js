import { test, expect } from "@playwright/test"

test.skip("Product Page Add To Basket",async ({page}) => {
   await page.goto("localhost:2221")
  // await page.pause()

   const addToBsketButton = page.locator('[data-qa="product-button"]').first()
   await addToBsketButton.waitFor()
   await expect(addToBsketButton).toHaveText("Add to Basket")
   await addToBsketButton.click()


   await expect(addToBsketButton).toHaveText("Remove from Basket")

})

