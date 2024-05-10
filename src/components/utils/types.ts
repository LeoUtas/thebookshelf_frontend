import { Key } from "react";

// def a type to use in create user request
export type CreateUserRequestData = {
    auth0Id: string;
    email: string;
};

// def a type for using in get user request
export type User = {
    _id: string;
    auth0Id: string;
    email: string;
    userNo: number;
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

// def a type for the user update request
export type UpdateUserData = {
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

// def a type for the book data
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

// explain for the future me: FormBookData needs to match with FormBookDataSchema in NewBookForm.tsx
export type FormBookData = {
    title: string;
    year?: string;
    author?: string;
    category?: string;
    description?: string;
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
    bookId: string;
    bookTitle: string;
    descriptionText: string;
    width: string;
    height: string;
    titleTextSize?: string;
};
