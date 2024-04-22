import { useNavigate } from "react-router-dom";

// def a type for the handleAskLibrarian
interface AskLibrarianProps {
    handleAskLibrarian: () => void;
}

export const BookshelfFrame = ({ handleAskLibrarian }: AskLibrarianProps) => {
    const navigate = useNavigate();

    // def a function to link to the form for adding new book
    const handleNewBook = () => {
        navigate("/newbook");
    };

    return (
        <div className="relative w-[85vw] h-[62vh] rounded-[1.56rem] border-solid border-[0.2rem] border-blue-500 mx-auto mt-[1.25rem] mb-[15vh]">
            <div>
                <button
                    type="button"
                    className="font-garamond absolute bottom-4 right-[16rem] text-white text-[1.35rem] rounded-[1.56rem] bg-[#2e4789] w-[9.5rem] h-[2.5rem] shadow-[0_3px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
                    onClick={handleNewBook}
                >
                    New Book
                </button>

                <button
                    type="button"
                    className="font-garamond absolute bottom-[1rem] right-[2.8rem] text-white text-[1.35rem] rounded-[1.56rem] bg-[#2e4789] w-[12.25rem] h-[2.5rem] shadow-[0_3px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
                    onClick={handleAskLibrarian}
                >
                    Ask Librarian
                </button>
            </div>
        </div>
    );
};
