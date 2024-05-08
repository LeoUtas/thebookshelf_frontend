import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar } from "../components/nav/Nav-bar";
import { Footer } from "../components/footer/Footer";

interface Props {
    children: React.ReactNode;
}

// Layout component
export const Layout = ({ children }: Props) => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="flex flex-col min-h-screen">
            {isAuthenticated && <NavBar />}
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};
