const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  business_name:{
    type:String,
  },
  owner_name:{
    type:String,
  },
  address_1:{
    type:String,
  },
  address_2:{
    type:String,
  },
  pincode:{
    type:Number,
  },
  phone_no:{
    type:Number,
  },
  gstin:{
    type:String,
  },
  pan:{
    type:String,
  },
  password: {
    type: String,
    required: true,
  },
  type:{
    type:String,
    default:"User",
  }
});

module.exports = mongoose.model("User", userSchema);