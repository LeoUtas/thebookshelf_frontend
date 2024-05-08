import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useNavigate } from "react-router-dom";
import { RiMagicFill } from "react-icons/ri";
import { BookCardUiProps } from "../utils/types";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineSelector } from "react-icons/hi";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { useDeleteBookApi } from "@/api/bookApi/DeleteBookApi";

import { Loading } from "@/pages/BookShelfLoading";
import { useGetBooksApi } from "@/api/bookApi/GetListBookApi";

export function BookCardUi({
    bookId,
    bookTitle,
    descriptionText,
    width,
    height,
    titleTextSize = "text-[1.5rem]",
}: BookCardUiProps) {
    const navigate = useNavigate();
    const { deleteBook, isLoading: isDeleteBookLoading } = useDeleteBookApi();
    const { refetch } = useGetBooksApi();

    const handleBookClick = () => {
        navigate("/chat", { state: { bookTitle } });
    };

    const handleDeleteBook = async () => {
        await deleteBook(bookId);
        refetch();
    };

    const handleBookDetails = async () => {
        navigate("/bookdetails", { state: { bookId } });
    };

    if (isDeleteBookLoading) {
        return <Loading />;
    }

    return (
        <Card
            className={`${[width, height].join(
                " "
            )} rounded-[1.25rem] border-none bg-gradient-to-br from-[#0b3866] via-[#4b749f]  to-[#08203e] hover:cursor-pointer`}
        >
            <CardHeader
                className="h-[10rem]"
                onClick={() => {
                    handleBookClick();
                }}
            >
                <CardTitle
                    className={`font-garamond text-white font-normal ${titleTextSize}`}
                >
                    {bookTitle.split(" ").slice(0, 8).join(" ")}
                </CardTitle>
                <CardDescription>{descriptionText}</CardDescription>
            </CardHeader>

            <CardFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <div className="gap-1 flex flex-row ml-[3rem]">
                            <RiMagicFill color="white" size={20} />
                            <HiOutlineDotsHorizontal color="white" size={20} />
                            <HiOutlineSelector color="white" size={20} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="absolute left-full pl-[2rem] hover:px-[2.1rem]">
                        <DropdownMenuItem
                            className="flex text-center"
                            onClick={() => {
                                handleBookDetails();
                                console.log("Details clicked");
                            }}
                        >
                            Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex text-center"
                            onClick={() => {
                                handleDeleteBook();
                            }}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
    );
}
