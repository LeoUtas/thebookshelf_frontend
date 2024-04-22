import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export const NavBar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth0();

    const handleHomeButton = () => {
        // onClick home button, if !isAuthenticated go to "/", else go to "/homeSignedIn"
        if (isAuthenticated) {
            navigate("/homeSignedIn");
        } else {
            navigate("/");
        }
    };

    // def a function to handle Sign out, after sign out, go to home page
    const handleSignOut = async () => {
        await logout();
        navigate("/");
    };

    return (
        <nav className="flex justify-between pt-[1.8rem] pl-[8vw] pr-[8vw]">
            <Button
                type="button"
                className="text-white text-[1.45rem] font-normal font-comic bg-transparent hover:cursor-pointer hover:bg-blue-950"
                onClick={handleHomeButton}
                aria-label="Go to Home"
            >
                Home
            </Button>

            {isAuthenticated ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className="text-white text-[1.45rem] font-normal font-comic pt-[.25rem] pl-[1rem] pr-[1rem] rounded-[.55rem] bg-blue-950  bg-opacity-50 hover:bg-blue-950">
                        Hello {user?.name}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="flex flex-col items-center justify-center w-full">
                        <DropdownMenuItem className="w-full text-center">
                            <Button className="w-full mt-[.4rem] mb-[.4rem] font-comic text-black text-[1.25rem] hover:cursor-pointer hover:text-white hover:bg-blue-800 hover:text-[1.55rem] bg-white">
                                <Link to="/userProfile">Profile</Link>
                            </Button>
                        </DropdownMenuItem>

                        <Separator />

                        <DropdownMenuItem className="w-full text-center">
                            <Button className="w-full mt-[.4rem] mb-[.4rem] font-comic text-black text-[1.25rem] hover:cursor-pointer hover:text-white hover:bg-blue-800 hover:text-[1.55rem] bg-white">
                                Help
                            </Button>
                        </DropdownMenuItem>

                        <Separator />

                        <DropdownMenuItem className="w-full text-center">
                            <Button
                                onClick={() => handleSignOut()}
                                className="w-full mt-[.4rem] mb-[.4rem] font-comic text-black text-[1.25rem] hover:cursor-pointer hover:text-white hover:bg-blue-800 hover:text-[1.55rem] bg-white"
                            >
                                Sign out
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : null}
        </nav>
    );
};
