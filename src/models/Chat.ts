import { Schema, model } from "mongoose";

interface IChat {
    username: { type: string, required: boolean };
    message: { type: string; required: boolean };
}

const chatSchema = new Schema<IChat>({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

const Chat = model<IChat>("Chat", chatSchema);

export default Chat;
