import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { BASE_URL } from "../utils/utils";
import { CreateUserRequestData } from "@/components/utils/types";

// def a hook to make use of the AuthAPI
export const useCreateUserApi = () => {
    // get the access token from Auth0
    const { getAccessTokenSilently } = useAuth0();

    // create a function to create a user
    const createUserRequest = async (user: CreateUserRequestData) => {
        // 1. declare a variable to store the access token
        const accessToken = await getAccessTokenSilently();

        // 2. make a POST request to the backend
        const response = await fetch(`${BASE_URL}/api/auth`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        // 3. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
    };

    // 4. use the useMutation hook to create a user
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createUserRequest);

    // return the createUser function and the loading state
    return { createUser, isLoading, isError, isSuccess };
};
