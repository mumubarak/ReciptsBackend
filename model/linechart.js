const mongoose = require(`mongoose`);

const linechartSchema = mongoose.Schema(
  {
    creationAt: { type: Date ,default:Date.now()},
    status: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    
    lineChart: [
      {
        x: { type: Number },
        y: { type: Number },
        color: { type: String },
      },
    ]
  },
  {
    timeStamps: true,
  }
);

const linechartModel = mongoose.model("linechart", linechartSchema);

module.exports = linechartModel;
