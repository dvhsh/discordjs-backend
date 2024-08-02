/*
*
* @file        mUser.ts
* @author      David (@dvhsh)
* @description User model
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { Schema, model, Model }   from 'mongoose';


/*
*  @interface IUser
*  @description Represents a User
*/
export interface IUser {
    id            : string;

    blacklisted   : boolean;
    developer     : boolean;

    createdAt     : Date;
    updatedAt     : Date;
}

type UserModelType = Model<IUser>

const UserSchema = new Schema<IUser, UserModelType>({
    id           : { type: String, required: true },

    blacklisted  : { type: Boolean, default: false },
    developer    : { type: Boolean, default: false },

    createdAt    : { type: Date, default: Date.now() },
    updatedAt    : { type: Date, default: Date.now() },
});

export const UserModel = model<IUser>('User', UserSchema);

// Path: src/model/mUser.ts
