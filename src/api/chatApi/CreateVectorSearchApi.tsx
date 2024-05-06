import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const CREATE_VECTOR_SEARCH_API_URL = import.meta.env
    .VITE_CREATE_VECTOR_SEARCH_API_URL_DEV as string;
// const CREATE_VECTOR_SEARCH_API_URL = import.meta.env
//     .VITE_CREATE_VECTOR_SEARCH_API_URL_PRODUCTION as string;

// def a hook to make use of the SearchQueryAPI
export const useCreateVectorSearchApi = () => {
    // get the access token from Auth0
    const { getAccessTokenSilently, user } = useAuth0();

    // create a function to fetch a search query to the backend
    const fetchCreateVectorSearchRequest = async (category: string) => {
        // 1. declare a variable to store the access token
        const accessToken = await getAccessTokenSilently();

        // 2. make a POST request to the backend
        const response = await fetch(CREATE_VECTOR_SEARCH_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                auth0Id: user?.sub,
                category: category,
            }),
        });

        // 3. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to create a new vector search");
        }
    };

    // 4. use the useMutation hook to fetch a search query
    const {
        mutateAsync: fetchCreateVectorSearch,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(fetchCreateVectorSearchRequest);

    // return the createUser function and the loading state
    return { fetchCreateVectorSearch, isLoading, isError, isSuccess };
};
