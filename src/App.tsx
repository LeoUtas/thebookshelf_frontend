import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Layout } from "./layouts/Layout";
import { Welcome } from "./pages/Welcome";
import { HomeSignedIn } from "./pages/HomeSignedIn";
import { NewBook } from "./pages/NewBook";
import { Redirect } from "./pages/Redirect";
import { UserProfile } from "./pages/UserProfile";

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

                    {/* <Route path="*" element={<Navigate to="/welcome" />} /> */}
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
                        path="/*"
                        element={<Navigate to="/redirectPage/" />}
                    />
                </Routes>
            )}
        </>
    );
};

export default App;
