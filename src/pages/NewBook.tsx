import { NewBookForm } from "@/components/newbookframe/NewBookForm";
import { Header } from "../components/header/Header";

export const NewBook = () => {
    return (
        <>
            <Header Title="New Book" />
            <NewBookForm />
        </>
    );
};
