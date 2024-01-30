import mongoose from "mongoose"

interface UserSchemaInterface {
  id: String;
  username: String;
  name: String;
  image?: String,
  bio?: String;
  threads?: {
    type: typeof mongoose.Schema.Types.ObjectId;
    ref: string;
  }[];
  onboarded?: {
    type: BooleanConstructor;
    default: boolean;
  };
  communities?: {
    type: typeof mongoose.Schema.Types.ObjectId;
    ref: string;
  }[]
}

const userSchema = new mongoose.Schema<UserSchemaInterface>({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread'
    }
  ],
  onboarded: {
    type: Boolean,
    default: false,

  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community'
    }
  ]
})

const User = mongoose.models?.User || mongoose.model<UserSchemaInterface>('User', userSchema)

export default User