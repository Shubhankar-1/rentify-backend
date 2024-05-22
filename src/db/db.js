import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionData = await mongoose.connect(
            `${process.env.MONGO}/${process.env.DB_NAME}`
        );
        
        return connectionData.connection.host;
    } catch (error) {
        throw error;
        process.exit(1);
    }
};
export default connectDB;
