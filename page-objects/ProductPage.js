import {expect} from "@playwright/test"
import { Navigation } from "./Navigation"
import { isDesktopViewport as isDesktop} from "../utils/isDesktopViewport"



export class ProductPage{
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
        //this.checkOutButton = page.locator('[data-qa="product-title"]')
    }
    
    

    visit = async () => { 
        await this.page.goto("localhost:2221")
    }

    sortByCheapest = async() => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()

        const productTitleBeforeSort = this.productTitle.allInnerTexts()

        await this.sortDropdown.selectOption("price-asc")
       
        const productTitleAfterSort = this.productTitle.allInnerTexts()
      //  expect(productTitleAfterSort).not.toEqual(productTitleBeforeSort)
        
    }

    addProductToBasket = async(index) => {
        const specificButton = this.addButtons.nth(index)
        await specificButton.waitFor()
        await expect(specificButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        
        let basketCountBeforeAdding
        const isDesktopViewport = new isDesktop(this.page)
        if (isDesktopViewport.isDesktop()){
            basketCountBeforeAdding = await navigation.getBasketCount()
        }


        
        await specificButton.click()
        await expect(specificButton).toHaveText("Remove from Basket")
        
        if (isDesktopViewport.isDesktop()){
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)

        }
        
        
    }
}