import mongoose from "mongoose";

const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo bd connected successfully");
  } catch (error) {
    console.log(`Mongodb connection failed ${error.message}`);
    process.exit(1);
  }
};

export default connectToDataBase;
