import mongoose from "mongoose";

enum TodoStatus {
  COMPLETE = "compelete",
  INCOMLETE = "incomplete",
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  todos: [
    {
      title: { type: String, required: true },
      status: { type: String, default: TodoStatus.INCOMLETE },
    },
  ],
});

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;
