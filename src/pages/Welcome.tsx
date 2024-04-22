import { useAuth0 } from "@auth0/auth0-react";

export const Welcome = () => {
    // set up loginwithRedirect using Auth0 hook
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="text-center">
            <h3 className="font-garamond text-h3-title-fontsize text-white mt-[20vh]">
                Welcome to
            </h3>
            <h1 className="font-garamond text-h1-title-fontsize text-white  font-semibold mt-[3rem]">
                The Book Shelf
            </h1>

            <button
                type="button"
                className="signin-button text-auth-button-fontsize text-white font-garamond font-semibold mt-[10vh]"
                onClick={async () => await loginWithRedirect()}
            >
                SignIn
            </button>
        </div>
    );
};
