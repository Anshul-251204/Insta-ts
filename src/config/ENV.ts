import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const ENV: NodeJS.ProcessEnv = process.env;

const config = {
    get(key: string) {
        const value = ENV[key];
        if (!value) {
            throw new Error(`ENV variable is not set --> ${key}`);
        }
        return value;
    },
};

export default config;
