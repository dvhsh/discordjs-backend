/*
*
* @file        cIndexing.ts
* @author      David (@dvhsh)
* @description Indexing related controller functions
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { GuildModel        } from "@model/mGuild";
import { UserModel         } from "@model/mUser";

/*
* @function indexGuild
* @description indexGuild indexes a YoshiGuildModel by id
*
* @param { string } guildId
*
* @returns { Promise<GuildModel> }
*/
export const indexGuild = async (guildId: string) => {
    const guild = await GuildModel.findOne({ id: guildId });

    if (!guild) {
        const g = await GuildModel.create({ id: guildId });
        await g.save(); return g;
    }

    guild.updatedAt = new Date();

    await guild.save(); return guild;
}

/*
* @function indexUser
* @description indexUser indexes a UserModel by id
*
* @param { string } userId
*
* @returns { Promise<UserModel> }
*/
export const indexUser = async (userId: string) => {
    const user = await UserModel.findOne({ id: userId });

    if (!user) {
        const u = await UserModel.create({ id: userId });
        await u.save(); return u;
    }

    user.updatedAt = new Date();

    await user.save(); return user;
}


/*
* @function setGuildPrefix
* @description setGuildPrefix sets the prefix of a guild
*
* @param { string } guildId
* @param { string } prefix
*
* @returns { Promise<void> }
*/
export const setGuildPrefix = async (guildId: string, prefix: string) => {
        const guild = await GuildModel.findOne({ id: guildId });

        if (!guild) { return; }

        guild.prefix = prefix;

        await guild.save();
}

// path: src/controller/cIndexing.ts