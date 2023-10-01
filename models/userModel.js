import mongoose from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: ["true", "Name is required"],
  },
  email: {
    type: String,
    required: ["true", "Email is required"],
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
