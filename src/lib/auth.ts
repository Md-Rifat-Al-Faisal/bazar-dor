import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("bazardor");

const clean = (value?: string) => (value ?? "").replace(/["'\s]/g, "");

const baseURL = [
    clean(process.env.BETTER_AUTH_URL),
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${clean(process.env.VERCEL_PROJECT_PRODUCTION_URL)}` : "",
    "http://localhost:3000",
].find((url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
});

export const auth = betterAuth({
    baseURL,
    database: mongodbAdapter(db),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }
    }
});