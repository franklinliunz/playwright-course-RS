import {expect} from "@playwright/test"

export class Login{
    constructor(page){
        this.page = page
        this.goToSignupButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    moveToSignup = async() => {
        await this.goToSignupButton.waitFor()
        await this.goToSignupButton.click()
        await this.page.waitForURL(/\/signup/,{timeout: 3000})
    }

}