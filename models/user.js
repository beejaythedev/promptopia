import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should only contain 8-20 alphanumeric letters and be unique!"],
        unique: [true, "Username already exists"],
    },
    image: {
        type: String,
    },
})

// checks if the model already exists in the models object, if not, it creates a new model with the name 'User' and the schema defined above.
// This is important to avoid the "OverwriteModelError" that occurs when you try to create a model with the same name multiple times. 
const User = models.User || model('User', UserSchema);

export default User;