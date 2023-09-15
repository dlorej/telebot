import { createRequire } from "module";
const require = createRequire(import.meta.url);

var url = require("url");
import { sql } from "@vercel/postgres";

//inputs = user_id, mod_code, timeslots, duration
export default async function function1(request, response) {
    try {
        const base_url = process.env.BASE_URL;
        const address = new URL(base_url + request.url);

        const user_id = address.searchParams.get("user_id");
        const name = address.searchParams.get("name");
        const mod_code = address.searchParams.get("mod_code");
        const timeslots = address.searchParams.get("timeslots");
        const duration = address.searchParams.get("duration");
        const bounty = address.searchParams.get("bounty");
        const time_created = address.searchParams.get("time_created");

        const result =
            await sql`SELECT * FROM user_profiles WHERE name = ${name}`;

        if (result["rows"].length == 0) {
            await sql`INSERT INTO user_profiles (id, name) values (${user_id}, ${name})`;
        }
        await sql`INSERT INTO open_requests (mod_code, created_by, time_slot, duration, bounty, time_created) values 
        (${mod_code},${user_id},${timeslots},${duration},${bounty},${time_created})`;

        return response.status(200).json({ message: result["rows"] });
    } catch (error) {
        return response.status(500).json({ message: "fail" });
    }
}
