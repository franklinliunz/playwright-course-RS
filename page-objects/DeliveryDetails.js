import { expect } from "@playwright/test"
import { deliveryDetails as userAddress } from "../data/deliveryDetails"

export class DeliveryDetails{
    constructor(page){
        this.page = page
        this.firstName = this.page.getByPlaceholder('First name')
        this.lastName = page.locator('[data-qa="delivery-last-name"]')
        this.street = this.page.getByPlaceholder('Street')
        this.postCode = this.page.getByPlaceholder('Post code')
        this.city = this.page.getByPlaceholder('City')
        this.country = this.page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = this.page.locator('[data-qa="save-address-button"]')  
        this.savedAddresses = this.page.locator('[data-qa="saved-address-container"]') 
           
    
        this.savedAddressFirstName = this.page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = this.page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = this.page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = this.page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = this.page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = this.page.locator('[data-qa="saved-address-country"]')
    
        this.continueToPaymentButton = this.page.locator('[data-qa="continue-to-payment-button"]')
    
    }

    fillDetails = async(userAddress) => {
        await this.firstName.waitFor()
        await this.firstName.fill(userAddress.firstName)
        await this.lastName.waitFor()
        await this.lastName.fill(userAddress.lastName)
        await this.street.waitFor()
        await this.street.fill(userAddress.street)
        await this.postCode.waitFor()
        await this.postCode.fill(userAddress.postCode)
        await this.city.waitFor()
        await this.city.fill(userAddress.city)
        await this.country.waitFor()
        await this.country.selectOption(userAddress.country)
    }

    saveDetails = async() => {
        const addressCountBeforeSave = this.savedAddresses.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await this.saveAddressButton.waitFor()
        const printSavedAddresses= await this.savedAddresses.waitFor()
        //we need to instantiate this first so we can use it in assertion later
        let verifyFirstName = this.savedAddressFirstName

        expect(verifyFirstName).toHaveText(
            await this.firstName.inputValue())
            
    }

    continueToPayment = async() => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()  
        await this.page.waitForURL(/\/payment/)
           
    
    }

}