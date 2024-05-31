import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoClientPromise from "./src/database/mongoClientPromise";
import { userModel } from "./src/models/user-model";
import bcrypt from "bcryptjs";
import Facebook from "next-auth/providers/facebook";


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
                    // console.log('No credentials provided.');
                    // return [false, 'No credentials provided.'];
                }

                try {
                    const user = await userModel.findOne({ email: credentials.email }).lean();

                    console.log(user);
                    if (user) {

                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isMatch) {
                            // console.log(user);
                            return user;
                        } else {
                            throw new Error('Email or password mismatch.');

                            // console.log('Email or password mismatch.');
                            // return [false, 'Email or password mismatch.'];
                        }
                    } else {
                        throw new Error('User Not Found');


                        // console.log('User Not Found');
                        // return [false, 'User Not Found'];
                    }
                } catch (error) {
                    throw new Error(error);
                    // return [false, 'Unexpected error occurred.']
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // authorization: { params: { access_type: "offline", prompt: "consent" } },
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user; // Add user data to the JWT
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user; // Add user data to the session
            return session;
        },
    },
});
