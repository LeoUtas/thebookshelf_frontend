import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

// import environment variables
// const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL_DEV as string;
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL_PRODUCTION as string;

// def a type for the user update request
type UpdateUserRequestData = {
    firstName: string;
    lastName: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phone?: string;
};

export const useUpdateUserApi = () => {
    // get the access token from Auth0
    const { getAccessTokenSilently } = useAuth0();

    const updateUserRequest = async (formData: UpdateUserRequestData) => {
        // 1. declare a variable to store the access token
        const accessToken = await getAccessTokenSilently();

        // 2. declare a variable to store the access token
        // make a POST request to the auth API
        const response = await fetch(AUTH_API_URL, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        //3. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        return response.json();
    };

    // 4. use the useMutation hook to update a user
    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useMutation(updateUserRequest);

    if (isSuccess) {
        toast.success("User updated successfully");
    }

    if (error) {
        toast.error(error.toString());
    }

    return { updateUser, isLoading, isSuccess, isError, error };
};
