import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { BASE_URL } from "../utils/utils";
import { useGetUserApi } from "../authApi/GetUserApi";

export const useDeleteBookApi = () => {
    // 1. get the access token from Auth0
    const { getAccessTokenSilently } = useAuth0();
    const { currentUser } = useGetUserApi();

    const deleteBookRequest = async (bookId: string) => {
        // 3. declare a variable to store the access token getting from Auth0
        const accessToken = await getAccessTokenSilently();

        const url = new URL(`${BASE_URL}/api/book`);

        // 4 .make a request to the backend
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

        // 5. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to delete book");
        }

        toast.success("Book deleted successfully");

        return response.json();
    };

    // 4. use the useMutation hook to get the selected conversationId
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