/*
*
* @file        mStats.ts
* @author      David (@dvhsh)
* @description Stats model
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { Schema, model, Model }   from 'mongoose';

/*
*  @interface IStats
*  @description Represents latest bot stats
*/
export interface IStats {
    guilds        : number;
    users         : number;
    commands      : number;
}

type StatsModelType = Model<IStats>

const StatsSchema = new Schema<IStats, StatsModelType>({
    guilds        : { type: Number, required: true },
    users         : { type: Number, required: true },
    commands      : { type: Number, required: true },
});

export const Stats = model<IStats>('Stats', StatsSchema);

export default Stats;

// path: src/model/mStats.ts
