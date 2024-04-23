import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "../utils/LoadingButton";
import { Button } from "../ui/button";

// Define the schema for the form (i.e., the fields and their validation rules)
const formSchema = z.object({
    title: z.string(),
    year: z.string().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
});

// def the type for the form
export type FormType = z.infer<typeof formSchema>;

// def the type for props
type Props = {
    onSave: (data: FormType) => void;
    isLoading: boolean;
};

export const NewBookForm = ({ onSave, isLoading }: Props) => {
    // 1. create the actually form using react-hook-form
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema), // connect zod to react-hook-form to validate the form
    });

    // 2. render the form
    return (
        <div className="relative w-[85vw] h-[69vh] rounded-[1.56rem] border-[0.2rem] border-blue-500 mx-auto mt-[1.25rem]">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSave)}
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
                                            {...field}
                                            placeholder="Title"
                                            className="bg-white h-[2rem] text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[.55rem]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-between w-[80vw] mx-auto mt-[5rem]">
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
                                            {...field}
                                            placeholder="Year"
                                            className="bg-white h-[2rem] font-garamond text-black text-[1rem] rounded-[.55rem] w-[25vw]"
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
                                            {...field}
                                            placeholder="Author"
                                            className="bg-white h-[2rem] font-garamond text-black text-[1rem] rounded-[.55rem] w-[25vw]"
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
                                            {...field}
                                            placeholder="Month"
                                            className="bg-white h-[2rem] font-garamond text-black text-[1rem] rounded-[.55rem] w-[25vw]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="absolute top-[30%] bottom-[10px] w-full px-[2vw]">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="h-full">
                                    <FormLabel className="text-white text-[1.25rem] flex flex-col items-center">
                                        Description/Note
                                    </FormLabel>
                                    <FormControl className="h-[30vh]">
                                        <textarea
                                            {...field}
                                            placeholder="Description/Note"
                                            className="bg-white font-garamond text-black text-[1rem] rounded-[.55rem] p-2 w-full h-full resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {isLoading ? (
                        <LoadingButton />
                    ) : (
                        <div className="mt-[5vh] flex justify-end w-[85vw]">
                            <Button
                                type="submit"
                                className="font-garamond absolute bottom-4 right-[16rem] text-white text-[1.35rem] rounded-[1.56rem] bg-[#2e4789] w-[8rem] h-[2.5rem] shadow-[0_3px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
                            >
                                Upload
                            </Button>
                            <Button
                                type="submit"
                                className="font-garamond absolute bottom-[1rem] right-[1.25rem] text-white text-[1.35rem] rounded-[1.56rem] bg-[#2e4789] w-[12rem] h-[2.5rem] shadow-[0_3px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
                            >
                                Add To Shelf
                            </Button>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    );
};
