import mongoose from "mongoose";

const { Schema } = mongoose;

const apihistorySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  method: String,
  url: String,
  headers: Object,
  body: Object,
  statusCode: Number,
  response: Object,
  timeTaken: Number
}, { timestamps: true })

const history = mongoose.model("ApiHistory", apihistorySchema)

export default history