import app from "./app";
import connectDB from "./database/connect-database";
import ENV from "./config/ENV";
import { normalizePort } from "./helpers/helpers";

const port = normalizePort(ENV.get("PORT"));

connectDB()
    .then(() => {
        app.listen(port, () =>
            console.log(
                "\x1b[34m%s\x1b[0m",
                `⚙️  SERVER RUNNING ON PORT :: ${ENV.get("PORT")}`
            )
        );
    })
    .catch(() => console.log("mongo db CONNECTION FAILED !!!"));
