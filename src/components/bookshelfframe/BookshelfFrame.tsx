import { useGetBooksApi } from "@/api/bookApi/GetListBookApi";
import { Loading } from "@/pages/BookShelfLoading";
import { useNavigate } from "react-router-dom";
import { BookCardUi } from "../bookCardUi/bookCardUi";
import { createTitleData } from "./utils";

export const BookshelfFrame = () => {
    const navigate = useNavigate();
    const { currentBooks, isLoading } = useGetBooksApi();

    // def a function to link to the form for adding new book
    const handleNewBook = () => {
        navigate("/newbook");
    };

    const handleAskLibrarian = () => {
        navigate("/chat");
    };

    const titleData = currentBooks ? createTitleData(currentBooks) : [];

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <div className="relative no-scrollbar overflow-y-auto w-[85vw] h-[60vh] rounded-[1.56rem] border-solid border-[0.2rem] border-blue-500 mx-auto mt-[1.25rem] mb-[15vh]">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2vw] md:gap-[5vw] mt-[5vh] ml-[2vw] mr-[2vw] sm:ml-[10vw] sm:mr-[10vw]">
                    {titleData?.map((item) => (
                        <BookCardUi
                            key={item.titleId}
                            width="w-[10rem]"
                            height="h-[12rem]"
                            titleText={item.title ? item.title : ""}
                            descriptionText=""
                            titleTextSize="text-[1.25rem]"
                        />
                    ))}
                </div>
            </div>

            <div>
                <div className="absolute bottom-[12vh] lg:bottom-[15.5vh] sm:bottom-[12.5vh] right-[10vw] sm:right-[9vw] md:right-[5rem] lg:right-[10vw]">
                    <button
                        type="button"
                        className="font-garamond mb-4 mr-[1rem] text-white text-[1.35rem] rounded-[1.56rem] bg-[#2e4789] md:w-[7rem] lg:w-[9.5rem] w-full h-[2.5rem] shadow-[0_3px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
                        onClick={handleNewBook}
                    >
                        New Book
                    </button>

                    <button
                        type="button"
                        className="font-garamond text-white text-[1.35rem] rounded-[1.56rem] bg-[#2e4789] md:w-[12rem] lg:w-[14.25rem] w-full h-[2.5rem] shadow-[0_3px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
                        onClick={handleAskLibrarian}
                    >
                        Chat with Librarian
                    </button>
                </div>
            </div>
        </>
    );
};
