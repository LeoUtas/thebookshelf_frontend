import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

// import environment variables
const LISTCONVERSATIONS_API_URL = import.meta.env
    .VITE_LISTCONVERSATIONS_API_URL_DEV as string;
// const ADD_LISTCONVERSATIONS_API_URL = import.meta.env.VITE_ADD_LISTCONVERSATIONS_API_URL_PRODUCTION as string;

export const useDeleteConversationApi = () => {
    // 1. get the access token from Auth0
    const { getAccessTokenSilently, user } = useAuth0();

    const deleteConversationRequest = async (conversationId: string) => {
        // 3. declare a variable to store the access token getting from Auth0
        const accessToken = await getAccessTokenSilently();

        const url = new URL(LISTCONVERSATIONS_API_URL);

        // 4 .make a request to the backend
        const response = await fetch(url.toString(), {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                conversationId: conversationId,
                auth0Id: user?.sub,
            }),
        });

        // 5. check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to get listConversations");
        }

        toast.success("Conversation deleted successfully");

        return response.json();
    };

    // 4. use the useMutation hook to get the selected conversationId
    const {
        mutateAsync: deleteConversation,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useMutation(deleteConversationRequest);

    return {
        deleteConversation,
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
