import { v4 as uuidv4 } from "uuid";
import { BookData } from "../utils/types";

// Define the structure of your category objects
interface Category {
    categoryId: string;
    category: string;
}

interface Title {
    titleId: string;
    title: string;
}

export const createCategoryData = (books: BookData[]): Category[] => {
    const categoryMap = new Map<string, string>();

    books.forEach((book) => {
        // Only add the category to the map if it's not already present and if it's not undefined
        if (book.category && !categoryMap.has(book.category)) {
            categoryMap.set(book.category, uuidv4());
        }
    });

    // Convert the map into an array of category objects
    const categoryData = Array.from(categoryMap, ([category, categoryId]) => ({
        categoryId,
        category,
    }));

    return categoryData;
};

export const createTitleData2 = (books: BookData[]): Title[] => {
    const titleMap = new Map<string, string>();

    books.forEach((book) => {
        // Only add the title to the map if it's not already present and if it's not undefined
        if (book.title && !titleMap.has(book.title)) {
            titleMap.set(book.title, uuidv4());
        }
    });

    // Convert the map into an array of objects
    const titleData = Array.from(titleMap, ([title, titleId]) => ({
        titleId,
        title,
    }));

    return titleData;
};

export const createTitleData = (books: BookData[]): Title[] => {
    const titles: Title[] = [];

    books.forEach((book) => {
        if (book.title) {
            // Generate a unique ID for every title, even if it's a duplicate
            const titleId = uuidv4();
            titles.push({ titleId, title: book.title });
        }
    });

    return titles;
};
