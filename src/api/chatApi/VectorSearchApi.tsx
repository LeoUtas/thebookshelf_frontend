import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const VECTOR_SEARCH_API_URL = import.meta.env
    .VITE_VECTOR_SEARCH_API_URL_DEV as string;
// const VECTOR_SEARCH_API_URL = import.meta.env
//     .VITE_VECTOR_SEARCH_API_URL_PRODUCTION as string;

// def a hook to make use of the SearchQueryAPI
export const useFetchSearchQueryApi = () => {
    // get the access token from Auth0
    const { getAccessTokenSilently, user } = useAuth0();

    // create a function to fetch a search query to the backend
    const fetchSearchQueryRequest = async ({
        searchQuery,
        category,
    }: {
        searchQuery: string;
        category: string;
    }) => {
        // 1. declare a variable to store the access token
        const accessToken = await getAccessTokenSilently();

        // 2. make a POST request to the backend
        const response = await fetch(VECTOR_SEARCH_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                auth0Id: user?.sub,
                searchQuery: searchQuery,
                category: category,
            }),
        });

        // 3. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to fetch search query");
        }

        // 4. toast a success message
        toast.success("Book added successfully");

        // 4. return the response
        return response.json();
    };

    // 4. use the useMutation hook to fetch a search query
    const {
        mutateAsync: fetchSearchQuery,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(fetchSearchQueryRequest);

    // return the createUser function and the loading state
    return { fetchSearchQuery, isLoading, isError, isSuccess };
};
