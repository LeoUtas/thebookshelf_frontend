import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { BASE_URL } from "../utils/utils";
import { FormBookData } from "@/components/utils/types";

export const useUpdateBookDetailsApi = () => {
    // get the access token from Auth0
    const { getAccessTokenSilently } = useAuth0();

    const updateBookDetailsRequest = async (bookData: FormBookData) => {
        // 1. declare a variable to store the access token
        const accessToken = await getAccessTokenSilently();

        // 2. declare a variable to store the access token
        // make a POST request to the auth API
        const response = await fetch(`${BASE_URL}/api/book`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });

        //3. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to update Bookdetails");
        }

        // 4. toast a success message
        toast.success("Book details updated successfully");

        return response.json();
    };

    // 4. use the useMutation hook to update a user
    const {
        mutateAsync: updateBookDetails,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useMutation(updateBookDetailsRequest);

    if (error) {
        toast.error(error.toString());
    }

    return { updateBookDetails, isLoading, isSuccess, isError, error };
};
