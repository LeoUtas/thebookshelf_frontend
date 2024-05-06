import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Layout } from "./layouts/Layout";
import { Welcome } from "./pages/Welcome";
import { HomeSignedIn } from "./pages/HomeSignedIn";
import { ChatWithLibrarian } from "./pages/ChatWithLibrarian";
import { NewBook } from "./pages/NewBook";
import { Redirect } from "./pages/Redirect";
import { UserProfile } from "./pages/UserProfile";
import { TestUi } from "./pages/testUI";

const App = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <>
            {!isAuthenticated ? (
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Welcome />
                            </Layout>
                        }
                    />

                    {/* <Route path="/*" element={<Navigate to="/" />} /> */}
                </Routes>
            ) : (
                <Routes>
                    <Route path="/redirectPage/" element={<Redirect />} />
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <HomeSignedIn />
                            </Layout>
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            <Layout>
                                <ChatWithLibrarian />
                            </Layout>
                        }
                    />

                    <Route
                        path="/userProfile"
                        element={
                            <Layout>
                                <UserProfile />
                            </Layout>
                        }
                    />

                    <Route
                        path="/newbook"
                        element={
                            <Layout>
                                <NewBook />
                            </Layout>
                        }
                    />
                    <Route
                        path="/testUI"
                        element={
                            <Layout>
                                <TestUi />
                            </Layout>
                        }
                    />

                    <Route
                        path="/*"
                        element={<Navigate to="/redirectPage/" />}
                    />
                </Routes>
            )}
        </>
    );
};

export default App;
