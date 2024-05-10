import { currentListConversationsData } from "@/components/utils/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { BASE_URL } from "../utils/utils";

export const useGetListConversationsApi = () => {
    // 1. get the access token from Auth0
    const { getAccessTokenSilently, user } = useAuth0();

    const getListConversationsRequest = async (): Promise<
        currentListConversationsData[]
    > => {
        // 3. declare a variable to store the access token getting from Auth0
        const accessToken = await getAccessTokenSilently();

        const url = new URL(`${BASE_URL}/api/listconversations`);
        url.searchParams.append("auth0Id", user?.sub as string);

        // 4 .make a request to the backend
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
            // this is useful when the user has no conversation yet (i.e., user just signed up),
            // the frontend will load the page once and stop loading
            if (responseMessage.message === "No conversations found") {
                return [];
            }

            throw new Error("Failed to get listConversations");
        }

        return response.json();
    };

    // 4. use the useQuery hook to get listConversations
    const {
        data: currentListConversations,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    } = useQuery("getListConversations", getListConversationsRequest);

    return {
        currentListConversations,
        isLoading,
        isError,
        isSuccess,
        error,
        refetch,
    };
};
