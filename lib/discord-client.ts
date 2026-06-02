import { REST } from "@discordjs/rest";
import {
  RESTPostAPIChannelMessageResult,
  RESTPostAPICurrentUserCreateDMChannelResult,
  Routes,
  APIEmbed,
} from "discord-api-types/v10";

export class DiscordClient {
  private rest: REST;
  private isDummy: boolean;

  constructor(token: string | undefined) {
    this.isDummy = !token || token === "dummy-token";
    if (this.isDummy) {
      console.warn("DISCORD_BOT_TOKEN is not set. Discord integration will be disabled.");
    } 
    this.rest = new REST({ version: "10" }).setToken(
      token ?? "dummy-token"
    );
  }

  async createDM(userId: string) {
    if (this.isDummy) {
      return null;
    }
    const response = (await this.rest.post(Routes.userChannels(), {
      body: { recipient_id: userId },
    })) as RESTPostAPICurrentUserCreateDMChannelResult;

    return response.id;
  }

  async sendEmbed(channelId: string, embed: APIEmbed) {
    if (this.isDummy) {
      return null;
    }
    const response = (await this.rest.post(Routes.channelMessages(channelId), {
      body: { embeds: [embed] },
    })) as RESTPostAPIChannelMessageResult;

    return response;
  }
}

export const discord = new DiscordClient(process.env.DISCORD_BOT_TOKEN);
