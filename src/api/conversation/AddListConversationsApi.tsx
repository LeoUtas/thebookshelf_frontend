import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { ConversationsData } from "../../components/utils/types";
import { BASE_URL } from "../utils/utils";

export const useAddListConversationsApi = () => {
    // get the access token from Auth0
    const { getAccessTokenSilently, user } = useAuth0();

    const addListConversationsRequest = async ({
        listConversations,
    }: {
        listConversations: ConversationsData[];
    }) => {
        // 1. declare a variable to store the access token
        const accessToken = await getAccessTokenSilently();

        // 2. declare a variable to store the access token
        // make a POST request to the auth API
        const response = await fetch(`${BASE_URL}/api/listconversations`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, // add the access token to the headers
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                auth0Id: user?.sub,
                email: user?.email,
                listConversations: listConversations,
            }),
        });

        //3. check if the request was successful
        if (!response.ok) {
            toast.error("Failed to add conversations");
            throw new Error("Failed to add listConversations");
        }

        // 4. toast a success message
        toast.success("Conversations saved successfully");

        return response.json();
    };

    // 4. use the useMutation hook to add listConversations
    const {
        mutateAsync: addListConversations,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useMutation(addListConversationsRequest);

    return { addListConversations, isLoading, isSuccess, isError, error };
};
