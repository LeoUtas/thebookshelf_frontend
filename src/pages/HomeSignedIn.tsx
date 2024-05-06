import { Header } from "../components/header/Header";
import { BookshelfFrame } from "../components/bookshelfframe/BookshelfFrame";
import "../styles/index.css";

export const HomeSignedIn = () => {
    return (
        <>
            <Header Title="The Book Shelf" />
            <BookshelfFrame />
        </>
    );
};
