import { createRequire } from "module";
const require = createRequire(import.meta.url);

const TelegramBot = require("node-telegram-bot-api");

export default async function (request, response) {
    try {
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
        // const chat_id = 0;
        // const text = "";
        // bot.on("message", (msg) => {
        //     const chat_id = msg.chat.id;
        //     const text = msg.text.toString();
        //     if (text) {
        //         bot.sendMessage(msg.chat.id, "hello");
        //     }
        // });

        const { body } = request;

        if (body.message) {
            const {
                chat: { id, type },
                text,
                date,
                entities,
            } = body.message;

            const past = await fetch(
                `https://telebot-delta.vercel.app/api/replyapi`,

                { headers: { Accept: "*/*" }, method: "GET" }
            );

            const past_data = await past.json();
            const past_output = JSON.stringify(past_data);

            await bot.sendMessage(id, text);

            if (Array.isArray(entities)) {
                const types = entities.map(function (entity) {
                    return entity.type;
                });
                const types_output = types.toString();
                await bot.sendMessage(id, types_output);
            } else {
                await bot.sendMessage(id, "not a command");
            }
        }

        // ik theres a better way to do this but idk how
        // const result = await fetch(
        //     `https://telebot-delta.vercel.app/api/update_user_profile?msg=${text}`,
        //     {
        //         method: "POST",
        //     }
        // );

        // await bot.sendMessage(id, output);
        return response.status(200).json({ message: "ok" });
    } catch (error) {
        return response.status(500).json({ message: "fail" });
    }
}
