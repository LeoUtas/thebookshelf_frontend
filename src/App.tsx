import { Route, Routes, Navigate } from "react-router-dom";

import { Layout } from "./layouts/Layout";
import { Welcome } from "./pages/Welcome";
import { HomeSignedIn } from "./pages/HomeSignedIn";
import { NewBook } from "./pages/NewBook";
import { Redirect } from "./pages/Redirect";
import { UserProfile } from "./pages/UserProfile";
import { ProtectedRoute } from "./auth/ProtectedRoute";

const App = () => {
    return (
        <>
            <Routes>
                {/* nonSignedIn user can only see this page */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Welcome />
                        </Layout>
                    }
                />

                {/* wrap some routes within the ProtectedRoutes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/redirectPage" element={<Redirect />} />
                    <Route
                        path="/homeSignedIn"
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
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};

export default App;
