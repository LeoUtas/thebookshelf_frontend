import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";

import App from "./App.tsx";
import AuthProvider from "./auth/AuthProvider.tsx";
import "./styles/index.css";
import { LoadedCategoryProvider } from "./contexts/LoadedCategoryContext.tsx";

// add queryClientProvider
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <LoadedCategoryProvider>
                        <App />
                        <Toaster
                            visibleToasts={1}
                            position="top-right"
                            richColors
                        />
                    </LoadedCategoryProvider>
                </AuthProvider>
            </QueryClientProvider>
        </Router>
    </React.StrictMode>
);
