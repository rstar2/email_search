/* eslint-disable no-console */
import express, { RequestHandler, ErrorRequestHandler, Request } from "express";
// load it immediately after express - will not be needed in Express v.5
import "express-async-errors";
import cors from "cors";
import { z } from "zod";

import { User, wait, filter } from "utils";
import mockedData from "./mock/data.json";
import mockedAuth from "./mock/auth.json";
import { verifyAuthToken, createAuthToken } from "@libs/jwt";

// allow to use 'user' field from any appropriate Express middleware
type AuthRequest = Request & {
    readonly user: User;
};

// eslint-disable-next-line turbo/no-undeclared-env-vars
const JWT_SECRET = process.env.JWT_SECRET || "secret";
// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = +process.env.PORT || 3000;
// TODO: add as real env variable
const app = express();

app.use(express.json());
app.use(cors());

class NotAuthError extends Error {}

const isAuth: RequestHandler = async (req: AuthRequest, res, next) => {
    // verify the passed JWT token
    const authorization = req.headers.authorization || "";

    const token = authorization.replace(/Bearer\s+/, "");

    if (!token) {
        throw new NotAuthError("Missing Authorization");
    }

    const { sub: id } = await verifyAuthToken(JWT_SECRET, token);

    const user = mockedAuth.find(({ id: aId }) => aId === id);
    if (!user) throw new NotAuthError("Invalid user");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - attach th user so allow it
    req.user = user;

    // all is ok
    next();
};

// Declare a routes
app.post("/auth/login", async (req, res) => {
    const { name, password } = req.body;

    // search in the auth users
    const user = mockedAuth.find(
        ({ name: aName, password: aPassword }) => aName === name && aPassword === password,
    );
    if (!user) throw new Error("Invalid name or password");

    const token = await createAuthToken(JWT_SECRET, { name: user.name, id: user.id });
    res.json({ token });
});

app.get("/api/search", isAuth, async (req: AuthRequest, res) => {
    const { query } = req.query;

    const data = query ? filter(mockedData, query as string) : mockedData;
    await wait(1000);

    res.json(data);
});

// Handle a "global" error
app.use(((err, req, res, next) => {
    // log
    console.error(`Error on request ${req.method} ${req.url}`, err.message);
    console.error(err.stack);

    // the server is only for API, so always return a JSON response
    res.status(err instanceof NotAuthError ? 403 : 500).send({
        message: err.message || "Something failed!",
    });
}) as ErrorRequestHandler);

// Run the server!
app.listen({ port: PORT }, () => {
    console.log(`Started dev server on address ${JSON.stringify(PORT)}`);
});

process.on("unhandledRejection", (error) => {
    console.error("unhandledRejection", error);
});
