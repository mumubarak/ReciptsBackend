const mongoose = require(`mongoose`);
const vendor = require(`../model/vendor`);
var Schema = mongoose.Schema;

const reciptSchema = mongoose.Schema(
  {
    creationAt: { type: Date ,default:Date.now(),require:true},
    dateTime: { type: Date ,default:Date.now(),require:true},
    //serialNumber:{ type: "String" ,default:,require:true },

    amount: { type: Number ,require:true},
    totalAmount: { type: Number ,require:true},
    status: { type: "String",require:true },
    tax:{ type: Number ,require:true},
    service:{ type: Number ,require:true},
    vendor:
      {type: Schema.Types.ObjectId, ref: 'vendor'},
    
    items: [
      {
        item: { type: String ,require:true},
        quantity: { type: Number ,require:true},
        price: { type: Number ,require:true},
        finalPrice: { type: Number,require:true}
      },
    ],
    userId: { type: String ,require:true},
    //vendor:{type: mongoose.Schema.Types.ObjectId,ref: 'vendor',require:true},
   
    //category: { name: "String",image:"string" },
    category: {type: Schema.Types.ObjectId, ref: 'category'},

  },
  {
    timeStamps: true,
  }
);

const reciptModel = mongoose.model("recipt", reciptSchema);

module.exports = reciptModel;
