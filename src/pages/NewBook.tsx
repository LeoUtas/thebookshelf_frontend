import { NewBookForm } from "@/components/newbookframe/NewBookForm";
import { Header } from "../components/header/Header";
import { FormBookData, useAddCurrentBookApi } from "@/api/bookApi/AddBookApi";

import { useGetUserApi } from "@/api/authApi/GetUserApi";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Loading } from "./BookShelfLoading";
// import { useCreateVectorSearchApi } from "@/api/chatApi/CreateVectorSearchApi";

export const NewBook = () => {
    const navigate = useNavigate();

    const { currentUser, isLoading: isGetCurrentUserLoading } = useGetUserApi();

    const { addCurrentBook, isLoading: isAddCurrentBookLoading } =
        useAddCurrentBookApi();

    // const {
    //     fetchCreateVectorSearch,
    //     isLoading: isFetchCreateVectorSearchLoading,
    // } = useCreateVectorSearchApi();

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

        const bookTitle = formData.title; // to pass the book title to the chat page

        // 1.3. add the book to the shelf
        await addCurrentBook(completeBookData);

        // for some reason this createVectorSearch is not working yet
        // 1.4. check if the formData.category is a new one (i.e., not exist in the listCategories) => send a request to creat a new vector search (i.e., using sendCreateVectorSearchRequest())
        // if isGetCurrentUserLoading is done, then asign the listCategories to the listCategories variable
        // const listCategories = currentUser?.listCategories || [];

        // if (!listCategories.includes(formData.category)) {
        //     await fetchCreateVectorSearch(formData.category);
        // }

        // 1.5. redirect the user to the home after all done
        navigate("/chat", { state: { bookTitle } });
    };

    if (isAddCurrentBookLoading) {
        return <Loading />;
    }

    // if (isFetchCreateVectorSearchLoading) {
    //     return <Loading />;
    // }

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
