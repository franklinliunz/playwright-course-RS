import { test } from "@playwright/test"
import {v4 as uuidv4} from "uuid"
import {ProductPage } from "../page-objects/ProductPage"
import { Navigation } from "../page-objects/Navigation"
import { CheckOut } from "../page-objects/CheckOut"
import { Login } from "../page-objects/Login"
import { RegisterPage } from "../page-objects/RegisterPage"
import { DeliveryDetails } from "../page-objects/DeliveryDetails"
import { deliveryDetails as userAddress} from "../data/deliveryDetails"
import { PaymentPage } from "../page-objects/PaymentPage"
import { paymentDetails as CCDetails } from "../data/paymentDetails"

test("New User Journey", async ({ page}) => {
    const productPage = new ProductPage(page)
    await productPage.visit()
    await productPage.sortByCheapest()
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    //await page.pause()
    const navigation = new Navigation(page)
    await navigation.goToCheckOut()

    const checkOut = new CheckOut(page)
    await checkOut.removeCheapestProduct()
    await checkOut.continueToCheckout()

    const login = new Login(page)
    await login.moveToSignup()

    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email,password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillCreditCardDetails(CCDetails)
    await paymentPage.completePayment()
})