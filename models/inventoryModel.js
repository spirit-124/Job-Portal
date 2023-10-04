import mongoose, { mongo } from "mongoose";

const inventorySchema = new mongoose.Schema({
  inventoryType: {
    type: String,
  },
});
