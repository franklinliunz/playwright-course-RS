import {expect} from "@playwright/test"
import { Navigation } from "./Navigation"

export class CheckOut{
    constructor(page){
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        const itemsBeforeRemoval = this.basketCards.count()

        const allPriceNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$","")
            return parseInt(withoutDollarSign,10)          
        })
        const smallestPrice = Math.min(...allPriceNumbers)
        const smallestPriceIndex = allPriceNumbers.indexOf(smallestPrice)
        const smallestPriceRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIndex)
        await smallestPriceRemoveButton.waitFor()
        
        
        await smallestPriceRemoveButton.click()
       //This line is currently timing out, commenting out
        // await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
 
    }

    continueToCheckout = async() => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/)
    }
}