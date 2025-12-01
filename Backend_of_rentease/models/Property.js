import mongoose  from "mongoose";

const propertySchema = new mongoose.Schema ({
    title : {type: String, required: true},
    location : {type : String, required: true},
    price : {type : Number, required: true},
    description : {type : String },
    contact : {type : String, required: true},
    isRented : {type: Boolean, default: false}
}, {timestamps: true});

export default mongoose.model("Property", propertySchema);