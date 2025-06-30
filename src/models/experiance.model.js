import mongoose,{Schema, model} from "mongoose";

const experianceCardSchema = new Schema({
    
     position:{
        type: String,
        required: true,
        trim: true,
    },
    companyName:{
        type: String,
        required: true,
        trim: true,
    },
    duration:{
        type: String,
        required: true,
    },
    description:{
       type: [String],
        required: true,
    },
});

const experianceSchema = new Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title:{
        type: String,
        required: true,
        trim: true,
    },
    experianceCard:[experianceCardSchema]

}, { timestamps: true });

export const Experiance = model("Experiance", experianceSchema);