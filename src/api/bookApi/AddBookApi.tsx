import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { BASE_URL } from "../utils/utils";

// def a hook to make use of the AuthAPI
export const useAddCurrentBookApi = () => {
    // get the access token from Auth0
    const { getAccessTokenSilently } = useAuth0();

    // create a function to add a book to the backend
    const addCurrentBookRequest = async (bookData: FormData) => {
        // 1. declare a variable to store the access token
        const accessToken = await getAccessTokenSilently();

        // 2. make a POST request to the backend
        const response = await fetch(`${BASE_URL}/api/book`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: bookData,
        });

        // 3. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to add book");
        } else {
            // 3.1. show a success message
            toast.success("Book added successfully");
        }
    };

    // 4. use the useMutation hook to add a book
    const {
        mutateAsync: addCurrentBook,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(addCurrentBookRequest);

    // return the createUser function and the loading state
    return { addCurrentBook, isLoading, isError, isSuccess };
};
