import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
  firstName: { type: Schema.Types.String },
  lastName: { type: Schema.Types.String },
  email: { type: Schema.Types.String },
  password: { type: Schema.Types.String },
  imageUrl: {type: Schema.Types.String}
});

UserSchema.index({ email: 1 });
UserSchema.pre("save", async function pre(next) {
  if (this.password && this.isNew) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});
export default model("User", UserSchema);
