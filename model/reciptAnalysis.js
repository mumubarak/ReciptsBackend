const mongoose = require(`mongoose`);

const resetSchema = mongoose.Schema(
  {
    creationAt: { type: Date ,default:Date.now()},
    amount: { type: Number },
    status: { type: Boolean },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    resetDetails: [
      {
        item: { type: String },
        count: { type: Number },
        price: { type: Number },
      },
    ],
  },
  {
    timeStamps: true,
  }
);

const resetModel = mongoose.model("reset", resetSchema);

module.exports = resetModel;
