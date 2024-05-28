"use server"

import { getUserAccountByUserId } from "@/database/queries";
import { auth, signIn } from "../../../auth";

export async function login(formData) {
    try {
        const response = await signIn("credentials", {
            ...formData,
            redirect: false
        });

        if (response) {
            console.log(response);

            const session = await auth();
            console.log(session);

            // Fetch user account
            const userInfo = await getUserAccountByUserId(session?.user?.id);

            console.log(session, userInfo, "After Log In response");


            return {
                sessionInfo: session,
                wishlistItems: userInfo.wishlistItems
            };
        }
    } catch (error) {
        throw new Error(error);
    }
}