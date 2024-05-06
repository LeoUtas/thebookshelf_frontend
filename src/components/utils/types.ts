import { Key } from "react";

export type User = {
    _id: string;
    auth0Id: string;
    email: string;
    firstName: string;
    lastName: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phone?: string;
    listTitles: string[];
};

export type BookData = {
    _id: Key | null | undefined;
    bookId: string;
    title: string;
    year?: string;
    author?: string;
    category?: string;
    description?: string;
    auth0Id: string;
    email: string;
};

export type promptMessages = {
    role: "system" | "assistant" | "user";
    content: string;
};

export type ConversationsData = {
    role: "You" | "Librarian";
    query?: string;
    response?: string;
};

export type ListConversationsData = {
    role: "You" | "Librarian";
    query?: string;
    response?: string;
    conversationId: string;
};

export type currentListConversationsData = {
    _id: string;
    auth0Id: string;
    email: string;
    conversationId: string;
    conversationTitle: string;
    listConversations: { role: string; query?: string; response?: string }[];
};

export type BookCardUiProps = {
    bookTitle: string;
    descriptionText: string;
    width: string;
    height: string;
    titleTextSize?: string;
};
