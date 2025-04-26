import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
