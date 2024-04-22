import { useEffect } from "react";

// define a type for the Toast component
type ToastProps = {
    message: string;
    type: "success" | "error";
    onClose: () => void;
};

// create the Toast component
export const Toast = ({ message, type, onClose }: ToastProps) => {
    // set a timer for the toast message to disappear after 3 seconds use the useEffect hook to run the timer
    useEffect(() => {
        const timer = setTimeout(() => {
            // remove the toast message after 3 seconds
            onClose();
        }, 3000);

        // clear the timer when the component unmounts
        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    // define the style for the toast component based on the type (i.e., success => color in red or error color in green)
    const toastStyle = {
        color: type === "success" ? "green" : "red",
    };

    return <div className={toastStyle}>{message}</div>;
};
