import * as dotenv from "dotenv"

const globalSetup = async () => {
    dotenv.config({
        path:'./.env',
    }); 
}

export default globalSetup