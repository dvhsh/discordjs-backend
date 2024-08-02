/*
*
* @file        cBotStatsController.ts
* @author      David (@dvhsh)
* @description Stats Controller
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { Stats } from "@model/mStats";

/*
* @function indexLatestStats
* @description indexLatestStats indexes the latest stats
*
* @returns { Promise<IStats> }
*/
export const indexLatestStats = async () => {
    const stats = await Stats.findOne();

    if (!stats) {
        const s = await Stats.create({ guilds: 0, users: 0, commands: 0 });
        await s.save(); return s;
    }

    return stats;
}

/*
* @function updateStats
* @description updateStats updates the stats
*
* @param { number } guilds
* @param { number } users
* @param { number } commands
*
* @returns { Promise<IStats> }
*/
export const updateStats = async (guilds: number, users: number, commands: number) => {
    const stats = await Stats.findOne();

    if (!stats) {
        const s = await Stats.create({ guilds, users, commands });
        await s.save(); return s;
    }

    stats.guilds = guilds;
    stats.users = users;
    stats.commands = commands;

    await stats.save(); return stats;
}

// path: src/controller/cBotStatsController.ts
