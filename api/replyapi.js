import { createRequire } from "module";
const require = createRequire(import.meta.url);

var url = require("url");
import { sql } from "@vercel/postgres";

export default async function function1(request, response) {
    try {
        const base_url = process.env.BASE_URL;
        const address = new URL(base_url + request.url);

        const user_id = address.searchParams.get("user_id");

        // if (await sql`SELECT * FROM ${user_id}`){}

        const result = await sql`SELECT * FROM user_profiles`;
        return response.status(200).json(result["rows"]);
    } catch (error) {
        return response.status(500).json({ error });
    }
}
