const mongoose = require(`mongoose`);

const userSchema = mongoose.Schema(
  {
    userName: { type: String,require:true },
    creationAt: { type: Date ,default:Date.now(),require:true},
    gender:  { type:String ,enum:['male','female','others'],require:true},
    dateOfBirth: { type: String ,require:true},
    email: { type: String ,require:true},
    status: { type:String, enum:['active','inactive','frequent'], default:'active',require:true },
    password: { type: String ,require:true},
    token:{ type:String ,require:true},
    vendor: [{vendorId:{type: mongoose.Schema.Types.ObjectId,ref: 'vendor',require:true}}],
    category: [{categoryId:{type: mongoose.Schema.Types.ObjectId,ref: 'category',require:true}}],
    resipts: [{reciptId:{type: mongoose.Schema.Types.ObjectId,ref: 'recipt',require:true}}],


    
  },
);


const user = mongoose.model("user", userSchema);

module.exports = user;
