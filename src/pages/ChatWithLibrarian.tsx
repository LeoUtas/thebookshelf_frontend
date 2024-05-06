import { Header } from "../components/header/Header";
import { ChatFrame } from "../components/chatframe/ChatFrame";
import "../styles/index.css";

export const ChatWithLibrarian = () => {
    return (
        <>
            <div className="bg-red">
                <Header Title="Chat with Librarian" />
                <ChatFrame />
            </div>
        </>
    );
};
