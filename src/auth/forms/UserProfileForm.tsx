import { Button } from "@/components/ui/shadcn/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/shadcn/form";
import { Switch } from "@/components/ui/switch";

import { Input } from "@/components/ui/shadcn/input";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { User } from "@/components/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDeleteUserApi } from "@/api/authApi/DeleteUserApi";
import { useAuth0 } from "@auth0/auth0-react";

import { GoodbyeLoading } from "../../pages/GoodbyeLoading";
import { onConfirmAccountDeleteAlert } from "@/components/sweetalert/ConfirmAccountDeleteAlert";

// Define the schema for the form (i.e., the fields and their validation rules)
const formSchema = z.object({
    email: z.string().optional(), // set this field as optional to not require it
    firstName: z.string(),
    lastName: z.string(),
    addressLine1: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
    phone: z.string().optional(),
    listTitles: z.array(z.string()),
});

// def the type for the form
export type FormType = z.infer<typeof formSchema>;

// def the type for props
type Props = {
    onSave: (data: FormType) => void;
    isLoading: boolean;
    currentUser: User;
};

export const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
    // 1. create the actually form using react-hook-form
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema), // connect zod to react-hook-form to validate the form
        // defaultValues: currentUser, // set the default values to the current user

        defaultValues: {
            ...currentUser,
            listTitles: currentUser.listTitles || [""], // Use existing book titles or initialize with [""]
        },
    });

    // reset the form when the current user changes
    useEffect(() => {
        form.reset(currentUser);
    }, [currentUser, form]);

    const { logout } = useAuth0();
    const [isDangerSwitchOff, setIsDangerSwitchOff] = useState(true);
    const { deleteUser } = useDeleteUserApi();
    const [showGoodbye, setShowGoodbye] = useState(false);

    const handleDeleteAccount = () => {
        onConfirmAccountDeleteAlert({
            titleAlert:
                "DANGER! All your data will be lost! Are you sure you want to delete your account?",
            onDenyTitle: "Thank you for staying with us!",

            action: async () => {
                await deleteUser();
                setShowGoodbye(true);
            },
        });
    };

    if (showGoodbye) {
        setTimeout(() => {
            logout();
        }, 3000);
    }

    // 2. render the form
    return (
        <>
            {showGoodbye ? (
                <GoodbyeLoading />
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSave)}
                        className="rounded-[1.56rem]"
                    >
                        <div>
                            <div className="font-garamond text-[1.5rem] font-normal text-white mx-[5vw] mt-[5vh] flex justify-between">
                                <h2>Profile</h2>
                                <h2 className="text-red-600">Danger</h2>
                            </div>

                            <div className="font-garamond text-[1.5rem] font-normal text-white mx-[5vw] mt-[1vh] flex justify-between">
                                <FormDescription className="font-garamond text-[1.25rem]">
                                    View and change your profile information
                                    here
                                </FormDescription>
                                <div className="pl-[5rem]">
                                    <Switch
                                        id="dangerOn"
                                        onCheckedChange={() => {
                                            setIsDangerSwitchOff(
                                                !isDangerSwitchOff
                                            );
                                        }}
                                    />
                                </div>
                            </div>

                            {!isDangerSwitchOff ? (
                                <div className="flex justify-end ml-[5vw] mr-[5vw] mt-[0.5rem]">
                                    <Button
                                        className="font-garamond text-[1.25rem] text-red-600 font-semibold bg-transparent border border-red-600 rounded-[1.56rem] hover:text-black"
                                        variant="destructive"
                                        type="button"
                                        onClick={() => {
                                            handleDeleteAccount();
                                        }}
                                    >
                                        DELETE ACCOUNT
                                    </Button>
                                </div>
                            ) : (
                                <div className="mt-[0.5rem] bg-transparent">
                                    <Button
                                        className="font-garamond text-[1.25rem] text-transparent bg-transparent border border-none shadow-none hover:bg-transparent hover:cursor-default"
                                        type="button"
                                    >
                                        DELETE ACCOUNT
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="email"
                                disabled
                                render={({ field }) => (
                                    <FormItem className="ml-[5vw] mt-[2rem] w-[35vw] h-[2rem] items-center">
                                        <FormLabel className="text-white text-xl font-garamond font-normal ml-[.5rem]">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Email"
                                                className="bg-white h-[2rem] text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[.55rem]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex w-[60vw] ml-[5vw] mt-[3.5rem]">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="w-[25vw] h-[2rem] items-center">
                                        <FormLabel className="text-white text-xl font-garamond font-normal ml-[.5rem]">
                                            First name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="* First name"
                                                className="bg-white h-[2rem] text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[.55rem]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="ml-[1.5rem] w-[25vw] h-[2rem] items-center">
                                        <FormLabel className="text-white text-xl font-garamond font-normal ml-[.5rem]">
                                            Last name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="* Last name"
                                                className="bg-white h-[2rem] text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[.55rem]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex w-[80vw] ml-[5vw] mt-[2rem]">
                            <FormField
                                control={form.control}
                                name="addressLine1"
                                render={({ field }) => (
                                    <FormItem className="mt-[1.55rem] w-[45vw] h-[2rem] items-center">
                                        <FormLabel className="text-white text-xl font-garamond font-normal ml-[.5rem]">
                                            Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Address"
                                                className="bg-white text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[.55rem]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem className="mt-[1.55rem] w-[20vw] h-[2rem] ml-[4vw] items-center">
                                        <FormLabel className="text-white text-xl font-garamond font-normal ml-[.5rem]">
                                            City
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="City"
                                                className="bg-white h-[2rem] text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[.55rem]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-between w-[80vw] ml-[5vw] mt-[2rem]">
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem className="mt-[1.55rem] w-[25vw] h-[2rem] items-center">
                                        <FormLabel className="text-white text-xl font-garamond font-normal ml-[.5rem]">
                                            State
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="State"
                                                className="bg-white h-[2rem] text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[.55rem]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zip"
                                render={({ field }) => (
                                    <FormItem className="mt-[1.55rem] w-[25vw] h-[2rem] items-center">
                                        <FormLabel className="text-white text-xl font-garamond font-normal ml-[.5rem]">
                                            Postal code
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Postal Code"
                                                className="bg-white h-[2rem] text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[.55rem]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem className="mt-[1.55rem] w-[25vw] h-[2rem] items-center">
                                        <FormLabel className="text-white text-xl font-garamond font-normal ml-[.5rem]">
                                            Country
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Country"
                                                className="bg-white h-[2rem] text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[.55rem]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex w-[80vw] ml-[5vw] mt-[2rem]">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="mt-[1.55rem] w-[40vw] h-[2rem] items-center">
                                        <FormLabel className="text-white text-xl font-garamond font-normal ml-[.5rem]">
                                            Phone number
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Phone numer"
                                                className="bg-white h-[2rem] text-[1rem] font-garamond font-light placeholder:text-gray-400 rounded-[.55rem]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* explain to future me: this is a hidden form to initialize the field listTitles in the MongoDB database for loading categories used in the Chat with Librarian feature, kind of a nice workaround */}
                        <div>
                            <FormField
                                control={form.control}
                                name="listTitles"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Category"
                                                type="hidden"
                                            />
                                        </FormControl>
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
                                    className="font-garamond text-white text-[1.35rem] rounded-[1.56rem] bg-[#2e4789] w-[8.25rem] h-[2.5rem] shadow-[0_3px_5px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
                                >
                                    Save
                                </Button>
                            </div>
                        )}
                    </form>
                </Form>
            )}
        </>
    );
};
