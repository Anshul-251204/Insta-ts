export const accessCookieOptions = {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
};
export const refreshCookieOptions = {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
};
