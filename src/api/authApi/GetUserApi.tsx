import { User } from "@/components/utils/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { toast } from "sonner";

// import environment variables
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL_DEV as string;

export const useGetUserApi = () => {
    // get the access token from Auth0
    const { getAccessTokenSilently } = useAuth0();

    const getUserRequest = async (): Promise<User> => {
        // 1. declare a variable to store the access token getting from Auth0
        const accessToken = await getAccessTokenSilently();

        // 2 .make a GET request to the auth API
        const response = await fetch(AUTH_API_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
        });

        // 3. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to get user");
        }

        return response.json();
    };

    // 4. use the useQuery hook to get the current user
    const {
        data: currentUser,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useQuery("getCurrentUser", getUserRequest);

    if (error) {
        toast.error(error.toString());
    }

    return { currentUser, isLoading, isError, isSuccess, error };
};
