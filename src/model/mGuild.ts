/*
*
* @file        mGuild.ts
* @author      David (@dvhsh)
* @description Guild model
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { Schema, model } from "mongoose";

/*
*  @interface IGuild
*  @description Represents a Guild
*/
export interface IGuild {
    id             : string;

    prefix         : string;
    language       : string;

    createdAt      : Date;
    updatedAt      : Date;
}

const GuildSchema = new Schema<IGuild>({
    id           : { type: String, required: true },

    prefix       : { type: String, default: ';;' },
    language     : { type: String, default: 'en' },

    createdAt    : { type: Date, default: Date.now() },
    updatedAt    : { type: Date, default: Date.now() },
});

export const GuildModel = model<IGuild>('Guild', GuildSchema);

// Path: src/model/mGuild.ts
