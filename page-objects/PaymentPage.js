import { expect } from "@playwright/test"
import { paymentDetails as CCDetails} from "../data/paymentDetails"

export class PaymentPage{
    constructor(page){
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]'  )  
        this.discountInput = page.locator('[data-qa="discount-code-input"]' )
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]' )
        this.totalValue = page.locator('[data-qa="total-value"]' )
        this.discountTotal = page.locator('[data-qa="total-with-discount-value"]' )
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]' )
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]' )
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]' )
        this.creditCardValidUntilInput = page.locator('[data-qa="valid-until"]' )
        this.creditCardCVCInput = page.locator('[data-qa="credit-card-cvc"]' )
        this.payButton = page.locator('[data-qa="pay-button"]')    
    
    }

    activateDiscount = async() => {
        await this.discountCode.waitFor()
        const discount = await this.discountCode.innerText()

        /*
        await this.discountInput.waitFor()
        await this.discountInput.fill(discount)
        expect(await this.discountInput).toHaveValue(discount) 
        */

        //Option: Slow typing
        await this.discountInput.focus()
        await this.page.keyboard.type(discount,{delay: 1000})
        expect(await this.discountInput.inputValue()).toBe(discount) 
        
        //check the discount activated message doesn't exist
        expect(this.discountActiveMessage).not.toBeAttached()
        expect(this.discountTotal).not.toBeAttached()

        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()

        const totalIncludingDiscount = await this.discountTotal.innerText()
        const totalWithDiscountNumberOnly = parseInt(totalIncludingDiscount.replace("$",""),10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalWithValueNumberOnly = parseInt(totalValueText.replace("$",""),10)

    }

    fillCreditCardDetails = async(CCDetails) => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(CCDetails.creditCardOwner)
        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(CCDetails.creditCardNumber)
        await this.creditCardValidUntilInput.waitFor()
        await this.creditCardValidUntilInput.pressSequentially(CCDetails.creditCardMonthYear)
        await this.creditCardCVCInput.waitFor()
        await this.creditCardCVCInput.fill(CCDetails.CVC)  

    }

    completePayment = async() => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
    }



}