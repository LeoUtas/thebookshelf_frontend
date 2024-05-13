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
import { MdAutoDelete } from "react-icons/md";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { useDeleteBookApi } from "@/api/bookApi/DeleteBookApi";

import { useGetBooksApi } from "@/api/bookApi/GetListBookApi";
import { onConfirmAlert } from "../sweetalert/ConfirmAlert";

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
        onConfirmAlert({
            titleAlert: "Are you sure you want to delete this book?",
            onConfirmTitle: "Book has been deleted",
            onDenyTitle: "Book has not been deleted",
            action: async () => {
                await deleteBook(bookId);
                refetch();
            },
        });
    };

    const handleBookDetails = async () => {
        navigate("/bookdetails", { state: { bookId } });
    };

    if (isDeleteBookLoading) {
        return (
            <>
                <div className="flex flex-col items-center">
                    <MdAutoDelete color="white" size={28} />
                </div>
            </>
        );
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
                        <div className="gap-1 flex flex-row ml-[1.5rem]">
                            <RiMagicFill color="white" size={20} />
                            <HiOutlineDotsHorizontal color="white" size={20} />
                            <HiOutlineSelector color="white" size={20} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="absolute ml-[2rem] font-comic">
                        <DropdownMenuItem
                            onClick={() => {
                                handleBookDetails();
                            }}
                        >
                            Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
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
