import { createRequire } from "module";
const require = createRequire(import.meta.url);

var url = require("url");
import { sql } from "@vercel/postgres";

export default async function function1(request, response) {
    try {
        const currentTime = Date.now();

        const base_url = process.env.BASE_URL;
        const address = new URL(base_url + request.url);
        // const db_entry = {
        //     time: currentTime,
        //     msg: address.searchParams.get("msg"),
        // };
        const result =
            await sql`INSERT INTO anon VALUES (${currentTime}, ${address.searchParams.get(
                "msg"
            )})`;

        return response.status(200).json({ time: currentTime });
    } catch (error) {
        return response.status(500).json({ msg: "bad" });
    }
}
