import {model, Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    });

export const Product = model('Product', ProductSchema);
