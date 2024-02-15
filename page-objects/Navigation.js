import { isDesktopViewport as isDesktop } from "../utils/isDesktopViewport"

export class Navigation{
    constructor(page){
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkOutLink = page.getByRole('link', {name:'Checkout'})
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }
    


    getBasketCount = async() => {
        await this.basketCounter.waitFor()
        const basketText = await this.basketCounter.innerText()
        return parseInt(basketText,10)
    }

    goToCheckOut = async() => {
        const isDesktopViewport = new isDesktop(this.page)
        if (!isDesktopViewport.isDesktop()) {
            await this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()
        }

        await this.checkOutLink.waitFor()
        await this.checkOutLink.click()
        await this.page.waitForURL(/\/basket/)
    }



}