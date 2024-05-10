import { BookData } from "@/components/utils/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { BASE_URL } from "../utils/utils";

export const useGetBooksApi = () => {
    // 1. get the access token from Auth0
    const { getAccessTokenSilently, user } = useAuth0();

    const getBooksRequest = async (): Promise<BookData[]> => {
        // 2. declare a variable to store the access token getting from Auth0
        const accessToken = await getAccessTokenSilently();

        const url = new URL(`${BASE_URL}/api/book`);
        url.searchParams.append("auth0Id", user?.sub as string);

        // 3. make a request to the backend
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
        });

        // 4. check if the request was successful
        if (!response.ok) {
            const responseMessage = await response.json();

            // explain for the future me: this trick is to prevent keep loading the page when there is no book
            // the message "No book found" is sent from the backend when there is no book found
            // this is useful when the user has no book yet (i.e., user just signed up),
            // the frontend will load the page once and stop loading
            if (responseMessage.message === "No book found") {
                return [];
            }

            throw new Error("Failed to get books");
        }

        return response.json();
    };

    // 5. use the useQuery hook to get books
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
