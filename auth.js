import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import mongoClientPromise from "./src/database/mongoClientPromise";
import { userModel } from "./src/models/user-model";



async function refreshAccessToken(token) {
    try {
        const url =
            "https://oauth2.googleapis.com/token?" +
            new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            });

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
        })

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens?.access_token,
            accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
            refreshToken: refreshedTokens?.refresh_token,
        }
    } catch (error) {
        console.error("Access token generation using refresh token failed.", error);

        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: MongoDBAdapter(mongoClientPromise, { databaseName: process.env.MONGODB_DATABASE_NAME }),
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "jwt",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        // generateSessionToken: () => {
        //     return randomUUID?.() ?? randomBytes(32).toString("hex")
        // }
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                if (credentials == null) {
                    throw new Error('No credentials provided.');
                }

                try {
                    const user = await userModel.findOne({
                        email: credentials.email
                    }).lean();

                    if (user) {

                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error('Email or password mismatch.');
                        }
                    } else {
                        throw new Error('User Not Found');
                    }
                } catch (error) {
                    throw new Error(error);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    accessToken: account?.access_token,
                    accessTokenExpires: Date.now() + account?.expires_in * 1000,
                    refreshToken: account?.refresh_token,
                    user,
                };
            }

            return token;

            // console.log(`Token Will Expire at ${new Date(token.accessTokenExpires)})`);

            // if (Date.now() < token?.accessTokenExpires) {
            //     console.log(`At ${new Date(Date.now())}, Using old access token`);
            //     return token;
            // }

            // console.log(`Token Expired at ${new Date(Date.now())}`)
            // return refreshAccessToken(token);
        },

        async session({ session, token }) {

            session.user = token?.user;
            session.accessToken = token?.access_token;
            session.error = token?.error

            // console.log(`Returning Session ${JSON.stringify(session)}`)
            return session;
        },
    },
});
