import { promisify } from "node:util";
import jwt, { SignCallback, VerifyCallback, JwtPayload } from "jsonwebtoken";

export const createAuthToken = promisify(function (
    secret: string,
    { name, id, expiresIn = "2h" }: { name: string; id: string; expiresIn?: string },
    callback: SignCallback,
) {
    jwt.sign(
        {
            sub: id,
            name,
        },
        secret,
        {
            expiresIn,
        },
        callback,
    );
});

export const verifyAuthToken = promisify(function (
    secret: string,
    token: string,
    callback: VerifyCallback<JwtPayload>,
) {
    jwt.verify(token, secret, callback);
});
