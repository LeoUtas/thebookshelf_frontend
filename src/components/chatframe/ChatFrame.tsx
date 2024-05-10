import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/select";
import { RiMagicFill } from "react-icons/ri";
import { MdAutoDelete } from "react-icons/md";
import { GiSave } from "react-icons/gi";

import { Button } from "@/components/ui/shadcn/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";

import "./chatframe.css";

import { useStreamResponse } from "@/aiengine/useStreamResponse";
import { useAddListConversationsApi } from "@/api/conversation/AddListConversationsApi";
import { Input } from "../ui/shadcn/input";
import {
    ConversationsData,
    currentListConversationsData,
} from "../utils/types";

import { useGetListConversationsApi } from "@/api/conversation/GetListConversationsApi";
import { useDeleteConversationApi } from "@/api/conversation/DeleteConversationApi";
import { useLocation } from "react-router-dom";
import { useGetBooksApi } from "@/api/bookApi/GetListBookApi";
import { createTitleData } from "../bookshelfframe/utils";

const querySchema = z.object({
    query: z.string(),
});

type FormData = z.infer<typeof querySchema>;

export const ChatFrame = () => {
    // 1. declare state variables for the chat frame
    const location = useLocation();
    const bookTitle = location.state?.bookTitle as string;

    const { currentBooks } = useGetBooksApi();
    const titleData = currentBooks ? createTitleData(currentBooks) : [];

    const [responses, setResponses] = useState("");
    const [userQuery, setUserQuery] = useState("");
    const [conversation, setConversation] = useState<ConversationsData[]>([]);
    const [selectedTitle, setSelectedTitle] = useState(bookTitle);
    const [selectedConversation, setSelectedConversation] =
        useState<currentListConversationsData | null>();
    const [displayNewChat, setDisplayNewChat] = useState(true);
    const [position, setPosition] = useState("bottom");

    // call the useGetListConversationsApi hook from the conversation folder to get the list of conversations
    const { currentListConversations, refetch } = useGetListConversationsApi();
    // call the useDeleteConversationApi hook from the conversation folder to delete the selected conversation
    const { deleteConversation, isLoading: isDeleteConversationLoading } =
        useDeleteConversationApi();

    // create a function to handle the end of the streaming response
    const handleStreamEnd = useCallback(() => {
        setConversation((prev) => [
            ...prev,
            { role: "You", query: userQuery },
            { role: "Librarian", response: responses },
        ]);
    }, [userQuery, responses]);

    // call the useStreamResponse hook from the aiengine folder to handle the streaming response
    const { startStream } = useStreamResponse({
        streamCallback: setResponses,
        endStreamCallback: handleStreamEnd,
    });

    // use the react-hook-form library to handle the form submission (i.e., when the user presses the Enter key)
    const { register, handleSubmit, setValue } = useForm<FormData>({
        resolver: zodResolver(querySchema),
    });

    // explain for the future me: this code is to create a function to handle
    // a mechanism to kick off the streaming response when the user submits a query
    // (i.e., when the user presses the Enter key => query and selected book title are sent to the backend)
    // the current version only allows the user to chat about one book at a time
    // future version might allow the user to switch between books simultaneously (not sure let me think)
    const onSubmit = useCallback(
        (data: FormData) => {
            startStream({
                query: data.query, // send the user query to the backend
                title: selectedTitle, // send the selected book title to the backend
            });

            setValue("query", "");
            setUserQuery(data.query);
        },
        [startStream, selectedTitle, setValue]
    );

    // 3.4 create a useEffect hook to listen for the Enter key press event and prevent the default behavior
    useEffect(() => {
        const handleKeyDown = (e: {
            metaKey: unknown;
            key: string;
            preventDefault: () => void;
        }) => {
            if (e.metaKey && e.key === "Enter") {
                e.preventDefault();
                handleSubmit(onSubmit)();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleSubmit, onSubmit]);

    // call the useAddListConversationsApi hook from the conversation folder to add the list of conversations to the backend
    const { addListConversations, isLoading: isAddListConversationLoading } =
        useAddListConversationsApi();

    // create a list of conversations to be displayed in the chat frame
    const ConversationsData: ConversationsData[] = [
        ...conversation.slice(2),
        { role: "You", query: userQuery },
        { role: "Librarian", response: responses },
    ];

    // create a function to handle the new chat button
    const handleNewChat = async () => {
        // 1. check if the userQuery is not empty
        if (userQuery.length > 0) {
            // 2. call the addListConversations function to add the list of conversations to the backend
            await addListConversations({
                listConversations: ConversationsData,
            });

            //3. clear the conversation, responses, and userQuery
            setConversation([]);
            setResponses("");
            setUserQuery("");

            setDisplayNewChat(true);
            refetch();
        } else {
            // 4. if the userQuery is empty, just displayNewChat
            setDisplayNewChat(true);
        }
    };

    // functions to handle saved conversations on the left
    // create a function to display the selected conversation when the user click on a conversation title
    const handleConversationClick = (conversationId: string) => {
        const selectedOne = currentListConversations?.find(
            (item) => item.conversationId === conversationId
        );

        setSelectedConversation(selectedOne);
        setDisplayNewChat(false);
    };

    // create a function to delete the selected conversation
    const handleDeleteConversation = async (conversationId: string) => {
        await deleteConversation(conversationId);
        refetch();
    };

    if (isDeleteConversationLoading) {
        return (
            <>
                <div>
                    <MdAutoDelete color="white" size={28} />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="relative h-[73vh] rounded-[1.56rem] border-[#0085ff] bg-white bg-opacity-70 mx-auto mt-[1.25rem]">
                <div className="no-scrollbar overflow-y-auto absolute top-0 left-0 w-1/4 h-full rounded-xl bg-[#f6f6f6]">
                    {/* display saved conversation titles on the left */}
                    <div className="absolute no-scrollbar left-0 w-full h-[68vh] rounded-xl bg-[#f6f6f6]">
                        <div className="flex flex-col space-y-[1rem] px-[2vw]">
                            {currentListConversations &&
                                currentListConversations.map((item) => (
                                    <div
                                        key={item.conversationId}
                                        onClick={() =>
                                            handleConversationClick(
                                                item.conversationId
                                            )
                                        }
                                        className="flex items-center justify-between cursor-pointer mt-[2rem] gap-[1rem] py-[.5rem] bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        <span className="flex-grow">
                                            {item.conversationTitle}
                                        </span>
                                        <div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="bg-transparent border-none shadow-none tracking-wide active:bg-transparent hover:bg-transparent"
                                                    >
                                                        <RiMagicFill
                                                            size={24}
                                                        />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-[2rem]">
                                                    <DropdownMenuRadioGroup
                                                        value={position}
                                                        onValueChange={
                                                            setPosition
                                                        }
                                                    >
                                                        <DropdownMenuRadioItem
                                                            value="delete"
                                                            onClick={() => {
                                                                handleDeleteConversation(
                                                                    item.conversationId
                                                                );
                                                            }}
                                                        >
                                                            Delete
                                                        </DropdownMenuRadioItem>
                                                    </DropdownMenuRadioGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* start a new chat*/}
                <div className="absolute right-0 w-[71vw] min-h-[80vh] max-h-[200vh] rounded-[1.25rem] bg-transparent mx-auto">
                    <div className="flex items-center mt-[1.5vh]">
                        <div className="absolute w-[10.5vw] border border-[#9bafd9] py-[.1rem] rounded-2xl shadow-lg active:shadow-inner focus:outline-none transition-all duration-150 ease-in-out">
                            <Button
                                onClick={handleNewChat}
                                type="button"
                                className="font-garamond text-[1.25rem] text-gray-800 w-full rounded-[1.25rem] bg-transparent shadow-none hover:font-bold hover:bg-transparent"
                            >
                                New Chat
                            </Button>
                        </div>

                        <div className="ml-[12vw]">
                            <Select onValueChange={setSelectedTitle}>
                                <SelectTrigger className="font-garamond text-[1.25rem] text-gray-800  w-[35.5vw] py-[1.25rem] px-[1rem] border border-[#9bafd9] shadow-lg rounded-[0.8rem] hover:font-bold">
                                    {selectedTitle ? (
                                        <SelectValue
                                            placeholder={selectedTitle}
                                        />
                                    ) : (
                                        <SelectValue placeholder="Select" />
                                    )}
                                </SelectTrigger>
                                <SelectContent className="rounded-[0.8rem]">
                                    {titleData?.map((item) => (
                                        <SelectItem
                                            key={item.bookId}
                                            value={item.title}
                                        >
                                            {item.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* display the conversations when clicking a conversation title on the left */}
                    {!displayNewChat && selectedConversation && (
                        <div className="no-scrollbar mb-[2rem] absolute top-[6rem] pb-[10rem] w-[70vw] h-[60vh] overflow-y-auto font-garamond text-[1.25rem] px-[5vw] leading-[2.25rem]">
                            {selectedConversation.listConversations.map(
                                (data, index) => (
                                    <div key={index}>
                                        {/* Render conversation data */}
                                        <div
                                            className={
                                                data.role === "You"
                                                    ? "text-blue-800 font-semibold"
                                                    : "font-semibold text-violet-800 place-items-end"
                                            }
                                        >
                                            {data.role}
                                        </div>
                                        <div className="mb-[1rem] font-normal text-gray-950">
                                            <div>{data.query}</div>
                                            <div>{data.response}</div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}

                    {/* display the streaming conversation */}
                    {isAddListConversationLoading ? (
                        <div className="mt-[2rem]">
                            <GiSave color="white" size={28} />
                        </div>
                    ) : (
                        <div className="no-scrollbar mb-[2rem] absolute top-[6rem] pb-[10rem] w-[70vw] h-[60vh] overflow-y-auto font-garamond text-[1.25rem] px-[5vw] leading-[2.25rem]">
                            <div className="overflow-y-auto">
                                {conversation.slice(2).map((data, index) => (
                                    <div
                                        key={index}
                                        className={
                                            data.role === "You"
                                                ? "text-blue-800 font-semibold"
                                                : "font-semibold text-violet-800 place-items-end"
                                        }
                                    >
                                        {data.role === "You"
                                            ? "You"
                                            : "Librarian"}
                                        <div className="mb-[1rem] font-normal text-gray-950">
                                            {data.role === "You"
                                                ? data.query
                                                : data.response}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {userQuery !== "" && (
                                <div className="">
                                    <div className="text-blue-800 font-semibold ">
                                        You
                                    </div>
                                    <div className="mb-[1rem] text-gray-950">
                                        {userQuery}
                                    </div>
                                    <div className="font-semibold text-violet-800 place-items-end">
                                        Librarian
                                    </div>
                                    <div>{responses}</div>
                                </div>
                            )}
                        </div>
                    )}

                    {displayNewChat && (
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="font-garamond font-normal h-full w-full"
                        >
                            <div className="flex flex-col items-center">
                                <Input
                                    {...register("query")}
                                    onChange={(e) =>
                                        setValue("query", e.target.value)
                                    }
                                    placeholder="Ask anything about your book"
                                    className="font-garamond text-[1.25rem] absolute top-[85%] -translate-y-1/2 pl-4 left-[1%] right-[1%] w-[95%] py-[1.75rem] bg-white rounded-[1.5rem] border border-[#ccc] shadow-lg"
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};
