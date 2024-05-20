import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// def a prop type for Auth0Provider
type Auth0ProviderProps = {
    children: React.ReactNode;
};

function AuthProvider({ children }: Auth0ProviderProps) {
    const navigate = useNavigate();

    // get the Auth0 env variables
    // const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN_DEV;
    const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN_PRO;
    // const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID_DEV;
    const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID_PRO;
    // const AUTH0_REDIRECT_URL = import.meta.env.VITE_AUTH0_REDIRECT_URL_DEV;
    const AUTH0_REDIRECT_URL = import.meta.env.VITE_AUTH0_REDIRECT_URL_PRO;

    // const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE_DEV;
    const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE_PRO;

    // check if the env variables are available
    if (
        !AUTH0_DOMAIN ||
        !AUTH0_CLIENT_ID ||
        !AUTH0_REDIRECT_URL ||
        !AUTH0_AUDIENCE
    ) {
        throw new Error("Auth0 env variables are missing");
    }

    // define a function to redirect to the redirectPage
    const onRedirectCallback = () => {
        navigate("/redirectPage");
    };

    return (
        // render the Auth0Provider component
        <Auth0Provider
            domain={AUTH0_DOMAIN}
            clientId={AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: AUTH0_REDIRECT_URL,
                audience: AUTH0_AUDIENCE,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
}

AuthProvider.propTypes = {};

export default AuthProvider;
