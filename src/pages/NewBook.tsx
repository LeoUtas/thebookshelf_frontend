import { NewBookForm } from "@/components/newbookframe/NewBookForm";
import { Header } from "../components/header/Header";
import { useAddCurrentBookApi } from "@/api/bookApi/AddBookApi";

import { useGetUserApi } from "@/api/authApi/GetUserApi";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Loading } from "./BookShelfLoading";
import { FormBookData } from "@/components/utils/types";

export const NewBook = () => {
    const navigate = useNavigate();

    const { currentUser, isLoading: isGetCurrentUserLoading } = useGetUserApi();

    const { addCurrentBook, isLoading: isAddCurrentBookLoading } =
        useAddCurrentBookApi();

    // 1. create a function to handle the form submission - extend the data fields with the user data
    const handleAddToShelf = async (formData: FormBookData, file: File) => {
        // 1.1. check if the user data is available
        if (!currentUser?.auth0Id || !currentUser?.email) {
            console.error("User data is not available.");
            return;
        }

        // 1.2. handle the combined formData to send to the backend
        // explain for the future me: FormData is a built-in object that allows you to combine key/value pairs into a single object, making it ideal for sending form data to the server.
        // FormData objects are used in addCurrentBookRequest = async (bookData: FormData)
        // Therefore, it's perfect to use to combine the file + user-entered data + some useful data (i.e., bookId, email, autho0Id) to send to the backend
        const completeBookData = new FormData();
        completeBookData.append("title", formData.title);
        if (formData.year) completeBookData.append("year", formData.year);
        if (formData.author) completeBookData.append("author", formData.author);
        if (formData.category) {
            completeBookData.append("category", formData.category);
        }
        if (formData.description)
            completeBookData.append("description", formData.description);
        completeBookData.append("file", file);
        completeBookData.append("bookId", uuidv4());
        completeBookData.append("auth0Id", currentUser.auth0Id);
        completeBookData.append("email", currentUser.email);
        completeBookData.append("userId", currentUser._id);
        completeBookData.append("userNo", currentUser.userNo.toString());

        // 1.3. add the book to the shelf
        await addCurrentBook(completeBookData);

        // 1.4. redirect the user to the home after all done
        navigate("/");
    };

    if (isAddCurrentBookLoading) {
        return <Loading />;
    }

    // if the getting user data is loading => render a loading page to the user
    if (isGetCurrentUserLoading) {
        return <Loading />;
    }

    // Return category along with other components
    return (
        <>
            <Header Title="New Book" />
            <NewBookForm
                handleAddToShelf={handleAddToShelf}
                isLoading={isAddCurrentBookLoading}
            />
        </>
    );
};
