import { Schema, model } from "mongoose";

interface IUser {
    username: {
        type: string;
        required: boolean;
    };
    email: {
        type: string;
        required: boolean;
    };
    authentication: {
        password: {
            type: string;
            required: boolean;
            select: boolean;
        };
        salt: {
            type: string;
            select: boolean;
        },
        sessionToken: {
            type: string;
            select: boolean;
        }
    }
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false,
        },
        salt: {
            type: String,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        }
    },
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
