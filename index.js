const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const shortid = require("shortid");
const URL = require("./models/url");
require("./db");
require("dotenv").config();
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "hi") {
    message.reply(
      "👋 Hi, I am **SK Bot**\n" +
        "🤖 I am a Discord bot\n" +
        "🔗 I can create short URLs\n" +
        "🛠 Built using Node.js\n" +
        "💡 Type `create <url>` to shorten a ID"
    );
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1]?.trim();
    if (!url) {
      return message.reply("❌ Please provide a URL");
    }
    const shortId = shortid.generate();
    await URL.create({
      shortId: shortId,
      redirectUrl: url,
    });
    return message.reply(`✅ Short ID created:${shortId}`);
  }
});
client.on("interactionCreate", (interaction) => {
  interaction.reply("Pong!!");
});

client.login(process.env.DISCORD_TOKEN);
