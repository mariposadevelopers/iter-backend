import mongoose, { mongo } from "mongoose"

const researchSchema = new mongoose.Schema({
    title: {type: String, required: true},
    url: {type: String, required: true},
}, {timestamps: true}); 

const Research = mongoose.model("Research", researchSchema);

export default Research;

