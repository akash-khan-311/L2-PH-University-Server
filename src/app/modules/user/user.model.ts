import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password Is Required"],
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Save password before hashed the password

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(10));

  next();
});

// After save password remove the password

userSchema.post("save", async function (doc: TUser, next) {
  (doc.password = ""), next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

const User = model<TUser, UserModel>("User", userSchema);

export default User;
