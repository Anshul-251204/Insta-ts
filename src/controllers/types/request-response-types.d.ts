export type SignUPBody = {
    name: string;
    username: string;
    password: string;
    email: string;
};

export type SignInBody = {
    password: string;
    username: string;
};

export type ChangePasswordBody = {
    oldPassword: string;
    newPassword: string;
};
