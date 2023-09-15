import { or } from "drizzle-orm";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const TelegramBot = require("node-telegram-bot-api");

export default async function (request, response) {
    try {
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

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

            if (type == "supergroup" || type == "group") {
                await bot.sendMessage(id, "@ntuhelperbot");
            } else {
                await bot.sendMessage(id, text, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "Open web app",
                                    web_app: {
                                        url: "https://telebot-delta.vercel.app/",
                                    },
                                },
                            ],
                        ],
                    },
                });
            }

            //     if (Array.isArray(entities)) {
            //         const types = entities.map(function (entity) {
            //             return entity.type;
            //         });
            //         const types_output = types.toString();
            //         await bot.sendMessage(id, types_output);
            //     } else {
            //         await bot.sendMessage(id, "not a command");
            //     }
        }

        // ik theres a better way to do this but idk how
        // const result = await fetch(
        //     `https://telebot-delta.vercel.app/api/update_user_profile?msg=${text}`,
        //     {
        //         method: "POST",
        //     }
        // );
        return response.status(200).json({ message: "ok" });
    } catch (error) {
        return response.status(500).json({ message: "fail" });
    }
}
