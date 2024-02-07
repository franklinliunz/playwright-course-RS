import * as dotenv from "dotenv"

dotenv.config({
    path:'./.env',
    override: true
}); 

export const adminDetails ={
    username : "admin",
    password : process.env.ADMIN_PASSWORD,
}
