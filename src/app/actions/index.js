"use server"

import { getUserAccountByUserId } from "@/database/queries";
import { auth, signIn } from "../../../auth";

export async function login(formData) {
    try {
        const response = await signIn("credentials", {
            ...formData,
            redirect: false
        });
        console.log(response);


        if (response?.error) {
            // Handle unsuccessful sign-in
            return [false, 'Failed to log in.'];
        } else {
            const session = await auth();
            console.log(session);

            if (session?.user?.id) {
                // Fetch user account
                const userInfo = await getUserAccountByUserId(session?.user?.id);

                console.log(session, userInfo, "After Log In response");


                return [true, {
                    sessionInfo: session,
                    wishlistItems: userInfo.wishlistItems
                }];
            } else {
                return [false, 'Failed to log in.'];
            }
        }
    } catch (error) {
        throw new Error(error);
    }
}