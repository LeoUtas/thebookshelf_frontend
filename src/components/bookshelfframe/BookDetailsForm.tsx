import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/shadcn/button";
import { FaGear } from "react-icons/fa6";
import { useState } from "react";
import { Loading } from "@/pages/BookShelfLoading";

// Define the schema for the form (i.e., the fields and their validation rules)
const FormBookDataSchema = z.object({
    title: z.string(),
    year: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
});

// def the type for the form
export type FormType = z.infer<typeof FormBookDataSchema>;

// def the type for props
type Props = {
    handleUpdateBookDetails: (data: FormType) => void;
    isLoading: boolean;
    selectedBook: FormType;
};

export const BookDetailsForm = ({
    handleUpdateBookDetails,
    selectedBook,
    isLoading,
}: Props) => {
    // create the actually form using react-hook-form
    const form = useForm<FormType>({
        resolver: zodResolver(FormBookDataSchema), // connect zod to react-hook-form to validate the form
        defaultValues: {
            title: selectedBook.title,
            year: selectedBook.year,
            author: selectedBook.author,
            category: selectedBook.category,
            description: selectedBook.description,
        }, // set the default values for the form
    });

    const [formActive, setFormActive] = useState(false);

    const toggleFormActive = () => {
        setFormActive(!formActive);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    handleUpdateBookDetails(data);
                    setFormActive(false);
                })}
                className="font-garamond font-normal h-full w-full"
            >
                <div className="flex flex-col items-center">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="mt-[2rem] w-[80vw] h-[2rem] ">
                                <FormLabel className="text-white text-[1.25rem] mt-[.5rem] flex flex-col items-center">
                                    Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={!formActive}
                                        {...field}
                                        placeholder="Title"
                                        className="bg-white h-[2.5rem] text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[1rem]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-between w-[80vw] mx-auto mt-[4rem]">
                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <FormLabel className="text-white text-[1.25rem]">
                                    Year
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={!formActive}
                                        {...field}
                                        placeholder="Year"
                                        className="bg-white h-[2.5rem] font-garamond text-black text-[1rem] rounded-[1rem] w-[25vw]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <FormLabel className="text-white text-[1.25rem]">
                                    Author
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={!formActive}
                                        {...field}
                                        placeholder="Author"
                                        className="bg-white h-[2.5rem] font-garamond text-black text-[1rem] rounded-[1rem] w-[25vw]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <FormLabel className="text-white text-[1.25rem]">
                                    Category
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={!formActive}
                                        {...field}
                                        placeholder="Category"
                                        className="bg-white h-[2.5rem] font-garamond text-black text-[1rem] rounded-[1rem] w-[25vw]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="relative mt-[2rem] ml-[7vw] w-[85vw] px-[2vw]">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="h-full">
                                <FormLabel className="text-white text-[1.25rem] ml-[1rem] flex flex-col items-center">
                                    Description/Note
                                </FormLabel>
                                <FormControl className="h-[20vh]">
                                    <textarea
                                        disabled={!formActive}
                                        {...field}
                                        placeholder="Description/Note"
                                        className={`bg-white font-garamond p-[1rem] text-black text-[1rem] rounded-[1.5rem] w-full h-min-[20vh] ${
                                            !formActive ? "opacity-60" : ""
                                        }`}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mt-[5vh] flex justify-end w-[85vw] gap-2 sm:ml-[4vw] lg:gap-5">
                    {!formActive ? (
                        <FaGear
                            onClick={toggleFormActive}
                            color="white"
                            className="mr-[1rem] hover:cursor-pointer"
                            size={28}
                        />
                    ) : (
                        <Button
                            type="submit"
                            className="font-garamond text-white text-[1.35rem] rounded-[1.56rem] bg-[#2e4789] w-[8rem] h-[2.5rem] shadow-[0_3px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
                        >
                            Update
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};
