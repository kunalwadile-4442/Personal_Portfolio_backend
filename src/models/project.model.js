import mongoose,{Schema, model} from "mongoose";

const projectCardSchema = new Schema({
    projectImg:{
        type: String,
        required: true,
        trim: true,
    },
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    projectLink:{
        type: String,
        required: true,
        trim: true,
    },
})


const projectSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subtitle: {
        type: String,
        required: true,
        trim: true,
    },
    projectCard:[projectCardSchema]

},{ timestamps: true });

export const Project = model("Project", projectSchema);