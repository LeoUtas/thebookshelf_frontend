import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { BASE_URL } from "../utils/utils";

export const useDeleteUserApi = () => {
    // 1. get the access token from Auth0
    const { getAccessTokenSilently } = useAuth0();

    const deleteUserRequest = async () => {
        // 3. declare a variable to store the access token getting from Auth0
        const accessToken = await getAccessTokenSilently();

        const url = new URL(`${BASE_URL}/api/auth`);

        // 4 .make a request to the backend
        const response = await fetch(url.toString(), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
        });

        // 5. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to delete user");
        }

        return response.json();
    };

    // 4. use the useMutation hook to get the selected conversationId
    const {
        mutateAsync: deleteUser,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(deleteUserRequest);

    return {
        deleteUser,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
