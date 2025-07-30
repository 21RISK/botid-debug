import { checkBotId } from "botid/server";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  try {
    const { name } = await request.json();
    console.log("POST request received, name:", name);
    const verification = await checkBotId();
    console.log("BotID verification:", verification);

    if (verification.isBot) {
      return json({ error: "Access denied - Bot detected" }, { status: 403 });
    }

    return json({ success: true, message: `Hello, ${name}!` });
  } catch (error) {
    console.error("Error processing POST:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}
