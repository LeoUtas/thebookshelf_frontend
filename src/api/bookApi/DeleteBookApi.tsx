import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { BASE_URL } from "../utils/utils";
import { useGetUserApi } from "../authApi/GetUserApi";

export const useDeleteBookApi = () => {
    // 1. get the access token from Auth0
    const { getAccessTokenSilently } = useAuth0();
    const { currentUser } = useGetUserApi();

    const deleteBookRequest = async (bookId: string) => {
        // 2. declare a variable to store the access token getting from Auth0
        const accessToken = await getAccessTokenSilently();

        const url = new URL(`${BASE_URL}/api/book`);

        // 3 .make a request to the backend
        const response = await fetch(url.toString(), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookId: bookId,
                auth0Id: currentUser?.auth0Id,
                email: currentUser?.email,
                userNo: currentUser?.userNo,
            }),
        });

        // 4. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to delete book");
        }

        return response.json();
    };

    // 5. use the useMutation hook to delete a book
    const {
        mutateAsync: deleteBook,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(deleteBookRequest);

    return {
        deleteBook,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
