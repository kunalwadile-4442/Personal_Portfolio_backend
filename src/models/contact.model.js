import mongoose,{Schema, model} from "mongoose";


const contactSchema = new Schema({


    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name:{
        type: String,
        required: true, 
    },
    email:{
        type: String,
        required: true,
    },
    subject:{
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        required: true, 
    },
    message:{
        type: String,
        required: true,
        trim: true,
    },  
},{ timestamps: true });

export const Contact = model("Contact", contactSchema);