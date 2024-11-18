import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        console.log((`${process.env.DB_URI}/contactus`));
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/contactus`)
    } catch (error) {
        console.log("", error);
        process.exit(1)
    }
}

export {connectDB}