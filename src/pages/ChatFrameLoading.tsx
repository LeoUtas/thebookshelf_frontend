import {
    Select,
    SelectContent,
    SelectTrigger,
} from "@/components/ui/shadcn/select";
import { Button } from "@/components/ui/shadcn/button";

export const Loading = () => {
    return (
        <>
            <div className="relative h-[73vh] rounded-[1.56rem] border-[#0085ff] bg-white bg-opacity-70 mx-auto mt-[1.25rem]">
                <div className="no-scrollbar overflow-y-auto absolute top-0 left-0 w-1/4 h-full rounded-xl bg-[#f6f6f6]">
                    {/* display saved conversation titles */}
                    <div className="absolute no-scrollbar left-0 w-full h-[68vh] rounded-xl bg-[#f6f6f6]">
                        <div className="flex flex-col space-y-[1rem] px-[2vw]"></div>
                    </div>
                </div>

                {/* display the select listTitles menu */}
                <div className="absolute right-0 w-[71vw] min-h-[80vh] max-h-[200vh] rounded-[1.25rem] bg-transparent mx-auto">
                    <div className="flex items-center mt-[1.5vh]">
                        <div className="absolute w-[10.5vw] border border-[#9bafd9] py-[.1rem] rounded-2xl shadow-lg active:shadow-inner focus:outline-none transition-all duration-150 ease-in-out">
                            <Button
                                type="button"
                                className="font-garamond text-[1.25rem] text-gray-800 w-full rounded-[1.25rem] bg-transparent shadow-none hover:font-bold hover:bg-transparent"
                            >
                                New Chat
                            </Button>
                        </div>

                        <div className="ml-[12vw]">
                            <Select>
                                <SelectTrigger className="font-garamond text-[1.25rem] text-gray-800  w-[10.5vw] py-[1.25rem] px-[1rem] border border-[#9bafd9] shadow-lg rounded-[0.8rem] hover:font-bold"></SelectTrigger>
                                <SelectContent className="rounded-[0.8rem]"></SelectContent>
                            </Select>
                        </div>
                        <div className="ml-[4vw] font-garamond text-[1.25rem] text-violet-950">
                            Ask anything about your book
                        </div>
                    </div>

                    <div className="no-scrollbar mb-[2rem] absolute top-[6rem] pb-[10rem] w-[70vw] h-[60vh] overflow-y-auto font-garamond text-[1.25rem] px-[5vw] leading-[2.25rem]">
                        <div className="overflow-y-auto"></div>
                    </div>

                    <form className="font-garamond font-normal h-full w-full">
                        <div className="flex flex-col items-center"></div>
                    </form>
                </div>
            </div>
        </>
    );
};
