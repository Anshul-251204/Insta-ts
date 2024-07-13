import { log } from "console";
import { connect } from "mongoose";
import ENV from "../config/ENV"

const connectDB = async () => {
    
    
    const { connection } = await connect(ENV.get("MONGO_URI"));
    log(
        "\x1b[34m%s\x1b[0m",
        `\nMONGO DB CONNECTED SUCCESSFULLY ON HOST :: ${connection.host}`
    );
};

export default connectDB;
