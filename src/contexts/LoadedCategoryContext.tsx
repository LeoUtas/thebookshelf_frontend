import React, { createContext, useState, ReactNode } from "react";

// Define the type for the context state publicly if needed by other files
export interface CategoryContextType {
    category: string;
    setCategory: (category: string) => void;
}

// Create the context with a default value
export const LoadedCategoryContext = createContext<
    CategoryContextType | undefined
>(undefined);

// Create a provider component
export const LoadedCategoryProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [category, setCategory] = useState<string>("");

    return (
        <LoadedCategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </LoadedCategoryContext.Provider>
    );
};
