import mongoose, { mongo } from "mongoose";

const apiSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    last:{
        type: Number,
        required: true
    },
    buy:{
        type: Number,
        required: true
    },
    sell:{
        type: Number,
        required: true
    },
    volume:{
        type: Number,
        required: true
    },
    base_unit:{
        type: String,
        required: true
    },
})

export const apiData = mongoose.model('apiData', apiSchema)