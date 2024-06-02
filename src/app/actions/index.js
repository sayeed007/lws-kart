"use server"

import { signIn } from "../../../auth";

export async function login(formData) {
    try {
        const response = await signIn("credentials", {
            ...formData,
            redirect: false
        });

        if (response?.error) {
            // Handle unsuccessful sign-in
            return [false, 'Failed to log in.'];
        } else {
            return [true, 'Log in successful.'];
        }
    } catch (error) {
        throw new Error(error);
    }
}