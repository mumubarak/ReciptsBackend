const mongoose = require(`mongoose`);

const piechartSchema = mongoose.Schema(
  {
    creationAt: { type: Date ,default:Date.now()},
    status: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    pieChart: [
      {
        title: { type: String },
        value: { type: Number },
        color: { type: String },
      },
    ]
  },
  {
    timeStamps: true,
  }
);

const piechartModel = mongoose.model("piechart", piechartSchema);

module.exports = piechartModel;
