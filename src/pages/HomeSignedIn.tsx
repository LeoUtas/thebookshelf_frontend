import { useRef } from "react";

import { Header } from "../components/header/Header";
import { BookshelfFrame } from "../components/bookshelfframe/BookshelfFrame";
import { ChatFrame } from "../components/chatframe/ChatFrame";
import "../styles/index.css";

export const HomeSignedIn = () => {
    const askLibrarianRef = useRef<HTMLDivElement>(null);

    const handleAskLibrarian = () => {
        if (askLibrarianRef.current) {
            askLibrarianRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Header Title="The Book Shelf" />
            <BookshelfFrame handleAskLibrarian={handleAskLibrarian} />
            <div ref={askLibrarianRef} className="ask-librarian-title">
                <Header Title="Ask Librarian" />
            </div>
            <ChatFrame />
        </>
    );
};
