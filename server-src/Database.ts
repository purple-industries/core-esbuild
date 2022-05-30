import "reflect-metadata";
import {DataSource} from "typeorm";
import {User} from "./User";
export const Database = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        User
    ],
    synchronize: true,
    logging: true
}).initialize().then(r => {
    console.log("DB connection established")
})

