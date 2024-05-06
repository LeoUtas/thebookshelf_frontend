import { useContext } from "react";
import {
    LoadedCategoryContext,
    CategoryContextType,
} from "./LoadedCategoryContext"; // Ensure this path is correct

export const useLoadedCategory = (): CategoryContextType => {
    const context = useContext(LoadedCategoryContext);
    if (!context) {
        throw new Error(
            "useLoadedCategory must be used within a CategoryProvider"
        );
    }
    return context;
};
