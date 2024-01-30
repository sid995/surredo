import mongoose from "mongoose"

interface ThreadSchemaInterface {
  text: String,
  author: {
    type: typeof mongoose.Schema.Types.ObjectId;
    ref: string;
  },
  community?: {
    type: typeof mongoose.Schema.Types.ObjectId;
    ref: string;
  },
  createdAt: {
    type: DateConstructor;
    default: () => number;
  },
  parentId?: String,
  children?: {
    type: typeof mongoose.Schema.Types.ObjectId;
    ref: string;
  }[]
}

const threadSchema = new mongoose.Schema<ThreadSchemaInterface>({
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  parentId: {
    type: String
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread'
    }
  ]
})

const Thread = mongoose.models.Thread || mongoose.model<ThreadSchemaInterface>('Thread', threadSchema)

export default Thread