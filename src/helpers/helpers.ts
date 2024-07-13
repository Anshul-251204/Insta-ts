export const normalizePort = ( port: number | string ): number => {
    if (typeof port === "string") {
        port = Number(port);
    }

    if (port < 0) {
        throw new Error(
            `PLEASE ENTER A VALID NUMBER :: YOUR PORT IS :: ${port}`
        );
    }

    return port;
};
