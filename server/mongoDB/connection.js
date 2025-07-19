// import mongoose from "mongoose";
// const mongoDBConnect = () => {
//   try {
//     mongoose.connect(process.env.URL, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//     console.log("MongoDB - Connected");
//   } catch (error) {
//     console.log("Error - MongoDB Connection " + error);
//   }
// };
// export default mongoDBConnect;
import mongoose from "mongoose";

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default mongoDBConnect;

