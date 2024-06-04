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
        console.error('Log in error:', error);

        // Check for specific error properties and handle accordingly
        if (error?.response && error?.response?.data && error?.response?.data?.error) {
            console.error('API Error:', error?.response?.data?.error);
            return [false, (error?.response?.data?.error)];
        } else if (error?.cause?.err?.message) {
            console.error('Nested Error:', error?.cause?.err?.message);
            return [false, (error?.cause?.err?.message)];
        } else {
            // Handle other types of errors
            return [false, ('An unexpected error occurred.')];
        }
    }
}