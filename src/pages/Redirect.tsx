import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import { useCreateUserApi } from "../api/authApi/CreateUserApi";

// the reason for the existence of this page is to place everything below within the Auth0Provider
// in the main.tsx file, we have the Auth0Provider wrapping the <App /> component
// this page is one of the children of the <App /> component
// if we don't have this page, we would face an error of asking for wrapping the below code within the Auth0Provider
// basically, this page is a workaround to avoid the error

export const Redirect = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const { createUser } = useCreateUserApi();

    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({
                auth0Id: user.sub,
                email: user.email,
            });

            hasCreatedUser.current = true;
        }

        // the auth0 will redirect the user to this page after being authenticated
        navigate("/homeSignedIn");
    }, [createUser, navigate, user]);

    return <>Redirecting...</>;
};
