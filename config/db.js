import mongoose, { mongo } from "mongoose";

const connnectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {});
    console.log(
      ` database connected to ${mongoose.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(error);
  }
};

export default connnectDb;
