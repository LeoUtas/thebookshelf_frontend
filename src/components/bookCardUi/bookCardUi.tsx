import { Button } from "@/components/ui/shadcn/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RiMagicFill } from "react-icons/ri";
import { BookCardUiProps } from "../utils/types";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export function BookCardUi({
    titleText,
    descriptionText,
    width,
    height,
    titleTextSize = "text-[1.5rem]",
}: BookCardUiProps) {
    return (
        <Card
            className={`${[width, height].join(
                " "
            )} rounded-[1.25rem] border-none bg-gradient-to-br from-[#0b3866] via-[#4b749f]  to-[#08203e] hover:cursor-pointer`}
            onClick={() => console.log("clicked")}
        >
            <CardHeader className="h-[9.5rem]">
                <CardTitle
                    className={`font-garamond text-white font-normal ${titleTextSize}`}
                >
                    {titleText.split(" ").slice(0, 8).join(" ")}
                </CardTitle>
                <CardDescription>{descriptionText}</CardDescription>
            </CardHeader>

            <CardFooter>
                <Button
                    variant="outline"
                    className=" bg-transparent border-none hover:bg-transparent"
                >
                    <div className="gap-1 flex flex-row">
                        <RiMagicFill color="white" size={24} />
                        <HiOutlineDotsHorizontal color="white" size={24} />
                    </div>
                </Button>
            </CardFooter>
        </Card>
    );
}
