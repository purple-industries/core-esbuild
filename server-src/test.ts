import { log } from "alt-server";

export function Test(){
    log("test: " + process.env.DB_TEST)
}
