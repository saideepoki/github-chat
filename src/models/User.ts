import mongoose, {Schema, Document} from "mongoose";

export interface UserDocument extends Document {
    providerId: string,
    username: string,
    email: string,
    avatarUrl: string,
}

const UserSchema: Schema<UserDocument> = new Schema({
    providerId: {
        type: String,
        unique: true,
        sparse: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
})

const User = (mongoose.models.User) || (mongoose.model<UserDocument>("User", UserSchema));
export default User;