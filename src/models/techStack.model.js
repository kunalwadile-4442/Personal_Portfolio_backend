import mongoose, { Schema, model } from "mongoose";


const techStackSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title:{
        type: String,
        required: true,
        trim: true,
    },subtitle:{
        type: String,
        required: true,
        trim: true,
    },
    stack:[
        {
            name:{
                type: String,
                required: true,
                trim: true,
            }, 
            iconUrl:{
                type: String,
                required: true,
                trim: true,
            }
        }
    ]

},
{ timestamps: true }
);

export const TechStack = model("TechStack", techStackSchema);