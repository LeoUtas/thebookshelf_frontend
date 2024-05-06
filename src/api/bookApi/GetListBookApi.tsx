import { BookData } from "@/components/utils/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { BASE_URL } from "../utils/utils";

export const useGetBooksApi = () => {
    // 1. get the access token from Auth0
    const { getAccessTokenSilently, user } = useAuth0();

    const getBooksRequest = async (): Promise<BookData[]> => {
        // 3. declare a variable to store the access token getting from Auth0
        const accessToken = await getAccessTokenSilently();

        const url = new URL(`${BASE_URL}/api/book`);
        url.searchParams.append("auth0Id", user?.sub as string);

        // 4 .make a GET request to the backend
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
        });

        // 5. check if the request was successful
        if (!response.ok) {
            const responseMessage = await response.json();

            // explain for the future me: this trick is to prevent keep loading the page when there is no conversation
            // the message "No conversations found" is sent from the backend when there is no conversation
            // this is useful when the user has no conversation yet, the frontend will load the page once and stop loading
            if (responseMessage.message === "No book found") {
                return [];
            }

            throw new Error("Failed to get books");
        }

        return response.json();
    };

    // 4. use the useQuery hook to get the listConversations of the current user
    const {
        data: currentBooks,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    } = useQuery("getBooks", getBooksRequest);

    return {
        currentBooks,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    };
};
