import { useAuth0 } from "@auth0/auth0-react";
import { useGetUserApi } from "@/api/authApi/GetUserApi";
import { useState } from "react";
import { useMutation } from "react-query";

const AICHAT_REQUEST_API_URL = import.meta.env.VITE_AICHAT_REQUEST_API_URL_DEV;
// const AICHAT_REQUEST_API_URL = import.meta.env.VITE_AICHAT_REQUEST_API_URL_PRO;

export const useStreamResponse = ({
    streamCallback,
    endStreamCallback,
}: {
    streamCallback: (value: string) => void;
    endStreamCallback?: () => void;
}) => {
    const { getAccessTokenSilently } = useAuth0();
    const { currentUser } = useGetUserApi();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate: startStream } = useMutation({
        mutationFn: async ({
            query,
            title,
        }: {
            query: string;
            title: string;
        }) => {
            const accessToken = await getAccessTokenSilently();
            const response = await fetch(AICHAT_REQUEST_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    query: query,
                    title: title,
                    auth0Id: currentUser?.auth0Id,
                }),
            });

            if (!response.body) {
                throw new Error(
                    "ReadableStream not supported in this browser."
                );
            }

            const reader = response.body.getReader();
            return reader;
        },
        onSuccess: (reader) => {
            setIsLoading(true);
            readStream(reader);
        },
    });

    const readStream = async (
        reader: ReadableStreamDefaultReader<Uint8Array>
    ) => {
        const keepReading = true;
        let completeText = "";
        try {
            while (keepReading) {
                const { done, value } = await reader.read();
                if (done) {
                    setIsLoading(false);
                    // streamCallback(completeText);
                    // endStreamCallback?.();
                    break;
                }
                const text = new TextDecoder().decode(value);
                completeText += text;
                streamCallback(completeText.replace("end-stream", " ")); // update the text each time
                if (text.includes("end-stream")) {
                    setIsLoading(false);
                    endStreamCallback?.();
                    break;
                }
            }
        } catch (error) {
            console.error("Error reading stream:", error);
            setIsLoading(false);
        }
    };

    return { startStream, isLoading };
};
