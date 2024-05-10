import { Header } from "../components/header/Header";
import { useLocation } from "react-router-dom";
import { BookDetailsForm } from "@/components/bookshelfframe/BookDetailsForm";
import { useGetBooksApi } from "@/api/bookApi/GetListBookApi";
import { useUpdateBookDetailsApi } from "@/api/bookApi/UpdateBookDetailsApi";
import { Loading } from "./BookShelfLoading";
import { BookData, FormBookData } from "@/components/utils/types";

export const BookDetails = () => {
    const location = useLocation();
    const bookId = location.state?.bookId as string;

    const {
        currentBooks,
        isLoading: isCurrentBookLoading,
        refetch,
    } = useGetBooksApi();

    const { updateBookDetails, isLoading: isUpdateBookDetailsLoading } =
        useUpdateBookDetailsApi();

    if (!currentBooks) {
        return null;
    }

    // find the selected book from the list of books
    const selectedBook = currentBooks.find(
        (book) => book.bookId === bookId
    ) as BookData;

    // create a function to handle the form submission - extend the data fields with the use of bookId
    // explain for the future me: bookId is required for updating its associated field in thevectorshelf database
    // Therefore, it is required to send the bookId to the backend to update the associated field in thevectorshelf database
    // i.e., the update is not only in the book from thebookshelf
    // but also need to update the associated field in thevectorshelf
    const handleUpdateBookDetails = async (formData: FormBookData) => {
        if (!selectedBook) {
            console.error("The book is not found.");
            return;
        }

        const completeBookDetails = {
            ...formData,
            bookId: selectedBook.bookId,
        };

        await updateBookDetails(completeBookDetails);
    };

    refetch();

    if (isCurrentBookLoading) {
        return <Loading />;
    }

    if (isUpdateBookDetailsLoading) {
        return <Loading />;
    }

    return (
        <>
            <Header Title="Book Details" />
            <BookDetailsForm
                selectedBook={selectedBook}
                handleUpdateBookDetails={handleUpdateBookDetails}
                isLoading={isUpdateBookDetailsLoading}
            />
        </>
    );
};
