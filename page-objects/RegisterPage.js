export class RegisterPage{
    constructor(page){
        this.page = page
        this.emailInput = page.getByPlaceholder('E-mail')
        this.passwordInput = this.page.getByPlaceholder('password')
        this.RegisterButton = this.page.getByRole('button',{name: 'Register'})
        }

        signUpAsNewUser = async (email, password) => {
            await this.emailInput.waitFor()
            await this.passwordInput.waitFor()

            await this.emailInput.fill(email)


            await this.passwordInput.fill(password)

            await this.RegisterButton.waitFor()
            await this.RegisterButton.click()
            
        }

}