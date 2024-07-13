// type HttpType = {
//     statusCode: { [key: string]: Number };
//     message: { [key: string]: string };
// };
const Http = {
    statusCode: {
        BadRequest: 400,
        Success: 200,
        created_And_Sucess: 201,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        RequestTimeout: 408,
        Conflict: 409,
        UnsupportMediaType: 413,
        RTCDTMFSenderedirect: 300,
        ServerError: 500,
        Unauthorized: 401,
        invalidformat: 412,
    },
    message: {
        UAlreadyExits: "User Already exist with this email or userName",
        URegister: "User Registered Successfully",
        UNotExits: "user not exist with this username or email !",
        UWrongCred: "Inviald creadinals",
        USigned: "User Sign In Successfully.",
        UAvatarMissing: "Avatar file is missing",
        UErrorOnUploadingAvatar: "Error while uploading on avatar",
        pIsRequired: "Post is required",
        UProfileChanged: "Your Profile is change successfully. ",
        pUploadError:
            "Something went wrong with uploading service. Try some time later.",
        pUploadSuccess: "Your post is upload successfully.",
    },
};

export default Http;
